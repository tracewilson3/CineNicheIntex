import { useState } from 'react';
import { Movie } from '../types/movie';
import { addMovie } from '../api/MovieAPI';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Omit<Movie, 'show_id'>>({
    title: '',
    type: '',
    director: '',
    cast: '',
    country: '',
    release_year: 0,
    rating: '',
    duration: '',
    description: '',
    action: 0,
    adventure: 0,
    anime_Series_International_TV_Shows: 0,
    british_TV_Shows_Docuseries_International_TV_Shows:0,
    children: 0,
    comedies: 0,
    comedies_Dramas_International_Movies: 0,
    comedies_International_Movies: 0,
    comedies_Romantic_Movies: 0,
    crime_TV_Shows_Docuseries: 0,
    documentaries: 0,
    documentaries_International_Movies: 0,
    docuseries: 0,
    dramas: 0,
    dramas_International_Movies: 0,
    dramas_Romantic_Movies: 0,
    family_Movies: 0,
    fantasy: 0,
    horror_Movies: 0,
    international_Movies_Thrillers: 0,
    international_TV_Shows_Romantic_TV_Shows_TV_Dramas: 0,
    kids_TV: 0,
    language_TV_Shows: 0,
    musicals: 0,
    nature_TV: 0,
    reality_TV: 0,
    spirituality: 0,
    tV_Action: 0,
    tV_Comedies: 0,
    tV_Dramas: 0,
    talk_Shows_TV_Comedies: 0,
    thrillers: 0
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
