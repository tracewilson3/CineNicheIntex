using Microsoft.EntityFrameworkCore;
using CineNicheIntex.API.Data;

var builder = WebApplication.CreateBuilder(args);

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
        policy.WithOrigins("http://localhost:3000", "http://cineniche.org")
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
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine("🔥 Unhandled exception: " + ex.Message);
        Console.WriteLine(ex.StackTrace);
        throw;
    }
});


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

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
