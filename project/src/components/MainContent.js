import React, { useState } from 'react';
import VideoForm from './VideoForm';
import '../styles/MainContent.css';
// import TypingText from './TypingText';
import VideoList from './VideoList';

function MainContent() {
  // const text = "Welcome To Real Time Meeting Summarization Tool";
  const [refreshVideoList, setRefreshVideoList] = useState(false);
  const [latestVideo, setLatestVideo] = useState(null);

  const handleVideoUpload = () => {
    setRefreshVideoList((prev) => !prev); // Toggle state to trigger re-fetch
  };

  return (
    <div>
      <div className="container">
        <div className="main-content">
          <div className="main-left">
            {/* <TypingText text={text} /> */}
            <VideoList 
              key={refreshVideoList} 
              refreshVideoList={refreshVideoList} 
              setLatestVideo={setLatestVideo} 
            />
          </div>
          <div className="main-right">
            <VideoForm 
              onVideoUpload={handleVideoUpload} 
              latestUser={latestVideo?.user || "User"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
