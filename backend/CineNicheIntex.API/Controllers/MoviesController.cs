using CineNicheIntex.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace CineNicheIntex.API.Controllers
{
           public class RatedMovieDto
        {
            public Movie movie { get; set; } = default!;
            public double averageRating { get; set; }
        }

        public class ReviewedMovieDto
        {
            public Movie movie { get; set; } = default!;
            public int reviewCount { get; set; }
        }
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesDbContext _moviesContext;

        public MoviesController(MoviesDbContext context)
        {
            _moviesContext = context;
        }

       
        [HttpGet("AllMovies")]
        public IActionResult GetMovies([FromQuery] int pageSize = 20, [FromQuery] int pageNumber = 1, [FromQuery] string? genre = null)
        {
            HttpContext.Response.Cookies.Append("FavoriteGenre", "Action", new CookieOptions
            {
                HttpOnly = true,
                Secure = true, //this means that the cookie will only be used over HTTPS
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddDays(1)
            });

            try
            {
                IQueryable<Movie> query = _moviesContext.Movies;

                if (!string.IsNullOrEmpty(genre))
                {
                    // Map the genre query to the exact property name
                    var matchingProp = typeof(Movie)
                        .GetProperties()
                        .FirstOrDefault(p => string.Equals(p.Name, genre, StringComparison.OrdinalIgnoreCase));

                    if (matchingProp == null)
                    {
                        return BadRequest("Invalid genre field name.");
                    }


                    // Use the correct case version of the property name
                    query = query.Where(m => EF.Property<int>(m, matchingProp.Name) == 1);
                }

                var totalNumMovies = query.Count();

                var movies = query
                    .OrderBy(m => m.show_id)
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                return Ok(new
                {
                    movies,
                    totalNumMovies
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR in GetMovies: " + ex.Message);
                Console.WriteLine("STACKTRACE: " + ex.StackTrace);
                return StatusCode(500, "Error retrieving movies.");
            }
        }


           [HttpGet("MovieDetails/{show_id}")]
        public IActionResult GetMovieDetails(int show_id)
        {
            try
            {
                var movie = _moviesContext.Movies.FirstOrDefault(x => x.show_id == show_id);
                return Ok(movie);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 ERROR in GetMovies: " + ex.Message);
                Console.WriteLine("🔥 STACKTRACE: " + ex.StackTrace);
                return StatusCode(500, "Error retrieving movies.");
            }
        }

    

        // 🔐 Admin only
        // [Authorize(Roles = "Admin")]
        [HttpGet("AllUsers")]
        public IActionResult GetUsers(int pageSize = 20, [FromQuery] int pageNum = 1)
        {
            var totalUsers = _moviesContext.MovieUsers.Count();

            var users = _moviesContext.MovieUsers
                    .OrderBy(m => m.user_id)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

            return Ok(new
            {
                users,
                totalNumUsers = totalUsers
            });
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
            var user = await _moviesContext.MovieUsers.FindAsync(id);
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
                _moviesContext.MovieUsers.Add(user);
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
            var user = await _moviesContext.MovieUsers.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            try
            {
                _moviesContext.MovieUsers.Remove(user);
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

            var user = await _moviesContext.MovieUsers.FindAsync(id);
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
                message = "2FA verified",
                user_id = user.user_id,
                name = user.name,
                email = user.email
            });
        }
        
        [HttpGet("TopRated")]
        public IActionResult GetTopRatedMovies()
        {
            try
            {
                var topRated = _moviesContext.Movies
                    .Join(_moviesContext.Ratings,
                        movie => movie.show_id,
                        rating => rating.show_id,
                        (movie, rating) => new { movie, rating })
                    .GroupBy(m => m.movie)
                    .Select(g => new
                    {
                        movie = g.Key,
                        averageRating = g.Average(x => x.rating.rating)
                    })
                    .OrderByDescending(x => x.averageRating)
                    .Take(10)
                    .ToList();

                return Ok(topRated);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 ERROR in GetTopRatedMovies: " + ex.Message);
                Console.WriteLine("🔥 STACKTRACE: " + ex.StackTrace);
                return StatusCode(500, new { error = ex.Message });
            }
        }




    
    
[HttpPut("UpdateProfile/{email}")]
public async Task<IActionResult> UpdateUserProfile(string email, [FromBody] User updatedData)
{
    var user = await _moviesContext.MovieUsers.FirstOrDefaultAsync(u => u.email == email);
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


     

        [HttpGet("MostReviewed")]
        public IActionResult GetMostReviewedMovies()
        {
            try
            {
                var mostReviewed = _moviesContext.Movies
                    .Join(_moviesContext.Ratings,
                        movie => movie.show_id,
                        rating => rating.show_id,
                        (movie, rating) => new { movie, rating })
                    .GroupBy(m => m.movie)
                    .Select(g => new ReviewedMovieDto
                    {
                        movie = g.Key,
                        reviewCount = g.Count()
                    })
                    .OrderByDescending(x => x.reviewCount)
                    .Take(10)
                    .ToList();

                return Ok(mostReviewed);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 ERROR in GetMostReviewedMovies: " + ex.Message);
                Console.WriteLine("🔥 STACKTRACE: " + ex.StackTrace);
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("Search")]
        public IActionResult SearchMovies(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query cannot be empty.");

            var lowerQuery = query.ToLower();

            var results = _moviesContext.Movies
                .Where(m =>
                    m.title.ToLower().Contains(lowerQuery) ||
                    (m.director != null && m.director.ToLower().Contains(lowerQuery)) ||
                    (m.cast != null && m.cast.ToLower().Contains(lowerQuery)))
                .Take(497)
                .ToList();

            return Ok(results);
        }

}

}