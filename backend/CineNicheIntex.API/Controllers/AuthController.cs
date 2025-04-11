using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using CineNicheIntex.API.Data;

namespace CineNicheIntex.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly MoviesDbContext _context;

        public AuthController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            MoviesDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            Console.WriteLine($"📨 Register attempt for: {dto.Email}");
            Console.WriteLine("📁 Movies DB path: " + _context.Database.GetDbConnection().DataSource);

            var user = new IdentityUser
            {
                UserName = dto.Email,
                Email = dto.Email
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                var messages = result.Errors.Select(e => e.Description).ToList();
                Console.WriteLine("❌ Registration failed:");
                foreach (var msg in messages)
                {
                    Console.WriteLine("   • " + msg);
                }

                return BadRequest(new { errors = messages });
            }

            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);

            try
            {
                var appUser = new User
                {
                    email = dto.Email,
                    hashed_password = "Identity",
                    name = "", phone = "", gender = "", city = "", state = "",
                    age = 0, Netflix = 0, Amazon_Prime = 0, DisneyPlus = 0,
                    ParamountPlus = 0, Max = 0, Hulu = 0, AppleTVPlus = 0, Peacock = 0,
                    zip = 0
                };

                _context.MovieUsers.Add(appUser);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 Error saving to movies_users: " + ex.Message);
                // Optionally return a soft error
            }

            await _userManager.AddToRoleAsync(user, "User");

            Console.WriteLine("✅ Registration successful for: " + dto.Email);
            return Ok(new { message = "User registered successfully." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.email);
            if (user == null)
                return Unauthorized(new { error = "Invalid email or password." });

            if (!user.EmailConfirmed)
                return Unauthorized(new { error = "Email not confirmed." });

            var isValid = await _userManager.CheckPasswordAsync(user, dto.password);
            if (!isValid)
                return Unauthorized(new { error = "Invalid email or password." });

            var roles = await _userManager.GetRolesAsync(user);
var isAdmin = roles.Contains("Administrator");
var code = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider);

if (isAdmin)
{
    Console.WriteLine($":closed_lock_with_key: Admin 2FA code for {user.Email}: {code}");
}
else
{
    try
    {
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential("byuisteam415@gmail.com", "ykseicgpponggsdf"),
            EnableSsl = true,
        };
        var mailMessage = new MailMessage
        {
            From = new MailAddress("byuisteam415@gmail.com", "CineNiche"),
            Subject = "Your CineNiche 2FA Code",
            Body = $"Hi,\n\nYour verification code is: {code}\n\nThis code will expire shortly.",
            IsBodyHtml = false,
        };
        mailMessage.To.Add(dto.email);
        smtpClient.Send(mailMessage);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Failed to send 2FA email: {ex.Message}");
    }
}
return Ok(new
{
    step = "2fa",
    message = isAdmin ? "Admin code printed to console." : "Verification code sent to your email.",
    email = user.Email,
    role = roles.FirstOrDefault(),

    code=isAdmin ? code: null 
});


        }

        [HttpPost("verify-2fa")]
        public async Task<IActionResult> Verify2FA([FromBody] VerifyDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.email);
            if (user == null)
                return Unauthorized(new { error = "User not found." });

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider, dto.code);
            if (!isValid)
                return Unauthorized(new { error = "Invalid or expired verification code." });

            await _signInManager.SignInAsync(user, isPersistent: false);

            var roles = await _userManager.GetRolesAsync(user);

            var roleName = roles.FirstOrDefault(); //assuming one role per user

            return Ok(new
            {
                message = "2FA verified. Login successful.",
                email = user.Email,

                role = roleName,

            });
        }
    }

    // ✅ DTOs
    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        public string email { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }

    public class VerifyDto
    {
        public string email { get; set; } = string.Empty;
        public string code { get; set; } = string.Empty;
    }
}