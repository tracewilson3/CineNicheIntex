using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data;

public class BooksDbContext : DbContext
{
    public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options)
    {
        
    }
    public DbSet<Book> Books { get; set; }
}