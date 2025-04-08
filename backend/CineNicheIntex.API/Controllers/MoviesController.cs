using CineNicheIntex.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace CineNicheIntex.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesDbContext _moviesContext;

        public MoviesController(MoviesDbContext context)
        {
            _moviesContext = context;
        }

        // ✅ Public: get 20 movies
        [HttpGet("AllMovies")]
        public IActionResult GetMovies()
        {
            try
            {
                var movies = _moviesContext.Movies.Take(20).ToList();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 ERROR in GetMovies: " + ex.Message);
                return StatusCode(500, "Error retrieving movies.");
            }
        }

        // 🔐 Admin only
        // [Authorize(Roles = "Admin")]
        [HttpGet("AllUsers")]
        public IActionResult GetUsers()
        {
            var users = _moviesContext.Users.Take(20).ToList();
            return Ok(users);
        }

        // 🔐 Admin only
        // [Authorize(Roles = "Admin")]
        [HttpGet("AllRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _moviesContext.Ratings.Take(20).ToList();
            return Ok(ratings);
        }

        // ✅ Public: get user by ID
        [HttpGet("User/{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _moviesContext.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // 🔐 Admin only: Add a new movie
        [Authorize(Roles = "Admin")]
        [HttpPost("AddMovie")]
        public async Task<IActionResult> AddMovie([FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _moviesContext.Movies.Add(movie);
                await _moviesContext.SaveChangesAsync();
                return Ok(new { message = "Movie added successfully", movie });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error adding movie: {ex.Message}");
                return StatusCode(500, "An error occurred while adding the movie.");
            }
        }

        // 🔐 Admin only: Delete movie by ID
        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteMovie/{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movie = await _moviesContext.Movies.FindAsync(id);
            if (movie == null)
                return NotFound(new { message = "Movie not found" });

            try
            {
                _moviesContext.Movies.Remove(movie);
                await _moviesContext.SaveChangesAsync();
                return Ok(new { message = "Movie deleted successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error deleting movie: {ex.Message}");
                return StatusCode(500, "An error occurred while deleting the movie.");
            }
        }

        // 🔐 2FA verification (non-admin)
        [HttpPost("VerifyCode")]
        public async Task<IActionResult> VerifyCode([FromBody] VerifyDto dto)
        {
            var user = await _moviesContext.Users.FindAsync(dto.Email);
            if (user == null)
                return Unauthorized("Invalid user.");

            if (user.TwoFactorCode != dto.Code || user.TwoFactorExpiry < DateTime.UtcNow)
                return Unauthorized("Invalid or expired verification code.");

            user.TwoFactorCode = null;
            user.TwoFactorExpiry = null;
            await _moviesContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Verification successful",
                user_id = user.user_id
            });
        }
    }
}
