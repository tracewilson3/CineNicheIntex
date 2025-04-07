using Microsoft.EntityFrameworkCore;

namespace CineNicheIntex.API.Data;

public class BooksDbContext : DbContext
{
    public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options)
    {
        
    }
    public DbSet<Book> Movies { get; set; }
}