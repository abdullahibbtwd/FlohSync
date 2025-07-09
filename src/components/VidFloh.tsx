"use client"
import React, { useRef, useEffect, useState } from 'react'
import { videos } from '../../Data'
import VidFlohCard from './VidFlohCard'
import Link from 'next/link'
import { Plus, User, Search,TvMinimalPlay } from 'lucide-react'

const VidFloh = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  }, [videos.length]);

  // Header rendered only once, fixed at the top
  const CardHeader = () => (
    <div className="absolute top-14 left-0 w-full z-20 flex items-center justify-between rounded-md px-4 py-2 backdrop-blur-sm pointer-events-none">
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
        {videos.map((video, idx) => (
          <div
            key={video.id}
            className="w-full min-h-[83vh] snap-center relative flex"
            ref={el => { cardRefs.current[idx] = el; }}
            data-idx={idx}
          >
            <VidFlohCard videoData={video} isActive={activeIndex === idx} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default VidFloh
