"use client"
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  MoreHorizontal, 
  Grid3X3, 
  Bookmark, 
  Heart,
  MessageCircle,
  Share2,
  X,

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
import axios from 'axios';
import PostCard from './PostCard';
import { toast } from 'sonner';
const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  //const [isFollowing, setIsFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<any[]>([]);
  const { userData, backendUrl } = useAppContext();
  const user = {
    id: userData?.id || '1',
    name: userData?.name,
    username: userData?.username,
    bio: userData?.bio ,
    profilePicture: userData?.profilePicture,
    coverPhoto: userData?.coverPicture,
    location: userData?.location,
    phone: userData?.phone,
    email: userData?.email,
    joinedDate: userData?.joinedDate,
    followers: userData?.followers,
    following: userData?.following,
    followersCount: userData?.followersCount,
    followingCount: userData?.followingCount,
    posts: userData?.post,
    isVerified: true,
    isPrivate: false
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/post/user', { withCredentials: true });
        if (response.data.success) {
          setUserPosts(response.data.posts);
          console.log(response.data.posts)
        }
      } catch (error) {
        toast.error("something went wrong!")
      }
    };
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/post/save', { withCredentials: true });
        if (response.data.success) {
          setSavedPosts(response.data.posts);
        }
      } catch (error) {
        toast.error("Failed to fetch saved posts!");
      }
    };
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/post/like', { withCredentials: true });
        if (response.data.success) {
          setLikedPosts(response.data.posts);
        }
      } catch (error) {
        toast.error("Failed to fetch liked posts!");
      }
    };
    fetchLikedPosts();
    fetchSavedPosts();
    fetchUserPosts();
  }, [backendUrl]);




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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid3X3, count: userPosts.length },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: savedPosts.length },
    { id: 'liked', label: 'Liked', icon: Heart, count: likedPosts.length }
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
          src={user.coverPhoto || "/user.jpg"}
          alt="Cover photo"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 pb-4">
        {/* Profile Picture */}
        <div className="relative -mt-16 mb-4">
          <div className="relative">
            <Image
              src={user.profilePicture || "/user.jpg"}
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
                  <span>Joined {new Date(user.joinedDate || '').toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg">{formatNumber(user.posts || 0)}</div>
              <div className="text-gray-600 dark:text-gray-400">Posts</div>
            </div>
            <Link href={`/follow/${user.id}/followers`} className="text-center cursor-pointer hover:opacity-80 transition">
              <div className="font-bold text-lg">{formatNumber(user.followingCount || 0)}</div>
             <div className="text-gray-600 dark:text-gray-400">Followers</div>
            </Link>
            <Link href={`/follow/${user.id}/following`} className="text-center cursor-pointer hover:opacity-80 transition">
               <div className="font-bold text-lg">{formatNumber(user.followersCount || 0)}</div>
              <div className="text-gray-400">Following</div>
            </Link>
           
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
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square group cursor-pointer rounded-sm overflow-hidden bg-black"
                onClick={() => { 
                  console.log('Image URL:', post.image?.[0]);
                  setSelectedPost(post); 
                  setShowPostModal(true); 
                }}
              >
                {post.image && post.image[0] ? (
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url('${post.image[0]}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <span className="text-center text-white text-base font-semibold line-clamp-2">{post.content}</span>
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white text-center p-2">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{formatNumber(post.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{formatNumber(post.comments?.length || 0)}</span>
                      </div>
                    </div>
                    <p className="text-xs line-clamp-2">{post.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {savedPosts.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-gray-500 dark:text-gray-400">
                <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No saved posts yet</p>
                <p className="text-sm">Posts you save will appear here</p>
              </div>
            ) : (
              savedPosts.map((post) => (
                <div
                  key={post.id}
                  className="relative aspect-square group cursor-pointer rounded-sm overflow-hidden bg-black"
                  onClick={() => { 
                    setSelectedPost(post); 
                    setShowPostModal(true); 
                  }}
                >
                  {post.image && post.image[0] ? (
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url('${post.image[0]}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <span className="text-center text-white text-base font-semibold line-clamp-2">{post.content}</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white text-center p-2">
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(post.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(post.comments?.length || 0)}</span>
                        </div>
                      </div>
                      <p className="text-xs line-clamp-2">{post.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {likedPosts.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-gray-500 dark:text-gray-400">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No liked posts yet</p>
                <p className="text-sm">Posts you like will appear here</p>
              </div>
            ) : (
              likedPosts.map((post) => (
                <div
                  key={post.id}
                  className="relative aspect-square group cursor-pointer rounded-sm overflow-hidden bg-black"
                  onClick={() => { 
                    setSelectedPost(post); 
                    setShowPostModal(true); 
                  }}
                >
                  {post.image && post.image[0] ? (
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url('${post.image[0]}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <span className="text-center text-white text-base font-semibold line-clamp-2">{post.content}</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white text-center p-2">
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(post.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{formatNumber(post.comments?.length || 0)}</span>
                        </div>
                      </div>
                      <p className="text-xs line-clamp-2">{post.content}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showPostModal && selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'var(--primary-bg)',
            color: 'var(--primary-text)',
          }}
        >
          <div className="relative max-w-xl w-full bg-[var(--primary-bg)] text-[var(--primary-text)] rounded-lg p-8 shadow-lg">
            <button className="absolute top-4 right-4 z-10 bg-[var(--primary-bg)] rounded-full p-2 hover:bg-[var(--secondary-bg)] transition" onClick={() => setShowPostModal(false)}>
              <X className="w-6 h-6" />
            </button>
            <PostCard
              id={selectedPost.id}
              user={{
                name: selectedPost.user?.name,
                profileImage: selectedPost.user?.profilePicture || "/user.jpg",
                userId: selectedPost.user?.id,
              }}
              time={getRelativeTime(selectedPost.createdAt)}
              text={selectedPost.content}
              images={selectedPost.image ? selectedPost.image.map((img: string, idx: number) => ({ id: `${selectedPost.id}-${idx}`, image: img })) : []}
              likeCount={selectedPost.likes}
              commentCount={selectedPost.comments?.length || 0}
              liked={selectedPost.liked}
              bookmarked={selectedPost.bookmarked}
              comments={selectedPost.comments || []}
            />
          </div>
        </div>
      )}
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