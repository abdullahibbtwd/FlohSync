"use client"
import React, { useState, useEffect } from 'react';
import { users } from '../../Data';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  ArrowLeft, 
  MoreVertical, 
  Send, 
  Phone, 
  Video, 
  Image as ImageIcon,
  Smile,
  Paperclip,
  Users,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Chat = () => {
  const [activeView, setActiveView] = useState<'chats' | 'followers'>('chats');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const searchParams = useSearchParams();

  const currentUser = users.users.find(user => user.user_id === users.current_user_id);

  // Auto-select user from URL parameter
  useEffect(() => {
    const userParam = searchParams.get('user');
    if (userParam) {
      const user = users.users.find(u => u.user_id === userParam);
      if (user) {
        setSelectedUser(user);
      }
    }
  }, [searchParams]);

  // Get users that current user can chat with (mutual followers)
  const getChatUsers = () => {
    if (!currentUser) return [];
    
    return users.users.filter(user => {
      if (user.user_id === currentUser.user_id) return false;
      
      // Check if they follow each other (mutual followers)
      const currentUserFollowsThem = currentUser.following.includes(user.user_id);
      const theyFollowCurrentUser = user.followers.includes(currentUser.user_id);
      
      return currentUserFollowsThem && theyFollowCurrentUser;
    });
  };

  // Get all followers and following
  const getFollowersList = () => {
    if (!currentUser) return { followers: [], following: [] };
    
    const followers = users.users.filter(user => 
      user.followers.includes(currentUser.user_id) && user.user_id !== currentUser.user_id
    );
    
    const following = users.users.filter(user => 
      currentUser.following.includes(user.user_id) && user.user_id !== currentUser.user_id
    );
    
    return { followers, following };
  };

  // Filter users based on search query
  const filterUsers = (userList: any[]) => {
    if (!searchQuery) return userList;
    
    return userList.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const chatUsers = getChatUsers();
  const { followers, following } = getFollowersList();
  const filteredChatUsers = filterUsers(chatUsers);
  const filteredFollowers = filterUsers(followers);
  const filteredFollowing = filterUsers(following);

  // Mock messages for demo
  const mockMessages = [
    { id: 1, sender: 'them', text: 'Hey! How are you?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'I\'m good, thanks! How about you?', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'Great! Want to catch up later?', time: '10:35 AM' },
    { id: 4, sender: 'me', text: 'Sure, that sounds good!', time: '10:36 AM' },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] mt-16 bg-[var(--primary-bg)]">
    

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar - User List */}
        <div className={`${selectedUser ? 'hidden md:block' : 'block'} w-full md:w-80 bg-[var(--secondary-bg)] border-r border-gray-200 dark:border-gray-700`}>
          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveView('chats')}
              className={`flex-1 py-3 text-center font-medium transition ${
                activeView === 'chats'
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Chats ({filteredChatUsers.length})
            </button>
            <button
              onClick={() => setActiveView('followers')}
              className={`flex-1 py-3 text-center font-medium transition ${
                activeView === 'followers'
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Followers ({filteredFollowers.length})
            </button>
          </div>

          {/* User List */}
          <div className="overflow-y-auto h-[calc(100vh-200px)]">
            {activeView === 'chats' ? (
              // Chat Users
              <div>
                {filteredChatUsers.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No chat users found</p>
                    <p className="text-sm">Start following people to chat with them</p>
                  </div>
                ) : (
                  filteredChatUsers.map((user) => (
                    <div
                      key={user.user_id}
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                    >
                      <div className="relative">
                        <Image
                          src={user.profile_picture}
                          alt={user.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{user.name}</h3>
                          <span className="text-xs text-gray-500">2m ago</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Followers/Following
              <div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">Followers ({filteredFollowers.length})</h3>
                  {filteredFollowers.map((user) => (
                    <div 
                      key={user.user_id} 
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition"
                    >
                      <Image
                        src={user.profile_picture}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{user.name}</h4>
                        <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">Following ({filteredFollowing.length})</h3>
                  {filteredFollowing.map((user) => (
                    <div 
                      key={user.user_id} 
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition"
                    >
                      <Image
                        src={user.profile_picture}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{user.name}</h4>
                        <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-[var(--secondary-bg)] border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <Image
                    src={selectedUser.profile_picture}
                    alt={selectedUser.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">@{selectedUser.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'me'
                        ? 'bg-[var(--accent)] text-black'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-[var(--secondary-bg)] border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-2 bg-[var(--accent)] text-black rounded-full hover:bg-[var(--accent)/80] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
        
      </div>
    </div>
  );
};

export default Chat;