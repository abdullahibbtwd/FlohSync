/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, UserPlus, UserCheck, MessageCircle, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PostCard from '../../components/PostCard';
import { useAppContext } from '../../context/useAppContext';
import axios from 'axios';

interface UserProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

interface User {
  id: string;
  name: string;
  username: string;
  profilePicture: string; 
  location: string;
  bio: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  post: number;
  relation_status: string;
  posts: Post[];
}



interface Post {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: any[];
  user: {
    name: string;
    profileImage: string;
  };
  image: any[];
}

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

const UserProfilePage: React.FC<UserProfilePageProps> = ({ params }) => {
  const { userId } = React.use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { userData, backendUrl } = useAppContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/user/user/${userId}`, { withCredentials: true });
        const foundUser = response.data.userData;
        if (foundUser) {
          setUser(foundUser);
          setIsFollowing(foundUser.relation_status === 'following' || foundUser.relation_status === 'friend');
          console.log('User data fetched:', foundUser);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId, backendUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    notFound();
  }

  const isCurrentUser = userData?.id === userId;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    alert(isFollowing ? `Unfollowed ${user.name}` : `Started following ${user.name}`);
  };

  const handleMessage = () => {
    router.push(`/chat?user=${user.id}`);
  };

  const getRelationStatusText = () => {
    if (isCurrentUser) return "You";
    if (user.relation_status === "following") return "Following";
    if (user.relation_status === "follower") return "Follows you";
    if (user.relation_status === "friend") return "Friends";
    return "Not connected";
  };

  const getActionButton = () => {
    if (isCurrentUser) {
      return (
        <button className="px-6 py-2 bg-[var(--accent)] text-white rounded-full hover:bg-[var(--accent)/80] transition">
          Edit Profile
        </button>
      );
    }
    if (isFollowing) {
      return (
        <button
          onClick={handleFollow}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700  text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <UserCheck className="w-4 h-4 inline mr-2" />
          Following
        </button>
      );
    }
    return (
      <button
        onClick={handleFollow}
        className="px-6 py-2 bg-[var(--accent)] text-black hover:text-white rounded-full hover:bg-[var(--accent)/80] transition"
      >
        <UserPlus className="w-4 h-4 inline mr-2" />
        Follow
      </button>
    );
  };

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--secondary-bg)] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-lg font-semibold">{user.name}</h1>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">Report</button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">Block</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4">
        <div className="bg-[var(--secondary-bg)] rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src={user.profilePicture || "/user.jpg"}
                alt={user.name}
                width={120}
                height={120}
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              />
            </div>
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                  <p className=" mb-2">@{user.username}</p>
                  <div className="flex items-center gap-4 text-sm ">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location || 'No location'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Joined {getRelativeTime(user.joinedDate)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {getActionButton()}
                  {!isCurrentUser && (
                    <button
                      onClick={handleMessage}
                      className="px-6 py-2 border border-[var(--accent)] hover:text-black text-[var(--accent)] rounded-full hover:bg-[var(--accent)]  transition"
                    >
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message
                    </button>
                  )}
                </div>
              </div>
              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-semibold">{user.post}</span>
                  <span className=" ml-1">posts</span>
                </div>
                <div>
                  <span className="font-semibold">{user.followersCount}</span>
                  <span className=" ml-1">followers</span>
                </div>
                <div>
                  <span className="font-semibold">{user.followingCount}</span>
                  <span className=" ml-1">following</span>
                </div>
                <div>
                  <span className="">{getRelationStatusText()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Navigation Tabs */}
        <div className="bg-[var(--secondary-bg)] rounded-lg p-4 mb-6">
          <div className="flex space-x-1">
            <button
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                'bg-[var(--accent)] text-black'
              }`}
              disabled
            >
              Posts {user.post > 0 ? `(${user.post})` : ''}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {user.posts.length === 0 ? (
            <div className="text-center py-12 ">
              <p>No posts yet</p>
            </div>
          ) : (
            [...user.posts].reverse().map((post: any) => (
              <PostCard
                key={post.id}
                id={post.id}
                user={{
                  name: user.name,
                  profileImage: user.profilePicture,
                  userId: user.id,
                }}
                time={getRelativeTime(post.createdAt)}
                text={post.content}
                images={
                  Array.isArray(post.image)
                    ? post.image.filter((img: string) => !!img).map((img: string, idx: number) => ({ id: idx, image: img }))
                    : typeof post.image === "string" && post.image.length > 0
                      ? JSON.parse(post.image).filter((img: string) => !!img).map((img: string, idx: number) => ({ id: idx, image: img }))
                      : []
                }
                likeCount={post.likes ? post.likes.length : 0}
                commentCount={post.comments ? post.comments.length : 0}
                liked={false}
                bookmarked={false}
                comments={post.comments || []}
              />
            )))
          }
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;