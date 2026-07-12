using AmaAsmita.Application.DTOs.Auth;
using AmaAsmita.Application.Interfaces;
using AmaAsmita.Domain.Entities;
using AmaAsmita.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmaAsmita.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    private readonly IJwtService _jwtService;

    public AuthController(
        AppDbContext context,
        IJwtService jwtService
    )
    {
        _context = context;

        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequest request
    )
    {
        var emailExists =
            await _context.Users.AnyAsync(
                x => x.Email == request.Email
            );

        if(emailExists)
        {
            return BadRequest(
                new
                {
                    message =
                        "Email already exists."
                }
            );
        }

        var userNameExists =
            await _context.Users.AnyAsync(
                x => x.UserName == request.UserName
            );

        if(userNameExists)
        {
            return BadRequest(
                new
                {
                    message =
                        "Username already exists."
                }
            );
        }

        var user = new User
        {
            Id = Guid.NewGuid(),

            Name = request.Name,

            Email = request.Email,

            UserName = request.UserName,

            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(
                    request.Password
                ),

            Role = "User",

            CreatedAt =
                DateTime.UtcNow
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok(
            new
            {
                message =
                    "Registration successful."
            }
        );
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request
    )
    {
        var user =
            await _context.Users
            .FirstOrDefaultAsync(
                x => x.Email == request.Email
            );

        if(user == null)
        {
            return Unauthorized(
                new
                {
                    message =
                        "Invalid email or password."
                }
            );
        }

        bool passwordValid =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash
            );

        if(!passwordValid)
        {
            return Unauthorized(
                new
                {
                    message =
                        "Invalid email or password."
                }
            );
        }

        var token =
            _jwtService.GenerateToken(
                user.Id.ToString(),
                user.Email,
                user.Role
            );

        return Ok(
            new
            {
                token,

                user =
                new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.UserName,
                    user.Role
                }
            }
        );
    }
}