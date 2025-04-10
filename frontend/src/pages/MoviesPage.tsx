// src/pages/MoviesPage.tsx


import { useNavigate } from "react-router-dom";
import '../App.css';
import MovieList from '../components/MovieList';


import WelcomeBand from '../components/WelcomeBand';

function MoviesPage() {
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  return (
    <div className="container">
      <WelcomeBand />

      <div className="mb-3">
        <button
          className="btn btn-primary w-100"
          onClick={() => navigate(`/AdminPage`)}
        >
          Admin Page
        </button>
        <button
          className="btn btn-primary w-100"
          onClick={() => navigate(`/movies1`)}
        >
          Real Movies Page
        </button>
      </div>

      <div className="row">
        <div className="col-md-3">
          {/* <CategoryFilter
            selectedCategories={selectedCategories}
            onCheckboxChange={setSelectedCategories}
          /> */}
        </div>

        <div className="col-md-9">
          <MovieList  />
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;
