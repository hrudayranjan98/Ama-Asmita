using AmaAsmita.Application.DTOs;
using AmaAsmita.Domain.Entities;
using AmaAsmita.Infrastructure.Persistence;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

namespace AmaAsmita.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProfileController(
        AppDbContext context
    )
    {
        _context = context;
    }

    [HttpGet("me")]
    public IActionResult GetProfile()
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

        if(userId == null)
        {
            return Unauthorized();
        }

        var guid =
            Guid.Parse(userId);

        var user =
            _context.Users
            .FirstOrDefault(x =>
                x.Id == guid
            );

        if(user == null)
        {
            return NotFound();
        }

        var profile =
            _context.UserProfiles
            .FirstOrDefault(x =>
                x.UserId == guid
            );

        var response =
            new UserProfileRequest
            {
                Name = user.Name,
                UserName = user.UserName,
                Email = user.Email,

                Bio = profile?.Bio,
                Phone = profile?.Phone,
                Address = profile?.Address,

                FacebookLink =
                    profile?.FacebookLink,

                InstagramLink =
                    profile?.InstagramLink,

                LinkedInLink =
                    profile?.LinkedInLink
            };

        return Ok(response);
    }

    [HttpPut("update")]
    public IActionResult UpdateProfile(
        UpdateProfileRequest request
    )
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

        if(userId == null)
        {
            return Unauthorized();
        }

        var guid =
            Guid.Parse(userId);

        var user =
            _context.Users
            .FirstOrDefault(x =>
                x.Id == guid
            );

        if(user == null)
        {
            return NotFound();
        }

        user.Name =
            request.Name;

        user.UserName =
            request.UserName;

        var profile =
            _context.UserProfiles
            .FirstOrDefault(x =>
                x.UserId == guid
            );

        if(profile == null)
        {
            profile =
                new UserProfile
                {
                    Id = Guid.NewGuid(),

                    UserId = guid,

                    CreatedAt =
                        DateTime.UtcNow
                };

            _context.UserProfiles.Add(
                profile
            );
        }

        profile.Bio =
            request.Bio;

        profile.Phone =
            request.Phone;

        profile.Address =
            request.Address;

        profile.FacebookLink =
            request.FacebookLink;

        profile.InstagramLink =
            request.InstagramLink;

        profile.LinkedInLink =
            request.LinkedInLink;

        profile.UpdatedAt =
            DateTime.UtcNow;

        _context.SaveChanges();

        return Ok(
            new
            {
                message =
                    "Profile updated successfully"
            }
        );
    }
}