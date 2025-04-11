using CineNicheIntex.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace CineNicheIntex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly UserRecommendationService _userService;
        private readonly ShowRecommendationService _showService;

        public RecommendationController(
            UserRecommendationService userService,
            ShowRecommendationService showService)
        {
            _userService = userService;
            _showService = showService;
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

        [HttpGet("show/{showId}")]
        public IActionResult GetRecommendationsByShow(string showId)
        {
            
            try{
            var recs = _showService.GetRecommendations(showId);
            
            if (recs == null || !recs.Any())
                return NotFound();

            return Ok(recs);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting recommendations for movie {showId}: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
