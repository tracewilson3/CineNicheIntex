// App.tsx


import './App.css';
import LoginPage from './pages/login';

import MoviesPage from './pages/MoviesPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css'
import SavedPage from './pages/SavedPage';

import AdminPage from './pages/AdminPage';


function App() {
  return (

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

}

export default App;
