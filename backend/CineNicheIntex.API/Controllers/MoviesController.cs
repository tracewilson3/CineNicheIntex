using CineNicheIntex.API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;



namespace CineNicheIntex.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private MoviesDbContext _moviesContext;

        public MoviesController(MoviesDbContext temp)
        {
            _moviesContext = temp;
        }

        [HttpGet("AllMovies")]
        public IActionResult GetMovies()
        {
            try
            {
                var movies = _moviesContext.Movies.Take(20).ToList();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 ERROR in GetMovies: " + ex.Message);
                Console.WriteLine("🔥 STACKTRACE: " + ex.StackTrace);
                return StatusCode(500, "Error retrieving movies.");
            }
        }


        [HttpGet("AllUsers")]
        public IActionResult GetUsers()
        {
            var users = _moviesContext.Users.Take(20).ToList();
            return Ok(users);
        }

        [HttpGet("AllRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _moviesContext.Ratings.Take(20).ToList();
            return Ok(ratings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _moviesContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var passwordHasher = new PasswordHasher<User>();
                newUser.hashed_password = passwordHasher.HashPassword(newUser, newUser.hashed_password);

                _moviesContext.Users.Add(newUser);
                await _moviesContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUserById), new { id = newUser.user_id }, newUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR during CreateUser:");
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occurred while creating the user.");
            }
        }
[HttpPost("LoginUser")]
public async Task<IActionResult> LoginUser([FromBody] LoginDto loginDto)
{
    if (string.IsNullOrWhiteSpace(loginDto.email) || string.IsNullOrWhiteSpace(loginDto.password))
    {
        return BadRequest("Email and password are required.");
    }

    var user = await _moviesContext.Users.FirstOrDefaultAsync(u => u.email == loginDto.email);

    if (user == null)
    {
        return Unauthorized("Invalid email or password.");
    }

    var passwordHasher = new PasswordHasher<User>();
    var result = passwordHasher.VerifyHashedPassword(user, user.hashed_password, loginDto.password);

    if (result == PasswordVerificationResult.Failed)
    {
        return Unauthorized("Invalid email or password.");
    }

    // ✅ Generate and store 2FA code
    var code = new Random().Next(100000, 999999).ToString();
    user.TwoFactorCode = code;
    user.TwoFactorExpiry = DateTime.UtcNow.AddMinutes(5);
    await _moviesContext.SaveChangesAsync();

    // ✅ Send 2FA code to user's email
    try
    {
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("byuisteam415@gmail.com", "ykseicgpponggsdf"), // <- NO spaces
            EnableSsl = true,
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress("byuisteam415@gmail.com", "CineNiche"),
            Subject = "Your CineNiche 2FA Code",
            Body = $"Hi {user.name},\n\nYour 2FA verification code is: {code}\n\nThis code will expire in 5 minutes.",
            IsBodyHtml = false,
        };

        mailMessage.To.Add(user.email);
        smtpClient.Send(mailMessage);
        Console.WriteLine($"📬 Sent 2FA code to: {user.email}");
    }
    catch (Exception ex)
    {
        Console.WriteLine("❌ Failed to send email:");
        Console.WriteLine(ex.Message);
        return StatusCode(500, "Failed to send verification email. Please try again later.");
    }

    return Ok(new
    {
        step = "2fa",
        message = "A verification code has been sent to your email.",
        user_id = user.user_id
    });
}
 
        [HttpPost("VerifyCode")]
        public async Task<IActionResult> VerifyCode([FromBody] VerifyDto dto)
        {
            var user = await _moviesContext.Users.FindAsync(dto.user_id);
            if (user == null)
                return Unauthorized("Invalid user.");

            if (user.TwoFactorCode != dto.code || user.TwoFactorExpiry < DateTime.UtcNow)
                return Unauthorized("Invalid or expired verification code.");

            user.TwoFactorCode = null;
            user.TwoFactorExpiry = null;
            await _moviesContext.SaveChangesAsync();

            return Ok(new
            {
                message = "2FA verified",
                user_id = user.user_id,
                name = user.name,
                email = user.email
            });
        }
    }
}


