using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{



    [Route("[controller]")]
    [ApiController]
    public class BooksController
    {
        private BooksDbContext _booksContext;

        public BooksController(BooksDbContext temp)
        {
            _booksContext = temp;
        }
        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return _booksContext.Books.ToList();
        }
    }
}