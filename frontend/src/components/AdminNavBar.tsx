// src/components/AdminNavbar.tsx

import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/AdminPage">CineNiche Admin</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === "/AdminPage" ? "active" : ""}`} 
                to="/AdminPage"
              >
                Manage Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === "/AdminUsers" ? "active" : ""}`} 
                to="/AdminUsers"
              >
                Manage Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
