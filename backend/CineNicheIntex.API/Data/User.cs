using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CineNicheIntex.API.Data
{
    [Table("movies_users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int user_id { get; set; }

        // Nullable strings
        public string? name { get; set; }
        public string? phone { get; set; }
        public string email { get; set; } = string.Empty; // required, so default it

        // Nullable int for optional fields (if you don’t always provide them)
        public int? age { get; set; }
        public string? gender { get; set; }

        public int? Netflix { get; set; }

        [Column("Amazon Prime")]
        public int? Amazon_Prime { get; set; }

        [Column("Disney+")]
        public int? DisneyPlus { get; set; }

        [Column("Paramount+")]
        public int? ParamountPlus { get; set; }

        public int? Max { get; set; }
        public int? Hulu { get; set; }

        [Column("Apple TV+")]
        public int? AppleTVPlus { get; set; }

        public int? Peacock { get; set; }

        public string? city { get; set; }
        public string? state { get; set; }
        public int? zip { get; set; }

        public string? hashed_password { get; set; }
        public string? TwoFactorCode { get; set; }
        public DateTime? TwoFactorExpiry { get; set; }
    }

    public class LoginDto
    {
        public string email { get; set; }
        public string password { get; set; }
    }

    public class VerifyDto
    {
        public int user_id { get; set; }
        public string code { get; set; }
    }
}