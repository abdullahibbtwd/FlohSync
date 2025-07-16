"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, MoreHorizontal, UserPlus, UserMinus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  username: string;
  profilePicture: string;
  bio: string;
  isVerified: boolean;
  isFollowing?: boolean;
  followStatus?: 'pending' | 'accepted';
}

const FollowPage = () => {
  const params = useParams();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers');

  const userId = params.id as string;
  const type = params.type as string;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const fetchFollowList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/user/follow/${userId}/${type}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching follow list:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && type) {
      fetchFollowList();
    }
  }, [userId, type]);

  const handleFollow = async (targetUserId: string) => {
    try {
      const currentUser = users.find(user => user.id === targetUserId);
      const isCurrentlyFollowing = currentUser?.isFollowing;

      const response = await axios.post(`${backendUrl}/api/follow/follows`, {
        targetUserId: targetUserId
      }, {
        withCredentials: true,
      });

      if (response.data.success) {
        // Update the local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === targetUserId 
              ? { ...user, isFollowing: !user.isFollowing }
              : user
          )
        );
        
        toast.success(isCurrentlyFollowing ? 'Unfollowed successfully' : 'Followed successfully');
      } else {
        toast.error(response.data.message || 'Failed to update follow status');
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
      toast.error('Failed to update follow status');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTitle = () => {
    return type === 'followers' ? 'Followers' : 'Following';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--secondary-bg)] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold">{getTitle()}</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${getTitle().toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="p-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-lg font-medium mb-2">
              {searchQuery ? 'No users found' : `No ${getTitle().toLowerCase()} yet`}
            </p>
            <p className="text-sm">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : type === 'followers' 
                  ? 'When people follow you, they\'ll appear here'
                  : 'People you follow will appear here'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 flex-1">
                  <Link href={`/${user.id}`} className="flex-shrink-0">
                    <Image
                      src={user.profilePicture || '/user.jpg'}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/profile/${user.id}`} className="block">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                        {user.isVerified && (
                          <div className="bg-blue-500 text-white p-0.5 rounded-full">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">@{user.username}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs truncate mt-1">{user.bio}</p>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.followStatus === 'pending' ? (
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                      {type === 'followers' ? 'Pending' : 'Request Sent'}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleFollow(user.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                        user.isFollowing
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          : 'bg-[var(--accent)] text-white hover:bg-[var(--accent)/80]'
                      }`}
                    >
                      {user.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowPage; 