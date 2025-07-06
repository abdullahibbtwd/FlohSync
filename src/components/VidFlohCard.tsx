"use client"
import React, { useRef, useEffect, useState } from 'react';

interface VidFlohProps {
  videoData: {
    username: string;
    description: string;
    time: string;
    music: string;
    videoUrl: string;
    likes: number;
    comments: number;
    shares: number;
  },
  isActive: boolean;
}

const VidFlohCard: React.FC<VidFlohProps> = ({ videoData, isActive }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(videoData.likes);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!userInteracted) {
      const handleUserInteract = () => setUserInteracted(true);
      window.addEventListener('click', handleUserInteract, { once: true });
      window.addEventListener('touchstart', handleUserInteract, { once: true });
      return () => {
        window.removeEventListener('click', handleUserInteract);
        window.removeEventListener('touchstart', handleUserInteract);
      };
    }
  }, [userInteracted]);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && !isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPaused]);

  // Handle like toggle
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative h-[83vh] md:h-[80vh] w-full flex justify-center items-center bg-black">
      {/* Video Player */}
      <video
        ref={videoRef}
        autoPlay={isActive && !isPaused}
        muted={!userInteracted ? true : false}
        loop
        playsInline
        className="h-full w-full object-cover absolute top-0 left-0"
        onClick={() => setIsPaused((prev) => !prev)}
      >
        <source src={videoData.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Bottom Overlay - User Info */}
      <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center mb-2">
          <div className="bg-gray-200 border-2 border-white rounded-full w-10 h-10 mr-3" />
          <h3 className="font-bold text-lg">@{videoData.username}</h3>
        </div>
        <p className="text-sm mb-1">{videoData.description}</p>
        <div className="flex items-center">
          <p className="text-xs mr-3">{videoData.music}</p>
          <p className="text-xs opacity-80">{videoData.time}</p>
        </div>
      </div>
      
      {/* Right Sidebar - Action Buttons */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 text-white">
        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button 
            onClick={handleLike}
            className="bg-black/30 rounded-full p-2 flex items-center justify-center"
          >
            {isLiked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="28" height="28">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </button>
          <span className="text-xs mt-1">{likeCount}</span>
        </div>
        
        {/* Comment Button */}
        <div className="flex flex-col items-center">
          <button className="bg-black/30 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <span className="text-xs mt-1">{videoData.comments}</span>
        </div>
        
        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button className="bg-black/30 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <span className="text-xs mt-1">{videoData.shares}</span>
        </div>
        
        {/* Music Disc */}
        <div className="flex flex-col items-center mt-4">
          <div className="bg-gray-200 border-2 border-white rounded-full w-12 h-12 flex items-center justify-center">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VidFlohCard;