using CineNicheIntex.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace CineNicheIntex.API.Controllers
{



    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private BooksDbContext _moviesContext;

        public MoviesController(BooksDbContext temp)
        {
            _moviesContext = temp;
        }
        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int movieCount = 5,int pageNum=1, [FromQuery] List<string>? categories = null)
        {
            var query = _moviesContext.Movies.AsQueryable();

            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }
                
            var something = query
                .Skip((pageNum-1)*movieCount)
                .Take(movieCount)
                .ToList();
                
            var TotalNumMovies = query.Count();
            var someObject = new
            {
                movies = something,
                totalNumMovies = TotalNumMovies
            };
            return Ok(someObject);
        }
        
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] Movie newMovie)
        {
            _moviesContext.Movies.Add(newMovie);
            _moviesContext.SaveChanges();
            return Ok(newMovie);
        }
        [HttpPut("UpdateMovie/{movieId}")]
        public IActionResult UpdateMovie(int movieId, [FromBody] Movie updatedMovie)
        {
            var existingMovie= _moviesContext.Movie.Find(movieId);
                
            existingMovie.Title = updatedMovie.Title; // change all this
            existingMovie.Author = updatedMovie.Author;
            existingMovie.Publisher = updatedMovie.Publisher;
            existingMovie.ISBN = updatedMovie.ISBN;
            existingMovie.Classification = updatedMovie.Classification;
            existingMovie.Category = updatedMovie.Category;
            existingMovie.PageCount = updatedMovie.PageCount;
            existingMovie.Price = updatedMovie.Price;
            
            _moviesContext.Update(existingMovie);
            _moviesContext.SaveChanges();
            
            return Ok(existingMovie);
        }
            
        [HttpDelete("DeleteMovie/{MovieId}")]
        public IActionResult DeleteMovie(int MovieId)
        {
            var movie = _moviesContext.Movies.Find(movieId);
            if (movie == null)
            {
                return NotFound(new {message = "Not found"});
            }
                
            _moviesContext.Movies.Remove(movie);
            _moviesContext.SaveChanges();
            return NoContent();
        }
    }
}