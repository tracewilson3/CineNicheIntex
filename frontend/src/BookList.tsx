import { useEffect, useState } from "react";
import { Book } from "./types/book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("https://localhost:5000/books");
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  const handleSort = () => {
    const sortedBooks = [...books].sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    setBooks(sortedBooks);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCurrentPage(1); // Reset to first page after sorting
  };

  const indexOfLastBook = currentPage * resultsPerPage;
  const indexOfFirstBook = indexOfLastBook - resultsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / resultsPerPage);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Book List</h1>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <label className="form-label me-2">Results per page:</label>
          <select
            className="form-select d-inline w-auto"
            value={resultsPerPage}
            onChange={(e) => {
              setResultsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        <button className="btn btn-secondary" onClick={handleSort}>
          Sort by Title ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>
      </div>

      <div className="row">
        {currentBooks.map((b) => (
          <div key={b.isbn} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{b.title}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Author: {b.author}</li>
                  <li className="list-group-item">Publisher: {b.publisher}</li>
                  <li className="list-group-item">ISBN: {b.isbn}</li>
                  <li className="list-group-item">
                    Classification: {b.classification}
                  </li>
                  <li className="list-group-item">Category: {b.category}</li>
                  <li className="list-group-item">Page Count: {b.pageCount}</li>
                  <li className="list-group-item">Price: ${b.price}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;
