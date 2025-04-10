import axios from 'axios';
import { REC_URL } from './config';
import { API_URL } from './config';
import { API_URL } from './config';

export async function fetchUserRecommendations(user_id: number): Promise<string[]> {
  try {
    const response = await axios.get(`${REC_URL}/recommendation/user/${user_id}`);
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn("Response is not an array:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export async function fetchUserIdByEmail(email: string): Promise<number | null> {
    try {
      const response = await axios.get(`${API_URL}/id-by-email`, {
        params: { email },
      });
      return response.data.userId ?? null;
    } catch (err) {
      console.error("Failed to get user ID for email:", err);
      return null;
    }
  }

  export async function fetchShowRecommendations(showId: string): Promise<string[]> {
    try {
      const response = await axios.get(`${REC_URL}/recommendation/show/${showId}`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.warn("Expected an array, got:", response.data);
        return [];
      }
    } catch (err) {
      console.error("Failed to fetch show recommendations:", err);
      return [];
    }
  }