"use client"
import React, { useState } from 'react';
import { users } from '../../Data';
import { 
  ArrowLeft, 
  Plus, 
  MoreVertical, 
  Camera, 
  Edit3, 
  Trash2, 
  Eye,
  EyeOff,
  Clock,
  Check,
  X,
  Image as ImageIcon,
  Video,
  Smile,
  Globe,
  Users,
  Lock
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Update = () => {
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [showAddStatus, setShowAddStatus] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [statusPrivacy, setStatusPrivacy] = useState<'public' | 'contacts' | 'close'>('public');

  const currentUser = users.users.find(user => user.user_id === users.current_user_id);

  // Mock status data - replace with real data from your backend
  const statusUpdates = [
    {
      id: '1',
      user: users.users[0],
      type: 'image',
      content: 'https://picsum.photos/id/1015/400/600',
      text: 'Beautiful sunset! 🌅',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      views: 24,
      isViewed: false
    },
    {
      id: '2',
      user: users.users[1],
      type: 'text',
      content: null,
      text: 'Having a great day! 😊',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      views: 18,
      isViewed: true
    },
    {
      id: '3',
      user: users.users[2],
      type: 'video',
      content: 'https://picsum.photos/id/1016/400/600',
      text: 'Amazing concert! 🎵',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      views: 31,
      isViewed: false
    },
    {
      id: '4',
      user: users.users[3],
      type: 'image',
      content: 'https://picsum.photos/id/1018/400/600',
      text: 'Coffee and coding ☕💻',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      views: 15,
      isViewed: true
    }
  ];

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleAddStatus = () => {
    if (statusText.trim()) {
      // Here you would typically save to backend
      console.log('Adding status:', { text: statusText, privacy: statusPrivacy });
      setStatusText('');
      setShowAddStatus(false);
    }
  };

  const handleStatusClick = (status: any) => {
    setSelectedStatus(status);
  };

  return (
    <div className="min-h-[calc(100vh-170px)] mt-16  bg-[var(--primary-bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--secondary-bg)] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Updates</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddStatus(true)}
              className="p-2 bg-[var(--accent)] text-black rounded-full hover:bg-[var(--accent)/80] transition"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Status List */}
      <div className="p-4 space-y-4">
        {/* My Status */}
        <div className="bg-[var(--secondary-bg)] rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">My Status</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={currentUser?.profile_picture || "https://picsum.photos/id/1005/150/150"}
                alt="My status"
                width={60}
                height={60}
                className="w-15 h-15 rounded-full object-cover border-2 border-[var(--accent)]"
              />
              <button className="absolute bottom-0 right-0 bg-[var(--accent)] p-2 rounded-full hover:bg-[var(--accent)/80] transition">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Add to my status</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tap to add status update</p>
            </div>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-[var(--secondary-bg)] rounded-lg pb-16 p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
          <div className="space-y-3">
            {statusUpdates.map((status) => (
              <div
                key={status.id}
                onClick={() => handleStatusClick(status)}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition"
              >
                <div className="relative">
                  <Image
                    src={status.user.profile_picture}
                    alt={status.user.name}
                    width={48}
                    height={48}
                    className={`w-12 h-12 rounded-full object-cover border-2 ${
                      status.isViewed ? 'border-gray-300' : 'border-[var(--accent)]'
                    }`}
                  />
                  {status.type === 'video' && (
                    <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-full p-1">
                      <Video className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{status.user.name}</h3>
                    <span className="text-xs text-gray-500">{getRelativeTime(status.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {status.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{status.views} views</span>
                    {status.isViewed && (
                      <Check className="w-3 h-3 text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Viewer Modal */}
      {selectedStatus && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative h-full flex items-center justify-center">
            {/* Status Content */}
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedStatus.type === 'image' && (
                <Image
                  src={selectedStatus.content}
                  alt="Status"
                  fill
                  className="object-contain"
                />
              )}
              {selectedStatus.type === 'video' && (
                <video
                  src={selectedStatus.content}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              )}
              {selectedStatus.type === 'text' && (
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-full h-full flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <p className="text-2xl font-medium">{selectedStatus.text}</p>
                  </div>
                </div>
              )}
              
              {/* Status Info Overlay */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={selectedStatus.user.profile_picture}
                      alt={selectedStatus.user.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-white">
                      <h3 className="font-medium">{selectedStatus.user.name}</h3>
                      <p className="text-sm opacity-80">{getRelativeTime(selectedStatus.timestamp)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStatus(null)}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Status Text Overlay */}
              {selectedStatus.text && selectedStatus.type !== 'text' && (
                <div className="absolute bottom-20 left-4 right-4">
                  <div className="bg-black bg-opacity-50 text-white p-4 rounded-lg">
                    <p>{selectedStatus.text}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Status Modal */}
      {showAddStatus && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Add Status</h3>
              <button
                onClick={() => setShowAddStatus(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Status Type Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <Camera className="w-5 h-5" />
                  <span>Photo</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <Video className="w-5 h-5" />
                  <span>Video</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <Smile className="w-5 h-5" />
                  <span>Text</span>
                </button>
              </div>

              {/* Status Text Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Status Text</label>
                <textarea
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>

              {/* Privacy Settings */}
              <div>
                <label className="block text-sm font-medium mb-2">Privacy</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="privacy"
                      value="public"
                      checked={statusPrivacy === 'public'}
                      onChange={(e) => setStatusPrivacy(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Everyone</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="privacy"
                      value="contacts"
                      checked={statusPrivacy === 'contacts'}
                      onChange={(e) => setStatusPrivacy(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>My contacts</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="privacy"
                      value="close"
                      checked={statusPrivacy === 'close'}
                      onChange={(e) => setStatusPrivacy(e.target.value as any)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Close friends only</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowAddStatus(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStatus}
                disabled={!statusText.trim()}
                className="flex-1 px-4 py-2 bg-[var(--accent)] text-black rounded-lg hover:bg-[var(--accent)/80] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Menu */}
      {showStatusMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowStatusMenu(false)}>
          <div className="absolute top-16 right-4 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
              Status privacy
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
              Clear all status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update;