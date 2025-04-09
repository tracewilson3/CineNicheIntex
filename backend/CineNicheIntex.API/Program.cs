using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CineNicheIntex.API.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddConsole();

// 🌐 Configure Identity DB path
string identityDbPath = builder.Environment.IsDevelopment()
    ? Path.Combine(Directory.GetCurrentDirectory(), "identity.db")
    : Path.Combine("D:\\home\\data", "identity.db");

// 🌐 Configure Movies DB path
string moviesDbPath = builder.Environment.IsDevelopment()
    ? Path.Combine(Directory.GetCurrentDirectory(), "Movies.db")
    : Path.Combine("D:\\home\\data", "Movies.db");

// 🔧 Configure EF Core contexts
try
{
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite($"Data Source={identityDbPath}"));
    Console.WriteLine("✅ Identity DB context configured: " + identityDbPath);
}
catch (Exception ex)
{
    Console.WriteLine("🔥 Failed to configure Identity DB context: " + ex.Message);
}

try
{
    builder.Services.AddDbContext<MoviesDbContext>(options =>
        options.UseSqlite($"Data Source={moviesDbPath}"));
    Console.WriteLine("✅ Movies DB context configured: " + moviesDbPath);
}
catch (Exception ex)
{
    Console.WriteLine("🔥 Failed to configure Movies DB context: " + ex.Message);
}

// 🔐 Identity setup
builder.Services.AddDefaultIdentity<IdentityUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequiredUniqueChars = 3;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>();

// 🔧 Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://cineniche.org", "https://blue-wave-05d54c91e.6.azurestaticapps.net")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();

// 🔧 Force download both DBs
await EnsureDatabaseExistsAsync(app, moviesDbPath, identityDbPath);

// 🧾 Log resolved paths
Console.WriteLine("🧭 Movies DB path: " + moviesDbPath);
Console.WriteLine("🧭 Identity DB path: " + identityDbPath);

// 📦 File checks
if (File.Exists(moviesDbPath))
{
    Console.WriteLine("✅ Movies.db found (" + new FileInfo(moviesDbPath).Length + " bytes)");
}
else
{
    Console.WriteLine("❌ Movies.db NOT FOUND");
}

if (File.Exists(identityDbPath))
{
    Console.WriteLine("✅ identity.db found (" + new FileInfo(identityDbPath).Length + " bytes)");
}
else
{
    Console.WriteLine("❌ identity.db NOT FOUND");
}

// 🔧 Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.Use(async (context, next) =>
{
    try
    {
        context.Response.Headers.Add("Content-Security-Policy",
            "default-src 'self'; " +
            "script-src 'self' http://localhost:3000 'unsafe-inline'; " +
            "style-src 'self' http://localhost:3000 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "font-src 'self'; " +
            "connect-src 'self' http://localhost:3000 ws://localhost:3000;");
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine("🔥 Middleware exception: " + ex.Message);
        throw;
    }
});

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// ✅ OPTIONAL: Admin seeding (commented out until DBs are stable)

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    string adminEmail = "admin@cineniche.com";
    string adminPassword = "Admin#123";
    string adminRole = "Admin";

    if (!await roleManager.RoleExistsAsync(adminRole))
    {
        await roleManager.CreateAsync(new IdentityRole(adminRole));
    }

    var adminUser = await userManager.FindByEmailAsync(adminEmail);
    if (adminUser != null)
    {
        await userManager.DeleteAsync(adminUser);
    }

    var newAdmin = new IdentityUser
    {
        UserName = adminEmail,
        Email = adminEmail,
        EmailConfirmed = true
    };

    var result = await userManager.CreateAsync(newAdmin, adminPassword);
    if (result.Succeeded)
    {
        await userManager.AddToRoleAsync(newAdmin, adminRole);
        Console.WriteLine("✅ Admin user created and assigned role.");
    }
    else
    {
        Console.WriteLine("❌ Failed to create admin user:");
        foreach (var error in result.Errors)
            Console.WriteLine($"- {error.Description}");
    }
}


app.Run();


// 🔧 Utility: Download missing DBs (or overwrite them for testing)
static async Task EnsureDatabaseExistsAsync(WebApplication app, string moviesPath, string identityPath)
{
    var config = app.Configuration;
    var client = new HttpClient();

    try
    {
        // Always overwrite identity.db (for now)
        var identityUrl = config["IdentityDbUrl"];
        if (!string.IsNullOrWhiteSpace(identityUrl))
        {
            Console.WriteLine("🌐 Downloading identity.db (force overwrite)...");
            var bytes = await client.GetByteArrayAsync(identityUrl);
            await File.WriteAllBytesAsync(identityPath, bytes);
            Console.WriteLine("✅ identity.db downloaded.");
        }
        else
        {
            Console.WriteLine("⚠️ IdentityDbUrl not set in configuration.");
        }

        // Download Movies.db if missing
        if (!File.Exists(moviesPath))
        {
            var moviesUrl = config["BlobDbUrl"];
            if (!string.IsNullOrWhiteSpace(moviesUrl))
            {
                Console.WriteLine("🌐 Movies.db not found, downloading...");
                var bytes = await client.GetByteArrayAsync(moviesUrl);
                await File.WriteAllBytesAsync(moviesPath, bytes);
                Console.WriteLine("✅ Movies.db downloaded.");
            }
            else
            {
                Console.WriteLine("⚠️ BlobDbUrl not set in configuration.");
            }
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("🔥 DB download error: " + ex.Message);
    }
}
