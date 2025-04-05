import './App.css';
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent";
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BackgroundVideo from './components/BackgroundVideo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // Ensures state updates when token changes
  }, [localStorage.getItem("access_token")]); // Depend on localStorage

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      

      <Router>
     
        <NavBar/>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/home" 
            element={isAuthenticated ? <MainContent setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" replace />}
          />
          <Route 
            path="/login" 
            element={<LandingPage setIsAuthenticated={setIsAuthenticated} />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
