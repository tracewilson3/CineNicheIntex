import { useEffect, useState } from 'react';
import { fetchUserRecommendations } from '../api/RecommendationAPI';
import { fetchUserIdByEmail } from '../api/RecommendationAPI';

const Recommendations = ({ userEmail }: { userEmail: string }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [recs, setRecs] = useState<string[]>([]);

  useEffect(() => {
    async function loadUserData() {
      const id = await fetchUserIdByEmail(userEmail);
      setUserId(id);

      if (id !== null) {
        const recs = await fetchUserRecommendations(id);
        setRecs(recs);
      }
    }

    loadUserData();
  }, [userEmail]);

  return (
    <div>
      {userId !== null ? (
        <>
          <h3>Recommendations for User {userId}</h3>
          <ul>
            {recs.map((id, i) => (
              <li key={i}>{id}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading recommendations...</p>
      )}
    </div>
  );
};
export default Recommendations