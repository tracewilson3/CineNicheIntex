
using System.ComponentModel.DataAnnotations;


namespace CineNicheIntex.API.Data
{
    public class Rating
    {
        [Key]
        public int user_id { get; set; }
        public int show_id { get; set; }
        public int rating { get; set; }

    }

}

