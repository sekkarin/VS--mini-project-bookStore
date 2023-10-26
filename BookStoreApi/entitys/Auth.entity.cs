namespace BookStoreApi.Models
{
  public class LoginRequest
  {
    public string UserName { get; set; } = null!;
    public string Password { get; set; } = null!;
  }
  public class RegisterRequest
  {
    public string Name { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;
  }
  public class UpdateRequest
  {
    public string Name { get; set; } = null!;

    public string UserName { get; set; } = null!;


  }
  public class AuthDataLogin
  {
    public string Token { get; set; }

  }
}
