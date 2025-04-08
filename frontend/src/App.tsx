
import MoviesPage1 from './pages/MoviesPage1';



import { Routes, Route } from 'react-router-dom';
import './App.css';
import MoviesPage from './pages/MoviesPage';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import TempleScene from './pages/templescene';
import AdminMoviePage from './pages/AdminMoviePage';
import AdminUsersPage from './pages/AdminUsersPage';

function App() {
  return (

        

    


    

    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/idol" element={<TempleScene />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/AdminPage" element={<AdminMoviePage />} />
      <Route path="/movies1" element={<MoviesPage1 />} />
      <Route path="/AdminUsers" element={<AdminUsersPage />} />
    </Routes>

  );
}

export default App;
