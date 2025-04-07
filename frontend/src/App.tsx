<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
=======
// App.tsx


import './App.css';
>>>>>>> 6bc2c5bc85cf8bd900afd7d66fb5e851265f1aaf
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import TempleScene from './pages/templescene';

import MoviesPage from './pages/MoviesPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css'
import SavedPage from './pages/SavedPage';

import AdminPage from './pages/AdminPage';


function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/idol" element={<TempleScene />} />       {/* 🔥 temple scene */}
        <Route path="/signup" element={<SignupPage />} />      {/* 📝 final form */}
      </Routes>
    </div>
  );
=======

    <>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
      </Routes>
    </Router>
    </CartProvider>
    
    
    </>
  )

>>>>>>> 6bc2c5bc85cf8bd900afd7d66fb5e851265f1aaf
}

export default App;
