import React from "react";
import "../styles/BackgroundVideo.css"; // Import the CSS

const BackgroundVideo = () => {
  return (
    <div className="video-container">
        
      <video autoPlay loop muted playsInline className="video-bg">
        <source src="../assets/bg_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
