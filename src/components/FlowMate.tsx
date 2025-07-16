/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import {  Plus, Check, X, Users, UserPlus, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/useAppContext';
import axios from "axios"; // Make sure this is imported at the top
import { toast } from 'sonner';


const fuzzySearch = (searchTerm: string, text: string): boolean => {
  const searchLower = searchTerm.toLowerCase();
  const textLower = text.toLowerCase();
  
  
  if (textLower.includes(searchLower)) return true;
  

  const searchWords = searchLower.split(' ').filter(word => word.length > 0);
  const textWords = textLower.split(' ').filter(word => word.length > 0);
  
  return searchWords.some(searchWord => 
    textWords.some(textWord => textWord.includes(searchWord))
  );
};

const FlowMate = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [pendingRequests, setPendingRequestsState] = useState<any[]>([]);
  const [sentRequests, setSentRequestsState] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { usersToFollow, backendUrl, getUsersToFollow } = useAppContext();
  const allUsersData = usersToFollow; // Already fetched from backend
  
  // State for showing more cards
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllSent, setShowAllSent] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllSearch, setShowAllSearch] = useState(false);

  // Process the real data
  React.useEffect(() => {
    const availableUsers = allUsersData.filter(user => user.relation_status === "not_connected");
    const pendingRequestsData = allUsersData.filter(user => user.relation_status === "request_received");
    const sentRequestsData = allUsersData.filter(user => user.relation_status === "request_sent");

    setUsers(availableUsers);
    setPendingRequestsState(pendingRequestsData);
    setSentRequestsState(sentRequestsData);
  }, [allUsersData]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setShowAllSearch(false);
      return;
    }

    setIsSearching(true);
    setShowAllSearch(false);
    
   
    const results = allUsersData.filter(user => 
      fuzzySearch(searchTerm, user.name) || fuzzySearch(searchTerm, user.username)
    );

    setSearchResults(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setSearchResults([]);
    setShowAllSearch(false);
  };

  const handleAddFlowMate = async (user: any) => {
    try {
      console.log("Sending follow request for user id:", user.id);
      const response = await axios.post(
        `${backendUrl}/api/follow/follows`,
        { targetUserId: user.id }, 
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message || `Friend request sent to ${user.name}!`);
        // Optionally refresh the users list from backend
        getUsersToFollow();
      } else {
        toast.error(response.data.message || "Failed to send request.");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "An error occurred.");
    }
  };

  const handleAcceptRequest = async (user: any) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/follow/accept`,
        { requesterId: user.id },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message || `${user.name} is now your Flow Mate!`);
        getUsersToFollow();
      } else {
        toast.error(response.data.message || "Failed to accept request.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    }
  };

  const handleRejectRequest = (user: any) => {
    setPendingRequestsState(prev => prev.filter(u => u.id !== user.id));
    alert(`Rejected ${user.name}'s request`);
  };

  const handleCancelRequest = (user: any) => {
    // Create a new user object with reset relation_status
    const resetUser = { ...user, relation_status: "not_connected" };
    
    setSentRequestsState(prev => prev.filter(u => u.id !== user.id));
    setUsers(prev => [...prev, resetUser]); // Add back to available users
    
    // Update the user in allUsersData as well
    // This part needs to be handled by the backend or context
    // For now, we'll just remove it from the current users list
    setUsers(prev => prev.filter(u => u.id !== user.id));
    
    alert(`Cancelled request to ${user.name}`);
  };

  const renderUserCard = (user: any, showAddButton = true) => (
    <div
      key={user.id}
      className="p-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ 
        background: "var(--secondary-bg)",
        border: user.relation_status === "request_received" || user.relation_status === "request_sent" 
          ? "1px solid var(--accent)" 
          : "none"
      }}
    >
      <div className="flex items-center gap-4 mb-3">
        <Link href={`/${user.id}`}>
          <Image
            src={user.profile_picture || "/user.jpg"}
            alt={user.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 transition"
          />
        </Link>
        <div className="flex-1">
          <Link href={`/${user.id}`}>
            <h3 className="font-semibold text-lg hover:text-[var(--accent)] transition cursor-pointer">{user.name}</h3>
          </Link>
          <p className="text-xs opacity-70">@{user.username}</p>
          <span className="inline-block px-2 py-1 text-xs rounded-full font-medium">
            {user.mutualFriends} mutual friends
          </span>
        </div>
      </div>
      <p className="text-sm mb-4 line-clamp-2">{user.bio}</p>
      
      {user.relation_status === "request_received" && (
        <div className="flex gap-2" key={user.id}>
          <button
            onClick={() => handleAcceptRequest(user)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md font-medium transition-all duration-200"
            style={{
              background: "var(--accent)",
              color: "black"
            }}
          >
            <Check size={16} />
            Accept
          </button>
          <button
            onClick={() => handleRejectRequest(user)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md font-medium border transition-all duration-200"
            style={{
              borderColor: "var(--accent)",
              color: "var(--primary-text)"
            }}
          >
            <X size={16} />
            Reject
          </button>
        </div>
      )}

      {user.relation_status === "request_sent" && (
        <div className="flex gap-2" key={user.id}>
          <button
            onClick={() => handleCancelRequest(user)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md font-medium border transition-all duration-200"
            style={{
              borderColor: "var(--accent)",
              color: "var(--primary-text)"
            }}
          >
            <X size={16} />
            Cancel Request
          </button>
        </div>
      )}

      {showAddButton && user.relation_status === "not_connected" && (
        <button
          onClick={() => handleAddFlowMate(user)}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm rounded-md font-medium transition-all duration-200"
          style={{
            background: "var(--accent)",
            color: "black"
          }}
        >
          <Plus size={16} />
          Add Flow Mate
        </button>
      )}
    </div>
  );

  const renderSection = (
    title: string, 
    users: any[], 
    icon: React.ReactNode, 
    showAddButton: boolean = true,
    showMore: boolean,
    setShowMore: (show: boolean) => void
  ) => {
    if (users.length === 0) return null;
    
    const displayUsers = showMore ? users : users.slice(0, 3);
    const hasMore = users.length > 3;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-xl font-semibold">
            {title} ({users.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayUsers.map((user) => (
            <React.Fragment key={user.id}>
              {renderUserCard(user, showAddButton)}
            </React.Fragment>
          ))}
        </div>
        {hasMore && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-6 py-2 rounded-lg font-medium transition-all duration-200"
              style={{
                background: showMore ? "var(--secondary-bg)" : "var(--accent)",
                color: showMore ? "var(--primary-text)" : "black",
                border: showMore ? "1px solid var(--accent)" : "none"
              }}
            >
              {showMore ? "Show Less" : `See More (${users.length - 3} more)`}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen pt-16 sm:pt-20 px-2 sm:px-4 lg:px-6"
      style={{
        background: "var(--primary-bg)",
        color: "var(--primary-text)"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2  hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--gradient-start) 0%, var(--gradient-end) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Flow Mates
          </h1>
          <p className="text-lg opacity-70">
            Connect with amazing people in your network
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="flex gap-3 max-w-md">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 pl-10 rounded-lg border outline-none transition-all duration-200"
                style={{
                  background: "var(--secondary-bg)",
                  borderColor: "var(--accent)",
                  color: "var(--primary-text)"
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50" />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
              style={{
                background: "var(--accent)",
                color: "black"
              }}
            >
              <Search size={20} />
            </button>
            {isSearching && (
              <button
                onClick={clearSearch}
                className="px-4 py-2 rounded-lg font-medium border transition-all duration-200"
                style={{
                  borderColor: "red",
                  color: "var(--primary-text)"
                }}
              >
                <X size={20} color="red"/>
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Search size={20} />
              <h2 className="text-xl font-semibold">
                Search Results ({searchResults.length})
              </h2>
            </div>
            {searchResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No users found matching &quot;{searchTerm}&quot;</p>
                <p className="text-sm mt-2">Try searching with different keywords</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(showAllSearch ? searchResults : searchResults.slice(0, 3)).map((user) => renderUserCard(user, false))}
                </div>
                {searchResults.length > 3 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowAllSearch(!showAllSearch)}
                      className="px-6 py-2 rounded-lg font-medium transition-all duration-200"
                      style={{
                        background: showAllSearch ? "var(--secondary-bg)" : "var(--accent)",
                        color: showAllSearch ? "var(--primary-text)" : "black",
                        border: showAllSearch ? "1px solid var(--accent)" : "none"
                      }}
                    >
                      {showAllSearch ? "Show Less" : `See More (${searchResults.length - 3} more)`}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Pending Requests Section */}
        {!isSearching && renderSection(
          "Pending Requests",
          pendingRequests,
          <UserPlus size={20} />,
          false,
          showAllPending,
          setShowAllPending
        )}

        {/* Sent Requests Section */}
        {!isSearching && renderSection(
          "Sent Requests",
          sentRequests,
          <UserPlus size={20} />,
          false,
          showAllSent,
          setShowAllSent
        )}

        {/* Available Users Section */}
        {!isSearching && renderSection(
          "Discover People",
          users,
          <Users size={20} />,
          true,
          showAllUsers,
          setShowAllUsers
        )}
      </div>
    </div>
  );
};

export default FlowMate;