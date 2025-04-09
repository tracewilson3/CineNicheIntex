using Microsoft.EntityFrameworkCore;

namespace CineNicheIntex.API.Data
{
    public class MoviesDbContext : DbContext
    {
        public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
        {
        }

        public DbSet<User> MovieUsers { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("movies_users");
            modelBuilder.Entity<Movie>().ToTable("movies_titles");
            modelBuilder.Entity<Rating>().ToTable("movies_ratings");

            // Prevent EF from trying to recreate these tables
            modelBuilder.Entity<User>().HasKey(u => u.user_id);
            modelBuilder.Entity<Movie>().HasKey(m => m.show_id);
            modelBuilder.Entity<Rating>().HasKey(r => r.user_id); // Assuming user_id is PK
        }
    }
}
