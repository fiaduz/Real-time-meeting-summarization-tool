import React, { useState } from "react";
import "../styles/VideoForm.css"; // Import the CSS file
import axios from "axios";

const VideoForm = ({ onVideoUpload, latestUser }) => {
  const [file, setFile] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const url = window.location.hostname === "localhost" 
    ? "http://localhost:8000/api/upload-video/" 
    : "http://10.1.1.100:8000/api/upload-video/";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("text", textInput);

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Video uploaded:", response.data);
      setIsSuccess(true);
      setResponseMessage("Video uploaded successfully!");
      setFile(null);
      setTextInput("");

      onVideoUpload(); // Refresh the video list
    } catch (error) {
      console.error(
        "Upload failed:",
        error.response ? error.response.data : error.message
      );
      setIsSuccess(false);
      setResponseMessage("Upload failed. Please try again.");
    }
  };

  return (
    <div className="video-container1 mt-4">
      <div className="user-logout">
      <p className="user">{latestUser || "User"} 👤</p>
      <button className="btn btn-danger" type="button" onClick={handleLogout}>Logout</button>
      </div>
     

      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label htmlFor="videoInput" className="form-label">
            Upload Video
          </label>
          <input
            type="file"
            name="video"
            className="form-control"
            id="videoInput"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">
            Enter Text
          </label>
          <input
            type="text"
            className="form-control"
            id="textInput"
            placeholder="Enter some text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {responseMessage && (
        <div className={`mt-3 alert ${isSuccess ? "alert-success" : "alert-danger"}`}>
          <h4>{isSuccess ? "Success!" : "Error"}</h4>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default VideoForm;
