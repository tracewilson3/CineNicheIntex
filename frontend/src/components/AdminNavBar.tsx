// src/components/AdminNavbar.tsx

import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/AdminPage">
          CineNiche Admin
        </Link>

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
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/Movies1" ? "active" : ""}`}
                to="/Movies1"
              >
                Browse Movies
              </Link>
            </li>
          </ul>
        </div>
        {
          <p
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              color: "white",
              paddingRight: "15px",
              paddingTop: "18px",
            }}
          >
            {localStorage.getItem("email")}
          </p>
        }
        <Logout />
      </div>
    </nav>
  );
};

export default AdminNavbar;
