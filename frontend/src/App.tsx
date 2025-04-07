
import BooksPage from './pages/BooksPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css'
import CartPage from './pages/CartPage';
import BuyPage from './pages/BuyPage';
import AdminBookPage from './pages/AdminBookPage';

function App() {
  

  return (
    <>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/buy/:title/:bookID/:price" element={<BuyPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/AdminBookPage" element={<AdminBookPage />} />
      </Routes>
    </Router>
    </CartProvider>
    
    
    </>
  )
}

export default App
