import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css'
import MovieList from '../components/MovieList'

import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';


function MoviesPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigate=useNavigate();
    return(
        <>
    <div className="container">
        {/* <CartSummary /> */}
        <WelcomeBand />
        <button 
                      className="btn btn-primary w-100"
                      onClick={() => navigate(`/AdminPage`)}
                    >
                      Admin Page
                    </button>

      <div className="row">
        <div className="col-md-3"></div>
        <CategoryFilter 
        selectedCategories= {selectedCategories} 
        onCheckboxChange={setSelectedCategories} 
        />
      </div>
      <div className="col-md-9"></div>
      <MovieList selectedCategories={selectedCategories}/>
    </div>
      
      

    </>
    )
}
export default MoviesPage;