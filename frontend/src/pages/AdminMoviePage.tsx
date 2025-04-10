import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { fetchMovies, deleteMovie } from "../api/MovieAPI";
import Pagination from "../components/Pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";
import AdminNavbar from "../components/AdminNavBar";

const AdminMoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

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

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container">
      <AdminNavbar />
      <h1 className="mb-3">Admin - Movies</h1>

      {!showForm && (
        <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
          Add Movie
        </button>
      )}
      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum).then((data) => setMovies(data.movies));
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum).then((data) => setMovies(data.movies));
          }}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
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
              <td>{m.show_id}</td>
              <td>{m.title}</td>
              <td>{m.director}</td>
              <td>{m.release_year}</td>
              <td>{m.rating}</td>
              <td>{m.duration}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingMovie(m)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.show_id)}>
                  Delete
                </button>
              </td>
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
  );
};

export default AdminMoviePage;
