import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesPage1 from './pages/MoviesPage1';
import './App.css'
import SavedPage from './pages/SavedPage';


import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import TempleScene from './pages/templescene';


function App() {
  return (

    

      <Routes>
        {/* Public & marketing routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/idol" element={<TempleScene />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/movies" element={<MoviesPage1 />} />

    
      </Routes>

    
  );
}

export default App;
