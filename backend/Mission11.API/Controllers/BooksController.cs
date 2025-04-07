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
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _booksContext.Books.Add(newBook);
            _booksContext.SaveChanges();
            return Ok(newBook);
        }
        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook= _booksContext.Books.Find(bookId);
                
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            
            _booksContext.Update(existingBook);
            _booksContext.SaveChanges();
            
            return Ok(existingBook);
        }
            
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _booksContext.Books.Find(bookId);
            if (book == null)
            {
                return NotFound(new {message = "Not found"});
            }
                
            _booksContext.Books.Remove(book);
            _booksContext.SaveChanges();
            return NoContent();
        }
    }
}