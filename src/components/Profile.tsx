"use client"
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  MoreHorizontal, 
  Grid3X3, 
  Bookmark, 
  Heart,
  MessageCircle,
  Share2,

  MapPin,
  Phone,
  Mail,
  Calendar,
  Camera,
  Video,
  Lock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useAppContext} from "../context/useAppContext";
const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  //const [isFollowing, setIsFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {userData} = useAppContext();
  const user = {
    id: '1',
    name: userData?.name,
    username: userData?.username,
    bio: 'Living life one post at a time ✨ | Photography enthusiast 📸 | Coffee lover ☕',
    profilePicture: 'https://picsum.photos/id/1005/300/300',
    coverPhoto: 'https://picsum.photos/id/1018/800/300',
    location: 'New York, NY',
    phone: '+1 234 567 8900',
    email: userData?.email,
    joinedDate: '2023-01-15',
    followers: 1247,
    following: 892,
    posts: 156,
    isVerified: true,
    isPrivate: false
  };

  // Mock posts data
  const posts = [
    {
      id: '1',
      type: 'image',
      content: 'Beautiful sunset at the beach today! 🌅',
      media: 'https://picsum.photos/id/1015/400/400',
      likes: 234,
      comments: 45,
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'video',
      content: 'Amazing concert last night! 🎵',
      media: 'https://picsum.photos/id/1016/400/400',
      likes: 567,
      comments: 89,
      timestamp: '2024-01-14T20:15:00Z'
    },
    {
      id: '3',
      type: 'image',
      content: 'Coffee and coding ☕💻',
      media: 'https://picsum.photos/id/1019/400/400',
      likes: 123,
      comments: 23,
      timestamp: '2024-01-13T09:45:00Z'
    },
    {
      id: '4',
      type: 'image',
      content: 'Weekend vibes 🌟',
      media: 'https://picsum.photos/id/1020/400/400',
      likes: 345,
      comments: 67,
      timestamp: '2024-01-12T16:20:00Z'
    },
    {
      id: '5',
      type: 'video',
      content: 'Travel adventures! ✈️',
      media: 'https://picsum.photos/id/1021/400/400',
      likes: 789,
      comments: 156,
      timestamp: '2024-01-11T14:30:00Z'
    },
    {
      id: '6',
      type: 'image',
      content: 'Food photography 📸',
      media: 'https://picsum.photos/id/1022/400/400',
      likes: 234,
      comments: 34,
      timestamp: '2024-01-10T12:00:00Z'
    }
  ];

  // const handleFollow = () => {
  //   setIsFollowing(!isFollowing);
  // };

  // const getRelativeTime = (dateString: string) => {
  //   const now = new Date();
  //   const date = new Date(dateString);
  //   const diff = now.getTime() - date.getTime();
  //   const seconds = Math.floor(diff / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);

  //   if (days > 0) return `${days}d`;
  //   if (hours > 0) return `${hours}h`;
  //   if (minutes > 0) return `${minutes}m`;
  //   return 'now';
  // };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid3X3, count: posts.length },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: 23 },
    { id: 'liked', label: 'Liked', icon: Heart, count: 156 }
  ];

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--secondary-bg)] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2  transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-lg font-semibold">{user.name}</h1>
          <div className="flex items-center gap-2">
            <Link href="/settings" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
              <Settings className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="relative h-48 md:h-64">
        <Image
          src={user.coverPhoto}
          alt="Cover photo"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 pb-4">
        {/* Profile Picture */}
        <div className="relative -mt-16 mb-4">
          <div className="relative">
            <Image
              src={user.profilePicture}
              alt="profile"
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-[var(--accent)] p-2 rounded-full hover:bg-[var(--accent)/80] transition">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl md:text-2xl font-bold">{user.name}</h2>
                {user.isVerified && (
                  <div className="bg-blue-500 text-white p-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {user.isPrivate && (
                  <div className="bg-gray-500 text-white p-1 rounded-full">
                    <Lock className="w-3 h-3" />
                  </div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">@{user.username}</p>
              <p className="text-sm mb-3">{user.bio}</p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg">{formatNumber(user.posts)}</div>
              <div className="text-gray-600 dark:text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{formatNumber(user.followers)}</div>
              <div className="text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">{formatNumber(user.following)}</div>
              <div className="text-gray-600 dark:text-gray-400">Following</div>
            </div>
            <div className="flex gap-3">
            
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:text-black hover:bg-[var(--accent)] ease-in-out duration-300 transition">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          </div>

          {/* Action Buttons */}
         
        </div>
      </div>

      {/* Content Tabs */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-transparent '
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                <span className="text-xs  text-black    bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {posts.map((post) => (
              <div key={post.id} className="relative aspect-square group cursor-pointer">
                <Image
                  src={post.media}
                  alt={post.content}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-2">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{formatNumber(post.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{formatNumber(post.comments)}</span>
                      </div>
                    </div>
                    <p className="text-xs line-clamp-2">{post.content}</p>
                  </div>
                </div>
                {post.type === 'video' && (
                  <div className="absolute top-2 right-2">
                    <Video className="w-4 h-4 text-white drop-shadow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No saved posts yet</p>
            <p className="text-sm">Posts you save will appear here</p>
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No liked posts yet</p>
            <p className="text-sm">Posts you like will appear here</p>
          </div>
        )}
      </div>

      {/* Menu Dropdown */}
      {showMenu && (
        <div className="fixed inset-0 z-50" onClick={() => setShowMenu(false)}>
          <div className="absolute top-16 right-4 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
              Report
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">
              Block
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;