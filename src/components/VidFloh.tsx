"use client"
import React, { useRef, useEffect, useState } from 'react'
import { users } from '../../Data'
import VidFlohCard from './VidFlohCard'
import Link from 'next/link'
import { Plus, User, Search, TvMinimalPlay } from 'lucide-react'

const VidFloh = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userVideos, setUserVideos] = useState<any[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Extract video posts from users and transform them to match VidFlohCard format
  useEffect(() => {
    const extractedVideos = users.users.flatMap(user => 
      user.posts
        .filter(post => post.video) // Only posts with videos
        .map(post => ({
          id: post.video?.id || post.post_id,
          username: user.username,
          userId: user.user_id,
          description: post.content,
          time: post.video?.time || "1 day ago",
          music: post.video?.music || "Original Sound",
          videoUrl: post.video?.videoUrl || "/test.mp4",
          likes: post.video?.likes || Math.floor(Math.random() * 1000) + 100,
          comments: post.video?.comments || Math.floor(Math.random() * 100) + 10,
          shares: post.video?.shares || Math.floor(Math.random() * 50) + 5,
          profileImage: user.profile_picture,
          commentList: [
            {
              id: `comment_${post.post_id}_1`,
              user: {
                name: "Alice Smith",
                profileImage: "https://picsum.photos/id/237/200/300",
              },
              text: "Amazing content! 🔥",
              createdAt: "2024-06-10T10:15:00Z",
            },
            {
              id: `comment_${post.post_id}_2`,
              user: {
                name: "Bob Johnson",
                profileImage: "https://picsum.photos/id/238/200/300",
              },
              text: "Love this! Keep it up!",
              createdAt: "2024-06-10T11:00:00Z",
            },
          ],
          user: {
            name: user.name,
            profileImage: user.profile_picture,
            username: user.username
          }
        }))
    ).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

    setUserVideos(extractedVideos);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [userVideos.length]);

  // Header rendered only once, fixed at the top
  const CardHeader = () => (
    <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between rounded-md px-4 py-2 backdrop-blur-sm pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <Link href="/vidfloh/add-video" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
          <Plus className="w-6 h-6 " />
        </Link>
      </div>
      <span className="font-bold text-lg pointer-events-auto">VidFloh</span>
      <div className="flex items-center gap-2 pointer-events-auto">
        <Link href="/search" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
          <Search className="w-6 h-6 " />
        </Link>
        <Link href="/live" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
          <TvMinimalPlay className="w-6 h-6 " />
        </Link>
        <Link href="/my-videos" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
          <User className="w-6 h-6 " />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col h-full w-full"> 
      <CardHeader />
      <div className="flex-1 w-full h-full overflow-y-auto snap-y snap-mandatory" style={{ scrollBehavior: 'smooth' }}>
        {userVideos.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">No videos available</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Users haven't posted any videos yet</p>
            </div>
          </div>
        ) : (
          userVideos.map((video, idx) => (
            <div
              key={video.id}
              className="w-full min-h-[83vh] snap-center relative flex"
              ref={el => { cardRefs.current[idx] = el; }}
              data-idx={idx}
            >
              <VidFlohCard videoData={video} isActive={activeIndex === idx} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default VidFloh
