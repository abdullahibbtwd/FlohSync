"use client"
import React, { useRef, useEffect, useState } from 'react'
import { videos } from '../../Data'
import VidFlohCard from './VidFlohCard'

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

  return (
    <div
      className="flex flex-col items-center w-full h-[83vh] md:h-[80vh]  overflow-y-auto snap-y snap-mandatory"
      style={{ scrollBehavior: 'smooth' }}
    >
      {videos.map((video, idx) => (
        <div
          key={video.id}
          className="w-full snap-center"
          ref={el => { cardRefs.current[idx] = el; }}
          data-idx={idx}
        >
          <VidFlohCard videoData={video} isActive={activeIndex === idx} />
        </div>
      ))}
    </div>
  )
}

export default VidFloh
