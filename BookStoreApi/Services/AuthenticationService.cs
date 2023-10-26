using BookStoreApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BCryptNet = BCrypt.Net.BCrypt;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
// dotnet watch --no-hot-reload
namespace BookStoreApi.Services;

public class AuthenticationService
{
  private readonly IMongoCollection<User> _usersCollection;
  private readonly IConfiguration _configuration;
  public AuthenticationService(
     IOptions<BookStoreDatabaseSettings> bookStoreDatabaseSettings, IConfiguration configuration)
  {
    var mongoClient = new MongoClient(
          bookStoreDatabaseSettings.Value.ConnectionString);

    var mongoDatabase = mongoClient.GetDatabase(
        bookStoreDatabaseSettings.Value.DatabaseName);

    _usersCollection = mongoDatabase.GetCollection<User>(
        bookStoreDatabaseSettings.Value.UsersCollectionName);
    _configuration = configuration;
  }

  public async Task<User> RegisterAsync(RegisterRequest _newUser)
  {

    var existingUser = await _usersCollection.FindSync(user => user.UserName == _newUser.UserName).FirstOrDefaultAsync();
    if (existingUser != null)
    {
      // User with this username already exists.
      return null;
    }

    // Hash the password before storing it.
    // byte[] passwordHash, passwordSalt;
    var passwordHash = CreatePasswordHash(_newUser.Password);
    // Create a new User instance with the provided username and hashed password.
    User newUser = new()
    {
      UserName = _newUser.UserName,
      Password = passwordHash, // Store the password hash
      Name = _newUser.Name
    };
    // Insert the user into the database.
    await _usersCollection.InsertOneAsync(newUser);

    return newUser;
  }

  public async Task<AuthDataLogin> Login(string username, string password)
  {
    var existingUser = await _usersCollection.FindSync(user => user.UserName == username).FirstOrDefaultAsync();

    if (existingUser == null || !VerifyPassword(password, existingUser.Password))
    {
      return null; // Authentication failed
    }

    var token = GenerateToken(existingUser);

    return new AuthDataLogin { Token = token };
  }

  private string CreatePasswordHash(string password)
  {
    return BCryptNet.HashPassword(password, 12);
  }


  public async Task Logout(string id, User updatedUser) =>
      await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);
  private bool VerifyPassword(string password, string passwordHash)
  {
    return BCryptNet.Verify(password, passwordHash);

  }

  public string GenerateToken(User user)
  {
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(_configuration["JWTSettings:Key"]!);

    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(new[]{
        new Claim("id", user.Id.ToString()),
        new Claim("userName", user.UserName)
        // Add other user claims as needed
    }),
      Expires = DateTime.UtcNow.AddDays(7), // Token expiration time
      SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
  }

}

