import { Routes, Route } from "react-router-dom";
import "./App.css";
import MoviesPage from "./pages/MoviesPage";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import TempleScene from "./pages/templescene";
import AdminMoviePage from "./pages/AdminMoviePage";
import AdminUsersPage from "./pages/AdminUsersPage";
import VerifyPage from "./pages/verify"; // ✅ import this
import MoviesPage1 from "./pages/MoviesPage1";
import PrivacyPage from "./pages/PrivacyPage";
import MovieDetails from "./pages/MovieDetails";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/idol" element={<TempleScene />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route
        path="/AdminPage"
        element={
          <ProtectedRoute requiredRoles={["Administrator"]}>
            <AdminMoviePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies1"
        element={
          <ProtectedRoute requiredRoles={["Administrator", "User"]}>
            <MoviesPage1 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AdminUsers"
        element={
          <ProtectedRoute requiredRoles={["Administrator"]}>
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/verify" element={<VerifyPage />} /> {/* ✅ added this line */}
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route
        path="/MovieDetails/:show_id"
        element={
          <ProtectedRoute requiredRoles={["Administrator", "User"]}>
            <MovieDetails />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/search"
        element={
          <ProtectedRoute requiredRoles={["Administrator", "User"]}>
            <SearchResultsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
}

export default App;
