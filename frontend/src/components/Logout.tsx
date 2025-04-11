import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // ✅ Or selectively: removeItem("loggedIn"), etc.
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-light btn-lg px-5 fw-normal text-dark"
      style={{ fontFamily: "Bebas Neue, sans-serif", color: "black" }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
