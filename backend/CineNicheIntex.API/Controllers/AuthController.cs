using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace CineNicheIntex.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // ✅ Register user and confirm email immediately
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var user = new IdentityUser
            {
                UserName = dto.Email,
                Email = dto.Email
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                var messages = result.Errors.Select(e => e.Description).ToList();
                return BadRequest(new { errors = messages });
            }

            // ✅ Manually mark email as confirmed
            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);

            return Ok("User registered successfully.");
        }

        // ✅ Start login: verify credentials + send 2FA
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized(new { error = "Invalid email or password." });

            if (!user.EmailConfirmed)
                return Unauthorized(new { error = "Email not confirmed." });

            var isValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!isValid)
                return Unauthorized(new { error = "Invalid email or password." });

            // ✅ Generate 2FA token
            var code = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider);

            // ✅ Send code to email
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

                mailMessage.To.Add(dto.Email);
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send 2FA email: {ex.Message}");
            }

            return Ok(new
            {
                step = "2fa",
                message = "Verification code sent to your email.",
                email = user.Email
            });
        }

        // ✅ Final step of login: verify 2FA
        [HttpPost("verify-2fa")]
        public async Task<IActionResult> Verify2FA([FromBody] VerifyDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return Unauthorized(new { error = "User not found." });

            var isValid = await _userManager.VerifyTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider, dto.Code);
            if (!isValid)
                return Unauthorized(new { error = "Invalid or expired verification code." });

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new
            {
                message = "2FA verified. Login successful.",
                email = user.Email
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
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class VerifyDto
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}
