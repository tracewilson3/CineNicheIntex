using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;

namespace CineNicheIntex.API.Data
{
public class UserRecommendationService
{
    private readonly Dictionary<int, List<string>> _recommendations;

    public UserRecommendationService(string csvPath)
    {
        _recommendations = new();

        using var reader = new StreamReader(csvPath);
        using var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HeaderValidated = null,
            MissingFieldFound = null
        });

        var records = csv.GetRecords<UserRecommendation>();
        foreach (var record in records)
        {
            _recommendations[record.UserId] = record.GetRecommendations();
        }
    }

    public List<string> GetRecommendations(int userId)
    {
        return _recommendations.TryGetValue(userId, out var recs) ? recs : new List<string>();
    }
}
}