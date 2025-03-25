using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{



    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BooksDbContext _booksContext;

        public BooksController(BooksDbContext temp)
        {
            _booksContext = temp;
        }
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int bookCount = 5,int pageNum=1, [FromQuery] List<string>? categories = null)
        {
            var query = _booksContext.Books.AsQueryable();

            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }
                
            var something = query
                .Skip((pageNum-1)*bookCount)
                .Take(bookCount)
                .ToList();
                
            var TotalNumBooks = query.Count();
            var someObject = new
            {
                books = something,
                totalNumBooks = TotalNumBooks
            };
            return Ok(someObject);
        }
        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _booksContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
                
            return Ok(categories);
        }
    }
}