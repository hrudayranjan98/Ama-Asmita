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
public class ContributionController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContributionController(
        AppDbContext context
    )
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
    [FromForm] ContributionRequest request
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

        var uploadPath =
            Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "uploads"
            );

        Directory.CreateDirectory(
            uploadPath
        );

        var contributorPhoto =
            await SaveFile(
                request.ContributorPhoto
            );

        var photo1 =
            await SaveFile(
                request.Photo1
            );

        var photo2 =
            await SaveFile(
                request.Photo2
            );

        var photo3 =
            await SaveFile(
                request.Photo3
            );

        var contribution =
            new Contribution
            {
                UserId =
                    Guid.Parse(userId),

                FullName =
                    request.FullName,

                Category =
                    request.Category,

                Title =
                    request.Title,

                Article =
                    request.Article,

                GoogleMapLink =
                    request.GoogleMapLink,

                ContributorAddress =
                    request.ContributorAddress,

                FacebookLink =
                    request.FacebookLink,

                InstagramLink =
                    request.InstagramLink,

                LinkedInLink =
                    request.LinkedInLink,

                ContributorPhoto =
                    contributorPhoto,

                Photo1 =
                    photo1,

                Photo2 =
                    photo2,

                Photo3 =
                    photo3
            };

        _context.Contributions.Add(
            contribution
        );

        await _context.SaveChangesAsync();

        return Ok(
            new
            {
                message =
                    "Contribution Submitted"
            }
        );
    }

    [HttpGet("my")]
    public IActionResult GetMyContributions()
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

        if(userId == null)
        {
            return Unauthorized();
        }

        var contributions =
            _context.Contributions
            .Where(x =>
                x.UserId == Guid.Parse(userId)
            )
            .OrderByDescending(x =>
                x.SubmittedOn
            )
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.Category,
                x.SubmittedOn,
                x.Status
            })
            .ToList();

        return Ok(contributions);
    }

private async Task<string> SaveFile(
    IFormFile? file
)
{
    if(file == null)
    {
        return "";
    }

    var fileName =
        $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

    var filePath =
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            "uploads",
            fileName
        );

    using var stream =
        new FileStream(
            filePath,
            FileMode.Create
        );

    await file.CopyToAsync(
        stream
    );

    return $"/uploads/{fileName}";
}

[HttpGet("{id}")]
public IActionResult GetById(
    Guid id
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

    var contribution =
        _context.Contributions
        .Where(x =>
            x.Id == id &&
            x.UserId == Guid.Parse(userId)
        )
        .Select(x => new
        {
            x.Id,
            x.FullName,
            x.Category,
            x.Title,
            x.Article,
            x.GoogleMapLink,
            x.ContributorAddress,
            x.FacebookLink,
            x.InstagramLink,
            x.LinkedInLink,
            x.ContributorPhoto,
            x.Photo1,
            x.Photo2,
            x.Photo3,
            x.Status,
            x.SubmittedOn
        })
        .FirstOrDefault();

    if(contribution == null)
    {
        return NotFound();
    }

    return Ok(contribution);
}

    [HttpDelete("{id}")]
    public async Task<IActionResult> Withdraw(
        Guid id
    )
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

        var contribution =
            await _context.Contributions
            .FindAsync(id);

        if(
            contribution == null ||
            contribution.UserId != Guid.Parse(userId!)
        )
        {
            return NotFound();
        }

        _context.Contributions.Remove(
            contribution
        );

        await _context.SaveChangesAsync();

        return Ok(
            new
            {
                message = "Contribution withdrawn"
            }
        );
    }
}