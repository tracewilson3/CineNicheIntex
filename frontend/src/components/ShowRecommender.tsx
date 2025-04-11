import { useState } from 'react';
import { fetchShowRecommendations } from '../api/RecommendationAPI';

const ShowRecommender = () => {
  const [inputId, setInputId] = useState('');
  const [showId, setShowId] = useState<string | null>(null);
  const [recs, setRecs] = useState<string[]>([]);

  const handleFetch = async () => {
    if (!inputId.trim()) return;

    const results = await fetchShowRecommendations(inputId);
    setShowId(inputId);
    setRecs(results);
  };

  return (
    <div>
      <h2>Get Recommendations for a Show</h2>

      <input
        type="text"
        placeholder="Enter Show ID"
        value={inputId}
        onChange={(e) => setInputId(e.target.value)}
      />
      <button onClick={handleFetch}>Get Recommendations</button>

      {showId && (
        <>
          <h3>Recommendations for Show {showId}</h3>
          {recs.length > 0 ? (
            <ul>
              {recs.map((id, i) => (
                <li key={i}>{id}</li>
              ))}
            </ul>
          ) : (
            <p>No recommendations found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ShowRecommender;
