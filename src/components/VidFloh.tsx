"use client"
import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios';
import { users } from '../../Data'
import VidFlohCard from './VidFlohCard'
import Link from 'next/link'
import { Plus, User, Search, TvMinimalPlay } from 'lucide-react'
import Image from 'next/image'
import { useAppContext } from '@/context/useAppContext'

const VidFloh = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userVideos, setUserVideos] = useState<any[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { userData, backendUrl, router } = useAppContext();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/post/get-vidposts', { withCredentials: true });
        if (response.data.success) {
       
          const extractedVideos = response.data.posts.map((post: any) => ({
            id: post.id, // <-- ALWAYS use the Post id for like/comment
            videoId: post.video?.id, // (optional, if you need the video id for something else)
            username: post.user?.username,
            userId: post.user?.id,
            description: post.content,
            time: post.createdAt,
            music: post.video?.music || "Original Sound",
            videoUrl: post.video?.videoUrl,
            likes: post.likes || 0,
            comments: post.comments?.length || 0,
            shares: post.video?.shares || 0,
            profileImage: post.user?.profilePicture,
            commentList: (post.comments || []).map((c: any) => ({
              id: c.id,
              user: {
                name: c.user?.name,
                profilePicture: c.user?.profilePicture,
              },
              text: c.content,
              createdAt: c.createdAt,
            })),
            user: {
              name: post.user?.name,
              profilePicture: post.user?.profilePicture,
              username: post.user?.username,
            },
            liked: post.liked,
            bookmarked: post.bookmarked,
            tags: post.tags,
          })).sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
          setUserVideos(extractedVideos);
        }
      } catch (error) {
        setUserVideos([]);
      }
    };
    fetchVideos();
  }, [backendUrl]);

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
        <Link href="/profile" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
        <div
                    className="w-10 h-10 flex transition-all duration-300 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                    }}
                  >
                    <button
                      onClick={() => router.push("/profile")}
                      className="flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 w-full h-full"
                    >
                      <Image
                        src={userData?.profilePicture || "/user.jpg"}
                        alt="profile"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </button>
                  </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col h-full w-full"> 
      <CardHeader />
      <div className="flex-1 w-full h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory" style={{ scrollBehavior: 'smooth' }}>
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
