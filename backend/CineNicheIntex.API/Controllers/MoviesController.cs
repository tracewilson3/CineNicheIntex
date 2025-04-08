
using CineNicheIntex.API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CineNicheIntex.API.Controllers
{



    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private MoviesDbContext _moviesContext;

        public MoviesController(MoviesDbContext temp)
        {
            _moviesContext = temp;
        }

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
                Console.WriteLine("🔥 STACKTRACE: " + ex.StackTrace);
                return StatusCode(500, "Error retrieving movies.");
            }
        }


        [HttpGet("AllUsers")]
        public IActionResult GetUsers()
        {
            var users = _moviesContext.Users.Take(20).ToList();
            return Ok(users);
        }


        [HttpGet("AllRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _moviesContext.Ratings.Take(20).ToList();
            return Ok(ratings);
        }
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
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var passwordHasher = new PasswordHasher<User>();
                newUser.hashed_password = passwordHasher.HashPassword(newUser, newUser.hashed_password); // Hashing the raw password

                _moviesContext.Users.Add(newUser);
                await _moviesContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUserById), new { id = newUser.user_id }, newUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR during CreateUser:");
                Console.WriteLine(ex.ToString()); // full stack trace
                return StatusCode(500, "An error occurred while creating the user.");
            }

        }

        
        }

    }




