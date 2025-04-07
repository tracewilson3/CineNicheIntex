using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CineNicheIntex.API.Data;

[Table("movies_titles")]
public class Movie
{
    [Key]
    public string show_id { get; set; }
    [Column("type")]
    public string? type { get; set; }
    public string title { get; set; }
    public string? director { get; set; }
    [Column("cast")]
    public string? cast { get; set; }
    public string? country { get; set; }
    public int? release_year { get; set; }
    public string? rating { get; set; }
    public string? duration { get; set; }
    public string? description { get; set; }
    public int? Action { get; set; }
    public int? Adventure { get; set; }
    [Column("Anime Series International TV Shows")]
    public int? Anime_Series_International_TV_Shows { get; set; }
    [Column("British TV Shows Docuseries International TV Shows")]
    public int? British_TV_Shows_Docuseries_International_TV_Shows { get; set; }
    public int? Children { get; set; }
    public int? Comedies { get; set; }
    [Column("Comedies Dramas International Movies")]
    public int? Comedies_Dramas_International_Movies { get; set; }
    [Column("Comedies International Movies")]
    public int? Comedies_International_Movies { get; set; }
    [Column("Comedies Romantic Movies")]
    public int? Comedies_Romantic_Movies { get; set; }
    [Column("Crime TV Shows Docuseries")]
    public int? Crime_TV_Shows_Docuseries { get; set; }
    public int? Documentaries { get; set; }
    [Column("Documentaries International Movies")]
    public int? Documentaries_International_Movies { get; set; }
    public int? Docuseries { get; set; }
    public int? Dramas { get; set; }
    [Column("Dramas International Movies")]
    public int? Dramas_International_Movies { get; set; }
    [Column("Dramas Romantic Movies")]
    public int? Dramas_Romantic_Movies { get; set; }
    [Column("Family Movies")]
    public int? Family_Movies { get; set; }
    public int? Fantasy { get; set; }
    [Column("Horror Movies")]
    public int? Horror_Movies { get; set; }
    [Column("International Movies Thrillers")]
    public int? International_Movies_Thrillers { get; set; }
    [Column("International TV Shows Romantic TV Shows TV Dramas")]
    public int? International_TV_Shows_Romantic_TV_Shows_TV_Dramas { get; set; }
    [Column("Kids' TV")]
    public int? Kids_TV { get; set; }
    [Column("Language TV Shows")]
    public int? Language_TV_Shows { get; set; }
    public int? Musicals { get; set; }
    [Column("Nature TV")]
    public int? Nature_TV { get; set; }
    [Column("Reality TV")]
    public int? Reality_TV { get; set; }
    public int? Spirituality { get; set; }
    [Column("TV Action")]
    public int? TV_Action { get; set; }
    [Column("TV Comedies")]
    public int? TV_Comedies { get; set; }
    [Column("TV Dramas")]
    public int? TV_Dramas { get; set; }
    [Column("Talk Shows TV Comedies")]
    public int? Talk_Shows_TV_Comedies { get; set; }
    public int? Thrillers { get; set; }
}