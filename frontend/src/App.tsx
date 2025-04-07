// App.tsx


import './App.css';
import LoginPage from './pages/login';

import MoviesPage from './pages/MoviesPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'





function App() {
  return (

    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        
        
        
      </Routes>
    </Router>
    
    
    
    </>
  )

}

export default App;
