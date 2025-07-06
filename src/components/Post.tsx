import React from 'react'
import { posts } from '../../Data'
import PostCard from './PostCard'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function getRelativeTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

const Post = () => {
  const currentUser = posts[0]?.user;
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center gap-3 p-3 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 max-w-2xl">
        {/* Create Post Section */}
        
          <div className="flex items-center w-full gap-3 bg-[var(--secondary-bg)] rounded-lg p-4 mb-4 shadow cursor-pointer hover:bg-[var(--accent)/10] transition">
            <Image
              src={currentUser?.profileImage}
              alt="profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
           
              <Link href="/create-post" className="w-9/10">
             <div  className='flex gap-2 justify-between w-full'>
            <input
              type="text"
              placeholder="Write a post"
              className="flex-1 px-4 py-2 rounded-full border outline-none bg-[var(--primary-bg)]"
            />
            <label className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-full bg-[var(--primary-bg)] hover:bg-[var(--accent)] transition">
              <ImageIcon className="w-5 h-5" />
              <input type="file" accept="image/*" className="hidden" />
            </label></div>
            </Link>
            
            
          </div>
      
        {/* Posts List */}
        {posts.map(post => (
          <PostCard
            key={post.id}
            user={{
              name: post.user.name,
              profileImage: post.user.profileImage,
              status: undefined // or set a status if you have one
            }}
            time={getRelativeTime(post.createdAt)}
            text={post.content}
            images={post.contentImage ?? []}
            likeCount={post.likes}
            commentCount={post.comments.length}
            liked={false} // You can set this based on user state
            bookmarked={false} // You can set this based on user state
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  )
}

export default Post
