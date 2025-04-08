// src/api/UserAPI.ts

import { User } from "../types/user";
import { API_URL } from "./config";
interface FetchUsersResponse {
  users: User[];
  totalNumUsers?: number; // Optional, in case your backend provides pagination metadata
}



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
