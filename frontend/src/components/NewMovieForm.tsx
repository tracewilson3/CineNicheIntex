import { useState } from 'react';
import { Movie } from '../types/movie';
import { addMovie } from '../api/MovieAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    show_id: '',
    title: '',
    director: '',
    cast: '',
    country: '',
    release_year: undefined,
    rating: '',
    duration: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'release_year' ? parseInt(value) || undefined : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Add New Movie</h2>
      <div className="form-grid">
        <label>
          Show ID:
          <input type="text" name="show_id" value={formData.show_id} onChange={handleChange} />
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
        <button type="submit" className="btn btn-success mt-2">Add Movie</button>
        <button type="button" className="btn btn-secondary mt-2 ms-2" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default NewMovieForm;
