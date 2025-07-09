"use client";
import React, { useState } from 'react';
import { User, Plus, Check, X, Users, UserPlus, Search, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Import the real data
const usersData = {
  "current_user_id": "user0",
  "users": [
    {
      "user_id": "user0",
      "name": "Alex Johnson",
      "username": "alex_j",
      "phone_number": "+15551234567",
      "location": "New York, USA",
      "profile_picture": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "followers": ["user1", "user3", "user5", "user6"],
      "following": ["user1", "user2", "user5"],
      "posts": [
        {
          "post_id": "post0_1",
          "content": "Enjoying the NYC sunset! 🌇",
          "image": "https://example.com/posts/sunset.jpg",
          "video": null,
          "timestamp": "2025-07-01T19:30:00Z"
        },
        {
          "post_id": "post0_2",
          "content": "Check out my new vlog!",
          "image": null,
          "video": "https://example.com/vlogs/city_tour.mp4",
          "timestamp": "2025-07-03T14:15:00Z"
        }
      ],
      "relation_status": null
    },
    {
      "user_id": "user1",
      "name": "Sarah Williams",
      "username": "sarah_w",
      "phone_number": "+15552345678",
      "location": "London, UK",
      "profile_picture": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "followers": ["user0", "user2", "user4"],
      "following": ["user0", "user2", "user3"],
      "posts": [
        {
          "post_id": "post1_1",
          "content": "Exploring Camden Market today!",
          "image": "https://example.com/posts/camden.jpg",
          "video": null,
          "timestamp": "2025-07-02T12:45:00Z"
        }
      ],
      "relation_status": "friend"
    },
    {
      "user_id": "user2",
      "name": "Mike Chen",
      "username": "mike_c",
      "phone_number": "+15553456789",
      "location": "Tokyo, Japan",
      "profile_picture": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "followers": ["user0", "user1", "user4", "user6"],
      "following": ["user1", "user3"],
      "posts": [
        {
          "post_id": "post2_1",
          "content": "Sushi making class!",
          "image": "https://example.com/posts/sushi.jpg",
          "video": null,
          "timestamp": "2025-06-28T11:20:00Z"
        },
        {
          "post_id": "post2_2",
          "content": "Shinjuku night walk",
          "image": null,
          "video": "https://example.com/vlogs/tokyo_night.mp4",
          "timestamp": "2025-07-04T20:40:00Z"
        }
      ],
      "relation_status": "request_sent"
    },
    {
      "user_id": "user3",
      "name": "Emma Rodriguez",
      "username": "emma_r",
      "phone_number": "+15554567890",
      "location": "Miami, USA",
      "profile_picture": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "followers": ["user0", "user1", "user2", "user5"],
      "following": ["user0"],
      "posts": [
        {
          "post_id": "post3_1",
          "content": "Beach day! ☀️",
          "image": "https://example.com/posts/miami_beach.jpg",
          "video": null,
          "timestamp": "2025-07-05T13:10:00Z"
        }
      ],
      "relation_status": "request_received"
    },
    {
      "user_id": "user4",
      "name": "David Kim",
      "username": "david_k",
      "phone_number": "+15555678901",
      "location": "Seoul, South Korea",
      "profile_picture": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "followers": ["user1", "user2"],
      "following": ["user1", "user2"],
      "posts": [
        {
          "post_id": "post4_1",
          "content": "Gyeongbokgung Palace visit",
          "image": "https://example.com/posts/palace.jpg",
          "video": null,
          "timestamp": "2025-06-30T09:30:00Z"
        }
      ],
      "relation_status": "not_connected"
    },
    {
      "user_id": "user5",
      "name": "Priya Sharma",
      "username": "priya_s",
      "phone_number": "+15556789012",
      "location": "Mumbai, India",
      "profile_picture": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      "followers": ["user0", "user3"],
      "following": ["user0", "user3"],
      "posts": [
        {
          "post_id": "post5_1",
          "content": "Street food adventure!",
          "image": "https://example.com/posts/street_food.jpg",
          "video": null,
          "timestamp": "2025-07-02T18:00:00Z"
        },
        {
          "post_id": "post5_2",
          "content": "Diwali preparations",
          "image": null,
          "video": "https://example.com/vlogs/diwali_prep.mp4",
          "timestamp": "2025-07-06T16:45:00Z"
        }
      ],
      "relation_status": "friend"
    },
    {
      "user_id": "user6",
      "name": "James Wilson",
      "username": "james_w",
      "phone_number": "+15557890123",
      "location": "Sydney, Australia",
      "profile_picture": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "followers": ["user0"],
      "following": ["user0", "user2"],
      "posts": [
        {
          "post_id": "post6_1",
          "content": "Opera House view!",
          "image": "https://example.com/posts/opera_house.jpg",
          "video": null,
          "timestamp": "2025-07-01T10:15:00Z"
        }
      ],
      "relation_status": "request_received"
    },
    {
      "user_id": "user7",
      "name": "Sophie Martin",
      "username": "sophie_m",
      "phone_number": "+15558901234",
      "location": "Paris, France",
      "profile_picture": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      "followers": ["user8", "user9"],
      "following": ["user8", "user9"],
      "posts": [
        {
          "post_id": "post7_1",
          "content": "Eiffel Tower lunch",
          "image": "https://example.com/posts/eiffel.jpg",
          "video": null,
          "timestamp": "2025-06-29T12:30:00Z"
        }
      ],
      "relation_status": "not_connected"
    },
    {
      "user_id": "user8",
      "name": "Carlos Silva",
      "username": "carlos_s",
      "phone_number": "+15559012345",
      "location": "Rio de Janeiro, Brazil",
      "profile_picture": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "followers": ["user7", "user9"],
      "following": ["user7", "user9"],
      "posts": [
        {
          "post_id": "post8_1",
          "content": "Carnival preparations!",
          "image": "https://example.com/posts/carnival.jpg",
          "video": null,
          "timestamp": "2025-07-03T11:40:00Z"
        }
      ],
      "relation_status": "not_connected"
    },
    {
      "user_id": "user9",
      "name": "Aisha Khan",
      "username": "aisha_k",
      "phone_number": "+15550123456",
      "location": "Dubai, UAE",
      "profile_picture": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "followers": ["user7"],
      "following": ["user7", "user8"],
      "posts": [
        {
          "post_id": "post9_1",
          "content": "Desert safari adventure",
          "image": null,
          "video": "https://example.com/vlogs/desert_safari.mp4",
          "timestamp": "2025-07-04T09:20:00Z"
        }
      ],
      "relation_status": "not_connected"
    },
  ],
};

// Fuzzy search function
const fuzzySearch = (searchTerm: string, text: string): boolean => {
  const searchLower = searchTerm.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match
  if (textLower.includes(searchLower)) return true;
  
  // Partial word match
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
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [allUsersData, setAllUsersData] = useState<any[]>([]);
  
  // State for showing more cards
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllSent, setShowAllSent] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllSearch, setShowAllSearch] = useState(false);

  // Process the real data
  React.useEffect(() => {
    const currentUserId = usersData.current_user_id;
    const allUsers = usersData.users.filter(user => user.user_id !== currentUserId);
    
    const processedUsers = allUsers.map(user => ({
      id: user.user_id,
      name: user.name,
      username: user.username,
      avatar: user.profile_picture,
      bio: `Based in ${user.location}. Connect with me!`,
      mutualFriends: Math.floor(Math.random() * 5) + 1,
      skills: ["Networking", "Collaboration", "Innovation"],
      relation_status: user.relation_status
    }));

    setAllUsersData(processedUsers);
    
    const availableUsers = processedUsers.filter(user => user.relation_status === "not_connected");
    const pendingRequestsData = processedUsers.filter(user => user.relation_status === "request_received");
    const sentRequestsData = processedUsers.filter(user => user.relation_status === "request_sent");

    setUsers(availableUsers);
    setPendingRequestsState(pendingRequestsData);
    setSentRequestsState(sentRequestsData);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setShowAllSearch(false);
      return;
    }

    setIsSearching(true);
    setShowAllSearch(false);
    
    // Search through all users (excluding current user)
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

  const handleAddFlowMate = (user: any) => {
    // Create a new user object with updated relation_status
    const updatedUser = { ...user, relation_status: "request_sent" };
    
    setSentRequestsState(prev => [...prev, updatedUser]);
    setUsers(prev => prev.filter(u => u.id !== user.id));
    
    // Update the user in allUsersData as well
    setAllUsersData(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    
    // Show success message
    alert(`Friend request sent to ${user.name}!`);
  };

  const handleAcceptRequest = (user: any) => {
    setPendingRequestsState(prev => prev.filter(u => u.id !== user.id));
    alert(`${user.name} is now your Flow Mate!`);
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
    setAllUsersData(prev => prev.map(u => u.id === user.id ? resetUser : u));
    
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
          <img
            src={user.avatar}
            alt={user.name}
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
        <div className="flex gap-2">
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
        <div className="flex gap-2">
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
          {displayUsers.map((user) => renderUserCard(user, showAddButton))}
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
                <p>No users found matching "{searchTerm}"</p>
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