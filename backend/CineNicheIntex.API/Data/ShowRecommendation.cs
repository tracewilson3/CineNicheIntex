using CsvHelper.Configuration.Attributes;

public class ShowRecommendation
{
    [Name("If you watched")]
    public string ShowId { get; set; }

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

    [Name("Recommendation 6")]
    public string Rec6 { get; set; }

    [Name("Recommendation 7")]
    public string Rec7 { get; set; }

    [Name("Recommendation 8")]
    public string Rec8 { get; set; }

    [Name("Recommendation 9")]
    public string Rec9 { get; set; }

    [Name("Recommendation 10")]
    public string Rec10 { get; set; }

    public List<string> GetRecommendations()
    {
        return new List<string> { Rec1, Rec2, Rec3, Rec4, Rec5,Rec6,Rec7,Rec8,Rec9,Rec10 };
    }
}
