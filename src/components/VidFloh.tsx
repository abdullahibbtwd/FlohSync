"use client"
import React, { useRef, useEffect, useState } from 'react'
import { videos } from '../../Data'
import VidFlohCard from './VidFlohCard'
import Link from 'next/link'
import { Plus, User, Search } from 'lucide-react'

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
    <div className="sticky top-0 left-0 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 flex items-center justify-between px-4 py-2 bg-black/30 backdrop-blur-sm">
      <Link href="/add-video" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
        <Plus className="w-6 h-6 text-white" />
      </Link>
      <span className="font-bold text-lg text-white">VidFloh</span>
      <div className="flex items-center gap-2">
        <Link href="/search" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
          <Search className="w-6 h-6 text-white" />
        </Link>
        <Link href="/my-videos" className="p-2 rounded-full hover:bg-[var(--accent)/10] transition cursor-pointer">
          <User className="w-6 h-6 text-white" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-y-hidden h-[85vh] w-full">
      <CardHeader />
      <div
        className="flex flex-col items-center w-full h-[76vh] md:h-[80vh] overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {videos.map((video, idx) => (
          <div
            key={video.id}
            className="w-full snap-center relative"
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
