using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CineNicheIntex.API.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // ✅ This connects your custom User model to the database
        public DbSet<User> MovieUsers { get; set; }  // ✅ Renamed to avoid collision

    }
}