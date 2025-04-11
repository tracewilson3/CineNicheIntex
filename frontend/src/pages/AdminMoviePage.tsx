// src/pages/AdminMoviePage.tsx
import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { fetchMovies, deleteMovie } from "../api/MovieAPI";
import Pagination from "../components/Pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";
import AdminNavbar from "../components/AdminNavBar";
import "./AdminMoviePage.css";
const AdminMoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum);
        setMovies(data.movies);
        if (data.totalNumMovies) {
          setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [pageSize, pageNum]);
  const handleDelete = async (show_id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;
    try {
      await deleteMovie(show_id);
      setMovies(movies.filter((m) => m.show_id !== show_id));
    } catch (error) {
      alert("Failed to delete movie");
    }
  };
  const handleEditSuccess = async () => {
    setEditingMovieId(null);
    const data = await fetchMovies(pageSize, pageNum);
    setMovies(data.movies);
  };
  if (loading) return <p className="admin-loading">Loading Movies...</p>;
  if (error) return <p className="admin-error">Error: {error}</p>;
  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content">
        <h1>Manage Movies</h1>
        {!showForm && (
          <button className="admin-add-btn" onClick={() => setShowForm(true)}>
            Add Movie
          </button>
        )}
        {showForm && (
          <NewMovieForm
            onSuccess={async () => {
              setShowForm(false);
              const data = await fetchMovies(pageSize, pageNum);
              setMovies(data.movies);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Director</th>
              <th>Release Year</th>
              <th>Rating</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.show_id}>
                {editingMovieId === m.show_id ? (
                  <td colSpan={7}>
                    <EditMovieForm
                      movie={m}
                      onSuccess={handleEditSuccess}
                      onCancel={() => setEditingMovieId(null)}
                    />
                  </td>
                ) : (
                  <>
                    <td>{m.show_id}</td>
                    <td>{m.title}</td>
                    <td>{m.director}</td>
                    <td>{m.release_year}</td>
                    <td>{m.rating}</td>
                    <td>{m.duration}</td>
                    <td>
                      <button
                        className="admin-btn edit"
                        onClick={() => setEditingMovieId(m.show_id)}
                      >
                        Edit
                      </button>
                      <button className="admin-btn delete" onClick={() => handleDelete(m.show_id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
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
  );
};
export default AdminMoviePage;
