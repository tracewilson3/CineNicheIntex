import { useState } from 'react'

import '../App.css'
import BookList from '../components/BookList'

import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';


function BooksPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return(
        <>
    <div className="container">
        <CartSummary />
        <WelcomeBand />

      <div className="row">
        <div className="col-md-3"></div>
        <CategoryFilter 
        selectedCategories= {selectedCategories} 
        onCheckboxChange={setSelectedCategories} 
        />
      </div>
      <div className="col-md-9"></div>
      <BookList selectedCategories={selectedCategories}/>
    </div>
      
      

    </>
    )
}
export default BooksPage;