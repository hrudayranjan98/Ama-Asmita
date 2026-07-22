using AmaAsmita.Infrastructure.Persistence;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

namespace AmaAsmita.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(
        AppDbContext context
    )
    {
        _context = context;
    }

    [HttpGet("activity")]
    public IActionResult GetActivity()
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

        var touristCount =
            _context.Contributions
            .Count(x =>
                x.UserId == guid &&
                x.Category == "TouristSpot"
            );

        var foodCount =
            _context.Contributions
            .Count(x =>
                x.UserId == guid &&
                x.Category == "Foods"
            );

        var legendCount =
            _context.Contributions
            .Count(x =>
                x.UserId == guid &&
                x.Category == "Legends"
            );

        var savedTourist =
            _context.SavedContents
            .Count(x =>
                x.UserId == guid &&
                x.ContentType == "TouristSpot"
            );

        var savedFood =
            _context.SavedContents
            .Count(x =>
                x.UserId == guid &&
                x.ContentType == "Food"
            );

        var savedLegend =
            _context.SavedContents
            .Count(x =>
                x.UserId == guid &&
                x.ContentType == "Legend"
            );

        return Ok(
            new
            {
                touristCount,
                foodCount,
                legendCount,

                savedTourist,
                savedFood,
                savedLegend
            }
        );
    }
}