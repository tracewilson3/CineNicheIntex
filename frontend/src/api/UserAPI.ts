// src/api/UserAPI.ts

import { User } from "../types/user";
import { API_URL } from "./config";
interface FetchUsersResponse {
  users: User[];
  totalNumUsers?: number; // Optional, in case your backend provides pagination metadata
}

type NewUser = Omit<User, "user_id">;

export const addUser = async (NewUser: NewUser): Promise<User> => {
  const response = await fetch(`${API_URL}/AddUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(NewUser),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return await response.json();
};

export const fetchUsers = async (
  pageSize: number,
  pageNum: number
): Promise<FetchUsersResponse> => {
  try {
    const response = await fetch(`${API_URL}/AllUsers?pageSize=${pageSize}&pageNum=${pageNum}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return { users: data.users, totalNumUsers: data.totalNumUsers }; // Adjust if your backend includes metadata like totalNumUsers
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (user_id: number, updatedUser: User): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/UpdateUser/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteUser = async (user_id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteUser/${user_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
