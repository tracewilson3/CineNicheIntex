import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import TempleScene from './pages/templescene';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/idol" element={<TempleScene />} />       {/* 🔥 temple scene */}
        <Route path="/signup" element={<SignupPage />} />      {/* 📝 final form */}
      </Routes>
    </div>
  );
}

export default App;
