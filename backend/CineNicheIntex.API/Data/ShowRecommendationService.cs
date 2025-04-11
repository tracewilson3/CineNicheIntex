using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;

public class ShowRecommendationService
{
    private readonly Dictionary<string, List<string>> _recommendations;

    public ShowRecommendationService(string csvPath)
    {
        _recommendations = new();

        using var reader = new StreamReader(csvPath);
        using var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HeaderValidated = null,
            MissingFieldFound = null
        });

        var records = csv.GetRecords<ShowRecommendation>();
        foreach (var record in records)
        {
            if (!string.IsNullOrEmpty(record.ShowId))
            {
                _recommendations[record.ShowId] = record.GetRecommendations();
            }
        }
    }

    public List<string> GetRecommendations(string showId)
    {
        return _recommendations.TryGetValue(showId, out var recs)
            ? recs
            : new List<string>();
    }
}
