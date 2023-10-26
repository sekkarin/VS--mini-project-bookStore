using BookStoreApi.Models;
using BookStoreApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
  private readonly UsersService _userService;

  public UserController(UsersService usersService) =>
      _userService = usersService;

  [HttpGet]
  public async Task<List<User>> Get() =>
      await _userService.GetAsync();

  [HttpGet("{userName}")]
  public async Task<ActionResult<User>> Get(string userName)
  {
    var book = await _userService.GetAsync(userName);

    if (book is null)
    {
      return NotFound();
    }

    return book;
  }

  [HttpPost]
  public async Task<IActionResult> Post(User newUser)
  {
    await _userService.CreateAsync(newUser);

    return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, User updatedUser)
  {
    var book = await _userService.GetAsync(id);

    if (book is null)
    {
      return NotFound();
    }

    updatedUser.Id = book.Id;

    await _userService.UpdateAsync(id, updatedUser);

    return NoContent();
  }

  [HttpDelete("{id:length(24)}")]
  public async Task<IActionResult> Delete(string id)
  {
    var book = await _userService.GetAsync(id);

    if (book is null)
    {
      return NotFound();
    }

    await _userService.RemoveAsync(id);

    return NoContent();
  }
}