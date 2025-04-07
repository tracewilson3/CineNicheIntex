using Microsoft.EntityFrameworkCore;

namespace CineNicheIntex.API.Data
{
    public class MoviesDbContext : DbContext
    {
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
        {
        }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Explicit table mapping
            modelBuilder.Entity<Movie>().ToTable("movies_titles");
            modelBuilder.Entity<User>().ToTable("movies_users");
            modelBuilder.Entity<Rating>().ToTable("movies_ratings");
        }

    }
}