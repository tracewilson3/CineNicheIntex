using Microsoft.EntityFrameworkCore;

namespace CineNicheIntex.API.Data
{
    public class MoviesDbContext : DbContext
    {
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Explicit table mapping
            modelBuilder.Entity<Movie>().ToTable("movies_titles");
        }
    }
}
