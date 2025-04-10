using CineNicheIntex.API.Data; // or whatever your namespace is for the Data folder
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CineNicheIntex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly UserRecommendationService _userService;

        public RecommendationController(UserRecommendationService userService)
        {
            _userService = userService;
        }

        [HttpGet("user/{userId}")]
public IActionResult GetRecommendationsByUser(int userId)
{
    try
    {
        var recs = _userService.GetRecommendations(userId);
        if (recs == null || !recs.Any())
            return NotFound();

        return Ok(recs);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error getting recommendations for user {userId}: {ex.Message}");
        return StatusCode(500, "An error occurred while processing your request.");
    }
}
    }
}
