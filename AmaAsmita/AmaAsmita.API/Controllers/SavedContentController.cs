using AmaAsmita.Domain.Entities;
using AmaAsmita.Infrastructure.Persistence;
using AmaAsmita.Application.DTOs;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;
namespace AmaAsmita.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SavedContentController : ControllerBase
{
    private readonly AppDbContext _context;

    public SavedContentController(
        AppDbContext context
    )
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Save(
        SavedContentRequest request
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

        bool alreadySaved =
            await _context.SavedContents
            .AnyAsync(
                x =>
                    x.UserId ==
                    Guid.Parse(userId)

                    &&

                    x.ContentId ==
                    request.ContentId

                    &&

                    x.ContentType ==
                    request.ContentType
            );

        if(alreadySaved)
        {
            return BadRequest(
                new
                {
                    message =
                    "Already Saved"
                }
            );
        }

        var saved =
            new SavedContent
            {
                UserId =
                    Guid.Parse(userId),

                ContentId =
                    request.ContentId,

                ContentType =
                    request.ContentType,

                ContentName =
                    request.ContentName,

                ImageUrl =
                    request.ImageUrl,

                Location =
                    request.Location
            };

        _context.SavedContents.Add(
            saved
        );

        await _context.SaveChangesAsync();

        return Ok(
            new
            {
                message =
                    "Saved Successfully"
            }
        );
    }

    [HttpGet("my")]
    public async Task<IActionResult> MySavedContents()
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

        if(userId == null)
        {
            return Unauthorized();
        }

        var data =
            await _context.SavedContents
            .Where(
                x =>
                    x.UserId ==
                    Guid.Parse(userId)
            )
            .OrderByDescending(
                x => x.SavedOn
            )
            .ToListAsync();

        return Ok(data);
    }

    [HttpDelete]
public async Task<IActionResult> Unsave(
    string contentId,
    string contentType
)
{
    var userId =
        User.FindFirstValue(
            ClaimTypes.NameIdentifier
        );

    if(string.IsNullOrWhiteSpace(userId))
    {
        return Unauthorized();
    }

    var userGuid =
        Guid.Parse(userId);

    var item =
        await _context.SavedContents
        .FirstOrDefaultAsync(
            x =>
                x.UserId ==
                userGuid
                &&
                x.ContentId ==
                contentId
                &&
                x.ContentType ==
                contentType
        );

        if(item == null)
        {
            return NotFound();
        }

        _context.SavedContents.Remove(
            item
        );

        await _context.SaveChangesAsync();

        return Ok();
    }
}