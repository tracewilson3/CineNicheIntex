// src/components/UserList.tsx

import { useEffect, useState } from "react";
import { User } from "../types/user";
import Pagination from "./Pagination";
import './MovieList.css'; // Reuse the same styling

// Stubbed API function (you can implement this if needed)
import { fetchUsers } from "../api/UserAPI";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(pageSize, pageNum);
        setUsers(data.users);
        if (data.totalNumUsers) {
          setTotalPages(Math.ceil(data.totalNumUsers / pageSize));
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <br />

      <div className="container">
        <div className="row">
          {users.map((user) => (
            <div className="col-md-4 col-sm-6 mb-4" key={user.user_id}>
              <div className="card h-100 shadow-sm hover-shadow">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <ul className="list-unstyled">
                    <li><strong>Email:</strong> {user.email}</li>
                    <li><strong>Phone:</strong> {user.phone}</li>
                    <li><strong>Age:</strong> {user.age}</li>
                    <li><strong>Gender:</strong> {user.gender}</li>
                    <li><strong>City:</strong> {user.city}, {user.state} {user.zip}</li>
                  </ul>
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

      <button className="btn btn-dark mt-3" onClick={() => document.body.classList.toggle("bg-dark")}>
        Toggle Dark Mode 🌙
      </button>
    </>
  );
}

export default UserList;
