import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { useNavigate } from "react-router-dom";
import './BookList.css'


function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks]= useState<Book[]>([]);

    const [pageSize, setPageSize]=useState<number>(10);
    const [pageNum, setPageNum]=useState<number>(1);
    const [totalItems, setTotalItems]=useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    const navigate=useNavigate();   
    useEffect(() => {
      const fetchBooks = async () => {
        const categoryParams = selectedCategories
            .map((cat) => `categories=${encodeURIComponent(cat)}`)
            .join('&');
    
        const url = `https://localhost:5000/Books/AllBooks?bookCount=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`;
        
        console.log("Fetching from URL:", url);
    
        try {
            const response = await fetch(url, {
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            console.log("Fetched data:", data); // 🔍 Debugging API response
    
            if (!data || !Array.isArray(data.books)) {
                throw new Error("Invalid API response: 'books' is not an array");
            }
    
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.max(1, Math.ceil((data.totalNumBooks || 0) / pageSize)));


        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };
    
  
      fetchBooks();
  }, [pageSize, pageNum, totalItems,selectedCategories]); // if there's no data, returns an empty array so there's no error


    
    return (
        <>
        
        <br />
        
          <div className="container">
          <div className="row">
            {books.map((b) => (
              <div className="col-md-4 col-sm-6 mb-4" key={b.bookID}>
                <div className="card h-100 shadow-sm hover-shadow">
                  <div className="card-body">
                    <h5 className="card-title">{b.title}</h5>
                    <ul className="list-unstyled">
          <li><strong>Author: </strong>{b.author}</li>
          <li><strong>Category: </strong>{b.category}</li>
          <li><strong>Publisher: </strong>{b.publisher}</li>
          <li><strong>ISBN: </strong> {b.isbn}</li>
          <li><strong>Classification: </strong>{b.classification}</li>
          <li>{b.pageCount} Pages</li>
          <li><strong>Price: </strong> ${b.price}</li>
        </ul>
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => navigate(`/buy/${b.title}/${b.bookID}`)}
                    >
                      Buy Now 📖
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>




<nav aria-label="Page navigation">
  <ul className="pagination justify-content-center">
    <li className={`page-item ${pageNum === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>Previous</button>
    </li>
    {[...Array(totalPages)].map((_, i) => (
      <li className={`page-item ${pageNum === i + 1 ? "active" : ""}`} key={i}>
        <button className="page-link" onClick={() => setPageNum(i + 1)}>{i + 1}</button>
      </li>
    ))}
    <li className={`page-item ${pageNum >= totalPages ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>Next</button>
    </li>
  </ul>
</nav>


<br />
<br />

<label>
    Results per page:
    <select 
        value={pageSize} 
        onChange={(p) => {
            const newSize = Number(p.target.value);
            setPageSize(newSize);
            setPageNum(1); // Reset to first page
        }}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
    </select>
</label>

<button className="btn btn-dark" onClick={() => document.body.classList.toggle("bg-dark")}>
  Toggle Dark Mode 🌙
</button>

        </>
    );
}

export default BookList;