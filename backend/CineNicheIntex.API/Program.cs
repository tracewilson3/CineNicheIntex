using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CineNicheIntex.API.Data;

var builder = WebApplication.CreateBuilder(args);



// 🔐 Identity/auth DB
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

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



// Setup DB path
string dbPath;

if (builder.Environment.IsDevelopment())
{
    dbPath = Path.Combine(Directory.GetCurrentDirectory(), "Movies.db");
}
else
{
    dbPath = Path.Combine("D:\\home\\data", "Movies.db");
}

try
{
    builder.Services.AddDbContext<MoviesDbContext>(options =>
        options.UseSqlite($"Data Source={dbPath}"));
}
catch (Exception ex)
{
    Console.WriteLine("🔥 Failed to configure DB context: " + ex.Message);
}


// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://cineniche.org","https://blue-wave-05d54c91e.6.azurestaticapps.net")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();


// 🔧 Safely download DB
await EnsureDatabaseExistsAsync(app, dbPath);

// Middleware
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
        Console.WriteLine("🔥 Unhandled exception: " + ex.Message);
        Console.WriteLine(ex.StackTrace);
        throw;
    }

});



app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();


// ✅ Seed Admin user and role
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
        adminUser = null;
    }

    adminUser = new IdentityUser
    {
        UserName = adminEmail,
        Email = adminEmail,
        EmailConfirmed = true
    };

    var result = await userManager.CreateAsync(adminUser, adminPassword);
    if (result.Succeeded)
    {
        await userManager.AddToRoleAsync(adminUser, adminRole);
        Console.WriteLine("✅ Admin user created and assigned role.");
    }
    else
    {
        Console.WriteLine("❌ Failed to create admin user:");
        foreach (var error in result.Errors)
            Console.WriteLine($"- {error.Description}");
    }
}

Console.WriteLine("📂 DB exists? " + File.Exists(dbPath));


app.Run();


static async Task EnsureDatabaseExistsAsync(WebApplication app, string dbPath)
{
    try
    {
        if (File.Exists(dbPath))
        {
            Console.WriteLine("✅ Existing DB found at: " + dbPath);
            return;
        }

        Console.WriteLine("🌐 No local DB found, attempting to download from blob...");

        var client = new HttpClient();
        var blobUrl = app.Configuration["BlobDbUrl"];

        if (string.IsNullOrWhiteSpace(blobUrl))
        {
            Console.WriteLine("❌ BlobDbUrl not found in configuration.");
            return;
        }

        var bytes = await client.GetByteArrayAsync(blobUrl);
        await File.WriteAllBytesAsync(dbPath, bytes);

        Console.WriteLine("✅ Movies.db successfully downloaded to: " + dbPath);
    }
    catch (Exception ex)
    {
        Console.WriteLine("🔥 Failed to download DB: " + ex.Message);
        Console.WriteLine("🔥 STACKTRACE: " + ex.StackTrace);
    }
}
