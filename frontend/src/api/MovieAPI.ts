// src/api/MovieAPI.ts please work

import { Movie } from "../types/movie";
import { API_URL } from "./config";
interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies?: number; // Optional unless your API sends this
}



export const fetchMovies = async (
  pageSize: number,
  pageNum: number
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllMovies?movieCount=${pageSize}&pageNum=${pageNum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const movies = await response.json();
    return { movies };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
type NewMovie = Omit<Movie, "show_id">;

export const addMovie = async (newMovie: NewMovie): Promise<Movie> => {
  const response = await fetch(`${API_URL}/AddMovie`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  });

  if (!response.ok) {
    throw new Error("Failed to add movie");
  }

  return await response.json();
};

export const updateMovie = async (
  showId: number,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
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

export const deleteMovie = async (show_id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${show_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};


