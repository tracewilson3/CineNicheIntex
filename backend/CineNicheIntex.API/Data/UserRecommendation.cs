

using CsvHelper.Configuration.Attributes;

namespace CineNicheIntex.API.Data
{
public class UserRecommendation
{
    [Name("User ID")]
    public int UserId { get; set; }

    [Name("Recommendation 1")]
    public string Rec1 { get; set; }

    [Name("Recommendation 2")]
    public string Rec2 { get; set; }

    [Name("Recommendation 3")]
    public string Rec3 { get; set; }

    [Name("Recommendation 4")]
    public string Rec4 { get; set; }

    [Name("Recommendation 5")]
    public string Rec5 { get; set; }

    public List<string> GetRecommendations()
    {
        return new List<string> { Rec1, Rec2, Rec3, Rec4, Rec5 };
    }
}
}