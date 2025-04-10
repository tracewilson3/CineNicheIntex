import { useState } from 'react';
import { Movie } from '../types/movie';
import { updateMovie } from '../api/MovieAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'release_year' ? parseInt(value) || undefined : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMovie(formData.show_id, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Edit Movie</h2>
      <div className="form-grid">
        <label>
          Show ID (read-only):
          <input type="number" name="show_id" value={formData.show_id} readOnly />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Director:
          <input type="text" name="director" value={formData.director || ''} onChange={handleChange} />
        </label>
        <label>
          Cast:
          <input type="text" name="cast" value={formData.cast || ''} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={formData.country || ''} onChange={handleChange} />
        </label>
        <label>
          Release Year:
          <input type="number" name="release_year" value={formData.release_year || ''} onChange={handleChange} />
        </label>
        <label>
          Rating:
          <input type="text" name="rating" value={formData.rating || ''} onChange={handleChange} />
        </label>
        <label>
          Duration:
          <input type="text" name="duration" value={formData.duration || ''} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description || ''} onChange={handleChange} />
        </label>
        <button type="submit" className="btn btn-warning mt-2">Update Movie</button>
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditMovieForm;
