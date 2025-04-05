import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/LandingPage.css';
import Signup from "./Signup";
import LoginForm from "./LoginForm";
// import Slider from "./Slider";
// import ImageList from "./ImageList";
import TypingText  from "./TypingText";
const LandingPage = ({ setIsAuthenticated }) => {
  const txt = "Welcome To Real Time Meeting Summarization Tool";
  const location = useLocation();
  
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/signup");

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="main">

      <div className="container">
        <div className="left">
        
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={require("../assets/bg_1.mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      
        <div className="txt">
      <TypingText text={txt}/>
      <p>Thanks! Happy Hacking!</p>
      </div>
          
        </div>
        <div className="right">
          {isSignUp ? (
            <Signup setIsSignUp={toggleForm} />
          ) : (
            <LoginForm setIsSignUp={toggleForm} setIsAuthenticated={setIsAuthenticated} />
          )}
        </div>
      </div>

      
      
    </div>
  );
};

export default LandingPage;
