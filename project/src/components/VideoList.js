import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/VideoList.css';

const VideoList = ({ refreshVideoList, setLatestVideo }) => {
  const [latestVideo, setLocalLatestVideo] = useState(null);

  const url = window.location.hostname === "localhost" 
    ? "http://localhost:8000/api/upload-video/" 
    : "http://10.1.1.100:8000/api/upload-video/";

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length > 0) {
          const newestVideo = response.data[response.data.length - 1]; // Get latest video
          setLocalLatestVideo(newestVideo); // Update local state
          setLatestVideo(newestVideo); // Update parent state in MainContent.js
          console.log("Latest Video Data:", newestVideo);
        }
      } catch (error) {
        console.error("Failed to fetch latest video:", error.response ? error.response.data : error.message);
      }
    };

    fetchLatestVideo();
  }, [refreshVideoList]); // Fetch latest video when refreshVideoList changes

  // Function to format processed text
  const formatProcessedText = (text) => {
    if (!text) return "Transcription not available.";

    // Step 1: Handle **text** (bold)
    let formattedText = text.split(/\*\*(.*?)\*\*/g).map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );

    // Step 2: Handle * text (bullet points + line break) and *text* (line break only)
    formattedText = formattedText.map((part, index) => {
      if (typeof part === "string") {
        return part.split(/(\* .+?)/g).map((subPart, subIndex) => {
          if (subPart.startsWith("* ")) {
            return (
              <span key={subIndex}>
                <br />• {subPart.substring(2)} {/* Bullet point */}
              </span>
            );
          } else {
            return subPart.split(/\*(.*?)\*/g).map((innerPart, innerIndex) =>
              innerIndex % 2 === 1 ? (
                <br key={innerIndex} />
              ) : (
                innerPart
              )
            );
          }
        });
      }
      return part;
    });

    return formattedText;
  };

  return (
    <div className="video-list mt-4">
      <h2>Latest Uploaded Video</h2>
      {latestVideo ? (
        <div>
          <video controls width="100%">
            <source src={latestVideo.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h2>Processed Output:</h2>
          <p className="output">{formatProcessedText(latestVideo.processed_result) || "Transcription not available."}</p>
        </div>
      ) : (
        <p>No video uploaded yet.</p>
      )}
    </div>
  );
};

export default VideoList;
