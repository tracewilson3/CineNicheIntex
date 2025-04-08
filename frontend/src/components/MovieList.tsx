// src/components/MovieList.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../api/MovieAPI";
import { Movie } from "../types/movie";
import Pagination from "./Pagination";
import "./MovieList.css";

function MovieList({ selectedCategories }: { selectedCategories: string[] }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(pageSize, pageNum, selectedCategories);
        setMovies(data.movies);
        // If your API supports totalNumMovies, use that. Otherwise, this is optional.
        if (data.totalNumMovies) {
          setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <br />

      <div className="container">
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4 col-sm-6 mb-4" key={movie.show_id}>
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Director:</strong> {movie.director || "N/A"}
                    </li>
                    <li>
                      <strong>Cast:</strong> {movie.cast || "N/A"}
                    </li>
                    <li>
                      <strong>Country:</strong> {movie.country || "N/A"}
                    </li>
                    <li>
                      <strong>Release Year:</strong> {movie.release_year || "N/A"}
                    </li>
                    <li>
                      <strong>Rating:</strong> {movie.rating || "N/A"}
                    </li>
                    <li>
                      <strong>Duration:</strong> {movie.duration || "N/A"}
                    </li>
                  </ul>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/MovieDetails/${movie.show_id}`)}
                  >
                    View Details 🎬
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPageNum(1);
            }}
          />
        </div>
      </div>

      <button
        className="btn btn-dark mt-3"
        onClick={() => document.body.classList.toggle("bg-dark")}
      >
        Toggle Dark Mode 🌙
      </button>
    </>
  );
}

export default MovieList;
