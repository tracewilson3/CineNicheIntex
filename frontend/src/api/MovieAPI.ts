// src/api/MovieAPI.ts please work

import { Movie } from "../types/movie";
import { API_URL } from "./config";

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies?: number; // Optional unless your API sends this
}



export const fetchMovies = async (
  pageSize: number = 50,
  pageNumber: number = 1,
  genre?: string
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${API_URL}/AllMovies?pageSize=${pageSize}&pageNumber=${pageNumber}&genre=${genre}`,
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
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};







export const fetchTopRated = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/TopRated`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMostReviewed = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/MostReviewed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// this is to get just one movie for the movie details page
export const fetchMovieDetails = async (movie_id: string): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/MovieDetails/${movie_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
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
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

export const updateMovie = async (showId: string, updatedMovie: Movie): Promise<Movie> => {
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

export const deleteMovie = async (showId: string): Promise<void> => {
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
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
