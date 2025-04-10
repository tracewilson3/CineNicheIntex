import { useEffect, useState } from "react";
import { User } from "../types/user";
import { deleteUser, fetchUsers } from "../api/UserAPI";
import Pagination from "../components/Pagination";
import AdminNavbar from "../components/AdminNavBar";
import NewUserForm from "../components/NewUserForm";
import EditUserForm from "../components/EditUserForm";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(pageSize, pageNum);
        setUsers(data.users);
        if (data.totalNumUsers) {
          setTotalPages(Math.ceil(data.totalNumUsers / pageSize));
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [pageSize, pageNum]);

  const handleDelete = async (user_id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(user_id);
      setUsers(users.filter((u) => u.user_id !== user_id));
      alert("User deleted");
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container">
      <AdminNavbar />
      <h1 className="mb-3">Admin - Users</h1>

      {!showForm && (
        <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
          Add User
        </button>
      )}

      {showForm && (
        <NewUserForm
          onSuccess={() => {
            setShowForm(false);
            fetchUsers(pageSize, pageNum).then((data) => setUsers(data.users));
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingUser && (
        <EditUserForm
          user={editingUser}
          onSuccess={() => {
            setEditingUser(null);
            fetchUsers(pageSize, pageNum).then((data) => setUsers(data.users));
          }}
          onCancel={() => setEditingUser(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
            <th>State</th>
            <th>Streaming Subs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.age}</td>
              <td>{u.gender}</td>
              <td>{u.city}</td>
              <td>{u.state}</td>
              <td>
                {["Netflix", "Amazon_Prime", "DisneyPlus", "Hulu", "Max", "Peacock"]
                  .filter((service) => u[service as keyof User])
                  .join(", ")}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingUser(u)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.user_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
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
        }}
      />
    </div>
  );
};

export default AdminUsersPage;
