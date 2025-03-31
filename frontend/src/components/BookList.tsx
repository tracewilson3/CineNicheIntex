import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { useNavigate } from "react-router-dom";
import {fetchBooks} from "../api/BooksAPI.ts";
import './BookList.css'
import Pagination from "./Pagination.tsx";


function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks]= useState<Book[]>([]);

    const [pageSize, setPageSize]=useState<number>(10);
    const [pageNum, setPageNum]=useState<number>(1);
    
    const [totalPages, setTotalPages] = useState<number>(0);

    const navigate=useNavigate();
    const [error, setError] = useState<string| null>(null);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadBooks= async () => {

            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);

                setBooks(data.books);

                setTotalPages(Math.ceil(data.totalNumBooks / pageSize))
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false);
            }
        };

        loadBooks();

    }, [pageSize, pageNum, selectedCategories]); // if there's no data, returns an empty array so there's no error

    if (loading) return <p>Loading books...</p>
    if (error) return <p className="text-red-500"> Error: {error}</p>

    
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


            

<button className="btn btn-dark" onClick={() => document.body.classList.toggle("bg-dark")}>
  Toggle Dark Mode 🌙
</button>

        </>
    );
}

export default BookList;