import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import TempleScene from './pages/templescene';


function App() {
  return (
    
      <Router>
        <Routes>
          {/* Public & marketing routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/idol" element={<TempleScene />} />
          <Route path="/signup" element={<SignupPage />} />

      
        </Routes>
      </Router>
    
  );
}

export default App;
