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

        // ✅ Public access
        [HttpGet("AllMovies")]
        public IActionResult GetMovies()
        {
            var movies = _moviesContext.Movies.Take(20).ToList();
            return Ok(movies);
        }

        // 🔐 Admin only
        [Authorize(Roles = "Admin")]
        [HttpGet("AllUsers")]
        public IActionResult GetUsers()
        {
            var users = _moviesContext.Users.Take(20).ToList();
            return Ok(users);
        }

        // 🔐 Admin only
        [Authorize(Roles = "Admin")]
        [HttpGet("AllRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _moviesContext.Ratings.Take(20).ToList();
            return Ok(ratings);
        }

        // 🔐 Admin only
        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _moviesContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // 🔐 Admin-only: Add new movie
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

        // 🔐 Admin-only: Delete movie
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
    }
}
