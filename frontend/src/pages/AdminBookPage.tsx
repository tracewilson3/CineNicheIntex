import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBookPage = () => {

    const [books, setBooks]= useState<Book[]>([]);
    const [error, setError] = useState<string| null>(null);

    const [loading, setLoading] = useState(true);

    const [pageSize, setPageSize]=useState<number>(10);
    const [pageNum, setPageNum]=useState<number>(1);

    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm]= useState(false);
    const [editingBook, setEditingBook]=useState<Book | null>(null);

    useEffect(() =>
    {
        const loadBooks = async () =>  {
            try {
                const data = await fetchBooks(pageSize,pageNum,[]);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize))
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize,pageNum]); // watch for changes in these two variables 

    const handleDelete = async (bookID: number) => {
        const confirmDelete=window.confirm('Are you sure you want to delete this book?');
        if (!confirmDelete) return;

        try {
            await deleteBook(bookID);
            setBooks(books.filter((b)=>b.bookID !== bookID));

        }
        catch (error) {
            alert('Failed to delete book')
        }
    };
    if (loading) return <p>Loading Books...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (
        <div>
            <h1>Admin - Books</h1>

            {!showForm && (
                <button className="btn btn-success mb-3"
                        onClick={()=>setShowForm(true)}
                >
                    Add Book
                </button>
            )}
            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, []).then((data) =>
                            setBooks(data.books)
                        );
                    }}
                    onCancel={()=>setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm book={editingBook} onSuccess={()=> {
                    setEditingBook(null);
                    fetchBooks(pageSize,pageNum,[]).then((data)=> setBooks(data.books));
                }}
                                 onCancel={()=> setEditingBook(null)}
                />
            )}

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Classification</th>
                    <th>Category</th>
                    <th>Page Count</th>
                    <th>Price</th>

                </tr>
                </thead>
                <tbody>
                {
                    books.map((b) => (
                        <tr key={b.bookID}>
                            <td>{b.bookID}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>{b.price}</td>
                            <td>
                                <button onClick={() => setEditingBook(b)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(b.bookID)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
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
                }} />
        </div>
    )
};
export default AdminBookPage;