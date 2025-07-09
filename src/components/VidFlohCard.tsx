"use client"
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { scroller, Element } from 'react-scroll';

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
    profileImage?: string;
  },
  isActive: boolean;
}

const VidFlohCard: React.FC<VidFlohProps> = ({ videoData, isActive }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(videoData.likes);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});
  const [comments, setComments] = useState([
    {
      id: '1',
      user: { name: 'user1', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
      text: 'Great video!',
      replies: [
        { id: '1-1', user: { name: 'me', image: 'https://randomuser.me/api/portraits/men/33.jpg' }, text: 'Thanks!' }
      ]
    },
    {
      id: '2',
      user: { name: 'user2', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
      text: 'Love the music!',
      replies: []
    }
  ]);
  const [commentInput, setCommentInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const modalRef = useRef<HTMLDivElement | null>(null);
  const commentsScrollRef = useRef<HTMLDivElement | null>(null);

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
        videoRef.current.muted = false; // unmute when active
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.muted = true; // mute when not active
        videoRef.current.currentTime = 0; // optional: reset to start
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

  // Close modal on outside click
  useEffect(() => {
    if (!showComments) return;
    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowComments(false);
        setReplyTo(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showComments]);

  // Scroll to last comment on open or when comments change
  useEffect(() => {
    if (showComments && commentsScrollRef.current) {
      commentsScrollRef.current.scrollTop = commentsScrollRef.current.scrollHeight;
    }
  }, [showComments, comments]);

  useEffect(() => {
    if (showComments) {
      scroller.scrollTo('comments-bottom', {
        containerId: 'comments-scroll-container',
        duration: 300,
        smooth: true,
      });
    }
  }, [showComments, comments]);

  return (
    <div className="relative min-h-[83vh] w-full flex justify-center items-center bg-black overflow-hidden">
      {/* Video Player */}
      <video
        ref={videoRef}
        muted={!isActive} // fallback for SSR/initial render
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
          <Image
            src={videoData.profileImage || 'https://picsum.photos/seed/profile/100/100'}
            alt={videoData.username}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border-2 border-white mr-3"
          />
          <div>
            <h3 className="font-bold text-lg">@{videoData.username}</h3>
            <p className="text-xs text-gray-200">{videoData.music}</p>
          </div>
        </div>
        <p className="text-sm mb-1">{videoData.description}</p>
        <div className="flex items-center">
          <p className="text-xs opacity-80">{videoData.time}</p>
        </div>
      </div>
      
      {/* Right Sidebar - Action Buttons */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-4 text-white">
        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button 
            onClick={handleLike}
            className="bg-black/30 rounded-full p-2 flex items-center justify-center cursor-pointer"
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
          <button
            className="bg-black/30 rounded-full p-2 cursor-pointer"
            onClick={() => setShowComments((prev) => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <span className="text-xs mt-1">{videoData.comments}</span>
        </div>
        
        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button className="bg-black/30 rounded-full p-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <span className="text-xs mt-1">{videoData.shares}</span>
        </div>
        

      </div>

      {showComments && (
        <div className="fixed inset-0 z-30 flex pb-20 items-end justify-center bg-black/40">
          <div
            ref={modalRef}
            className="w-full max-w-md bg-neutral-900 rounded-t-lg p-4 max-h-[50vh] flex flex-col relative"
            style={{ boxShadow: '0 -2px 16px rgba(0,0,0,0.4)', background: 'var(--secondary-bg)' }}
          >
            <h4 className="text-white text-center mb-2 font-semibold">Comments</h4>
            <div className="relative flex-1 min-h-0">
              <div
                id="comments-scroll-container"
                ref={commentsScrollRef}
                className="space-y-3 overflow-y-auto h-full pr-2"
                style={{ maxHeight: 'calc(50vh - 80px)' }}
              >
                {comments.map((comment) => (
                  <div key={comment.id} className=" mb-5 rounded-lg p-2"
                  
                  style={{ background: 'var(--primary-bg)'}}
                  >
                    <div className="flex items-center mb-1">
                      <Image
                        src={comment.user.image}
                        alt={comment.user.name}
                        width={24}
                        height={24}
                        className="rounded-full mr-2 w-6 h-6"
                      />
                      <span className="font-semibold text-xs mr-2">{comment.user.name}</span>
                      <button
                        className="text-xs text-blue-400 ml-auto"
                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      >
                        Reply
                      </button>
                      {comment.replies.length > 0 && (
                        <button
                          className="text-xs text-gray-400 ml-2"
                          onClick={() => setShowReplies((prev) => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                        >
                          {showReplies[comment.id] ? 'Hide Replies' : `View Replies (${comment.replies.length})`}
                        </button>
                      )}
                    </div>
                    <p className="text-xs ml-8  mb-1">{comment.text}</p>
                    {/* Reply input */}
                    {replyTo === comment.id && (
                      <div className="ml-8 mb-2 flex items-center">
                        <input
                          type="text"
                          value={replyInput}
                          onChange={e => setReplyInput(e.target.value)}
                          placeholder={`Reply to ${comment.user.name}`}
                          className="flex-1 p-1 rounded bg-gray-800 text-xs mr-2"
                        />
                        <button
                          className="text-xs text-blue-400"
                          onClick={() => {
                            if (replyInput.trim()) {
                              setComments(prev => prev.map(c =>
                                c.id === comment.id
                                  ? { ...c, replies: [...c.replies, { id: `${c.id}-${c.replies.length+1}`, user: { name: 'me', image: 'https://randomuser.me/api/portraits/men/33.jpg' }, text: replyInput }] }
                                  : c
                              ));
                              setReplyInput('');
                              setReplyTo(null);
                              setShowReplies(prev => ({ ...prev, [comment.id]: true }));
                            }
                          }}
                        >
                          Send
                        </button>
                        <button
                          className="text-xs text-gray-400 ml-2"
                          onClick={() => { setReplyTo(null); setReplyInput(''); }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {/* Replies */}
                    {showReplies[comment.id] && comment.replies.length > 0 && (
                      <div className="ml-10 space-y-2">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex items-center mb-1 bg-neutral-700 rounded px-2 py-1">
                            <Image
                              src={reply.user.image}
                              alt={reply.user.name}
                              width={20}
                              height={20}
                              className="rounded-full mr-2 w-5 h-5"
                            />
                            <span className="font-semibold text-xs mr-2">{reply.user.name}</span>
                            <p className="text-xs ">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Element name="comments-bottom" />
              </div>
              {/* Scroll to bottom button */}
              {comments.length > 3 && (
                <button
                  className="absolute right-2 bottom-16 bg-gray-700 text-white text-xs px-2 py-1 rounded shadow"
                  onClick={() => {
                    if (commentsScrollRef.current) {
                      commentsScrollRef.current.scrollTop = commentsScrollRef.current.scrollHeight;
                    }
                  }}
                >
                  ↓ Newest
                </button>
              )}
            </div>
            {/* Add new comment */}
            <div className="flex items-center z-50 mt-3 shrink-0">
              <input
              style={
                {
                  background:"var(--primary-bg)"
                }
              }
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 rounded text-xs"
              />
              <button
                className="text-xs cursor-pointer p-2 bg-green-600 rounded-md ml-2"
                onClick={() => {
                  if (commentInput.trim()) {
                    setComments(prev => [
                      ...prev,
                      { id: `${prev.length+1}`, user: { name: 'me', image: 'https://randomuser.me/api/portraits/men/33.jpg' }, text: commentInput, replies: [] }
                    ]);
                    setCommentInput('');
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VidFlohCard;