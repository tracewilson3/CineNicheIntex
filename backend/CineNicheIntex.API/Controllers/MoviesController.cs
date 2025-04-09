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
                var movies = _moviesContext.Movies.OrderByDescending(m => m.show_id).Take(20).ToList();
                foreach (var m in movies)
                    {
                        Console.WriteLine($"{m.show_id}: {m.title}");
                    }
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
            var users = _moviesContext.Users.OrderByDescending(u => u.user_id).Take(20).ToList();
            return Ok(users);
        }

        // 🔐 Admin only
        // [Authorize(Roles = "Admin")]
        [HttpGet("AllRatings")]
        public IActionResult GetAllRatings()
        {
            var ratings = _moviesContext.Ratings.ToList();
            Console.WriteLine($"📊 Retrieved {ratings.Count} ratings");

            // Optional: Dump first few for debugging
            foreach (var r in ratings.Take(5))
                Console.WriteLine($"🧾 user_id={r.user_id}, show_id={r.show_id}, rating={r.rating}");

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
        // [Authorize(Roles = "Admin")]
        [HttpPost("AddMovie")]
public async Task<IActionResult> AddMovie([FromBody] Movie movie)
{
    Console.WriteLine("🎬 AddMovie called. Incoming show_id: " + movie.show_id);

    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    try
    {
        _moviesContext.Movies.Add(movie);
        await _moviesContext.SaveChangesAsync();
        Console.WriteLine("✅ Movie saved. Generated show_id: " + movie.show_id);
        return Ok(new { message = "Movie added successfully", movie });
    }
    catch (Exception ex)
    {
        Console.WriteLine("❌ Error adding movie: " + ex.Message);
        return StatusCode(500, "Internal server error");
    }
}

        // 🔐 Admin only: Update a movie
        // [Authorize(Roles = "Admin")]
        [HttpPut("UpdateMovie/{id}")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] Movie updatedMovie)
        {
            if (id != updatedMovie.show_id)
                return BadRequest("Movie ID mismatch.");

            var existingMovie = await _moviesContext.Movies.FindAsync(id);
            if (existingMovie == null)
                return NotFound("Movie not found.");

            // Copy over updated properties
            _moviesContext.Entry(existingMovie).CurrentValues.SetValues(updatedMovie);

            try
            {
                await _moviesContext.SaveChangesAsync();
                return Ok(new { message = "Movie updated successfully", movie = existingMovie });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to update movie: {ex.Message}");
            }
        }

        // 🔐 Admin only: Delete movie by ID
        // [Authorize(Roles = "Admin")]
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
        // 🔐 Admin only: Add a new user
        // [Authorize(Roles = "Admin")]
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _moviesContext.Users.Add(user);
                await _moviesContext.SaveChangesAsync();
                return Ok(new { message = "User added successfully", user });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error adding User: {ex.Message}");
                return StatusCode(500, "An error occurred while adding the user.");
            }
        }
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _moviesContext.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            try
            {
                _moviesContext.Users.Remove(user);
                await _moviesContext.SaveChangesAsync();
                return Ok(new { message = "User deleted successfully" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error deleting user: {ex.Message}");
                return StatusCode(500, "An error occurred while deleting the user.");
            }
        }

        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.user_id)
                return BadRequest(new { message = "User ID mismatch" });

            var user = await _moviesContext.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            try
            {
                // Update all fields
                _moviesContext.Entry(user).CurrentValues.SetValues(updatedUser);
                await _moviesContext.SaveChangesAsync();

                return Ok(new { message = "User updated successfully", updatedUser });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error updating user: {ex.Message}");
                return StatusCode(500, "An error occurred while updating the user.");
            }
        }



        // 🔐 2FA verification (non-admin)
        [HttpPost("VerifyCode")]
        public async Task<IActionResult> VerifyCode([FromBody] MovieVerifyDto dto)
        {
            var user = await _moviesContext.MovieUsers
                .FirstOrDefaultAsync(u => u.email == dto.Email); // ✅ query by email instead of PK

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
[HttpPut("UpdateProfile/{email}")]
public async Task<IActionResult> UpdateUserProfile(string email, [FromBody] User updatedData)
{
    var user = await _moviesContext.Users.FirstOrDefaultAsync(u => u.email == email);
    if (user == null)
        return NotFound(new { message = "User not found" });

    // Update allowed fields
    user.name = updatedData.name;
    user.phone = updatedData.phone;
    user.gender = updatedData.gender;
    user.city = updatedData.city;
    user.state = updatedData.state;
    user.age = updatedData.age;
    user.zip = updatedData.zip;

    user.Netflix = updatedData.Netflix;
    user.Amazon_Prime = updatedData.Amazon_Prime;
    user.DisneyPlus = updatedData.DisneyPlus;
    user.ParamountPlus = updatedData.ParamountPlus;
    user.Max = updatedData.Max;
    user.Hulu = updatedData.Hulu;
    user.AppleTVPlus = updatedData.AppleTVPlus;
    user.Peacock = updatedData.Peacock;

    await _moviesContext.SaveChangesAsync();

    return Ok(new { message = "Profile updated successfully" });
}
 // ✅ Local DTO to avoid conflict
    public class MovieVerifyDto
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
