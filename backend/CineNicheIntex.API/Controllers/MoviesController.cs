using CineNicheIntex.API.Data;
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
            // parameters: int bookCount = 5,int pageNum=1, [FromQuery] List<string>? categories = null

            var movies = _moviesContext.Movies.Take(20).ToList();

            return Ok(movies);
            // var query = _moviesContext.Movies.AsQueryable();

            // if (categories != null && categories.Any())
            // {
            //     query = query.Where(b => categories.Contains(b.Category));
            // }

            // var something = query
            //     .Skip((pageNum-1)*bookCount)
            //     .Take(bookCount)
            //     .ToList();

            // var TotalNumBooks = query.Count();
            // var someObject = new
            // {
            //     books = something,
            //     totalNumBooks = TotalNumBooks
            // };
            // return Ok(someObject);
        }

        //[HttpPost("AddMovie")]
        //public IActionResult AddMovie([FromBody] Movie newMovie)
        //{
        //    _moviesContext.Movies.Add(newMovie);
        //    _moviesContext.SaveChanges();
        //    return Ok(newMovie);
        //}
    }
}



//         [HttpGet("GetCategories")]
//         public IActionResult GetCategories()
//         {
//             var categories = _booksContext.Books
//                 .Select(p => p.Category)
//                 .Distinct()
//                 .ToList();
                
//             return Ok(categories);
//         }
//         [HttpPost("AddBook")]
//         public IActionResult AddBook([FromBody] Book newBook)
//         {
//             _booksContext.Books.Add(newBook);
//             _booksContext.SaveChanges();
//             return Ok(newBook);
//         }
//         [HttpPut("UpdateBook/{bookId}")]
//         public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
//         {
//             var existingBook= _booksContext.Books.Find(bookId);
                
//             existingBook.Title = updatedBook.Title;
//             existingBook.Author = updatedBook.Author;
//             existingBook.Publisher = updatedBook.Publisher;
//             existingBook.ISBN = updatedBook.ISBN;
//             existingBook.Classification = updatedBook.Classification;
//             existingBook.Category = updatedBook.Category;
//             existingBook.PageCount = updatedBook.PageCount;
//             existingBook.Price = updatedBook.Price;
            
//             _booksContext.Update(existingBook);
//             _booksContext.SaveChanges();
            
//             return Ok(existingBook);
//         }
            
//         [HttpDelete("DeleteBook/{bookId}")]
//         public IActionResult DeleteBook(int bookId)
//         {
//             var book = _booksContext.Books.Find(bookId);
//             if (book == null)
//             {
//                 return NotFound(new {message = "Not found"});
//             }
                
//             _booksContext.Books.Remove(book);
//             _booksContext.SaveChanges();
//             return NoContent();
//         }
//     }
// }