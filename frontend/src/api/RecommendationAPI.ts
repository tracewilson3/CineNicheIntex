import axios from 'axios';
import { REC_URL } from './config';

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
