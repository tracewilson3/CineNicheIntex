// src/api/UserAPI.ts

import { User } from "../types/user";

interface FetchUsersResponse {
  users: User[];
  totalNumUsers?: number; // Optional, in case your backend provides pagination metadata
}

const API_URL = `https://cineniche415backend.azurewebsites.net/Movies/AllMovies`;
// const API_URL = `https://localhost:5000/Movies`;

export const fetchUsers = async (
  pageSize: number,
  pageNum: number
): Promise<FetchUsersResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllUsers?userCount=${pageSize}&pageNum=${pageNum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();
    return { users }; // Adjust if your backend includes metadata like totalNumUsers
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
