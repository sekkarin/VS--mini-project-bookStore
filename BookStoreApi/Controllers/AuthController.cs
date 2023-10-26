
using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace BookStoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthenticationService _authService;

    public AuthController(AuthenticationService authService) =>
        _authService = authService;


    [HttpPost("register")]
    public async Task<User> Register(RegisterRequest newUser)
    {
        return await _authService.RegisterAsync(newUser);
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(LoginRequest loginRequest)
    {
        var user = await _authService.Login(loginRequest.UserName, loginRequest.Password);

        if (user == null)
        {
            return BadRequest("Invalid credentials");
        }
        Console.WriteLine(user);
        var token = user?.Token;
        return Ok(new { token });
    }
}
