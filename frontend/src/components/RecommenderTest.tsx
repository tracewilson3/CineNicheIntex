import { useState } from 'react';
import { fetchUserRecommendations } from '../api/RecommendationAPI';

const Recommendations = () => {
  const [inputId, setInputId] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [recs, setRecs] = useState<string[]>([]);

  const handleFetch = async () => {
    const parsedId = parseInt(inputId);
    if (isNaN(parsedId)) {
      alert("Please enter a valid user ID.");
      return;
    }

    setUserId(parsedId);
    const result = await fetchUserRecommendations(parsedId);
    setRecs(result);
  };

  return (
    <div>
      <h2>User Recommendations</h2>

      <div>
        <input
          type="number"
          placeholder="Enter User ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button onClick={handleFetch}>Get Recommendations</button>
      </div>

      {userId !== null && (
        <>
          <h3>Recommendations for User {userId}</h3>
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

export default Recommendations;
