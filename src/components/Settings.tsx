"use client"
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Moon, 
  Sun, 
  Eye, 
  EyeOff, 
  Camera, 
  Edit3, 
  Save, 
  X,
  LogOut,
  Trash2,
  Download,
  Lock,
  Globe,
  Smartphone,
  Mail,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';
import Image from 'next/image';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    posts: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessages: 'everyone',
    showLastSeen: true
  });
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Living life one post at a time ✨',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, NY'
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profileData);
  };

  const handleDeleteAccount = () => {
    // Here you would typically call delete account API
    console.log('Account deletion requested');
    setShowDeleteModal(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--secondary-bg)] border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-[var(--secondary-bg)] border-r border-gray-200 dark:border-gray-700 min-h-screen p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-[var(--accent)] text-black'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-black rounded-lg hover:bg-[var(--accent)/80] transition"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Picture */}
              <div className="bg-[var(--secondary-bg)] rounded-lg p-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Image
                      src="https://picsum.photos/id/1005/150/150"
                      alt="Profile"
                      width={100}
                      height={100}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-[var(--accent)] p-2 rounded-full hover:bg-[var(--accent)/80] transition">
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Profile Picture</h3>
                    <p className="text-sm ">
                      Upload a new profile picture
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="bg-[var(--secondary-bg)] rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--primary-bg)] disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--primary-bg)] disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--primary-bg)] disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--primary-bg)] disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--primary-bg)] disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-[var(--primary-bg)] disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-2xl font-bold">Privacy Settings</h2>
              
              <div className="bg-[var(--secondary-bg)] rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="public"
                        checked={privacy.profileVisibility === 'public'}
                        onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-medium">Public</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Anyone can see your profile</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="followers"
                        checked={privacy.profileVisibility === 'followers'}
                        onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-medium">Followers Only</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Only your followers can see your profile</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value="private"
                        checked={privacy.profileVisibility === 'private'}
                        onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-medium">Private</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Only you can see your profile</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Online Status</h3>
                  <label className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show Online Status</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Let others see when you're online</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.showOnlineStatus}
                      onChange={(e) => setPrivacy({...privacy, showOnlineStatus: e.target.checked})}
                      className="w-5 h-5"
                    />
                  </label>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Messages</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="allowMessages"
                        value="everyone"
                        checked={privacy.allowMessages === 'everyone'}
                        onChange={(e) => setPrivacy({...privacy, allowMessages: e.target.value})}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-medium">Everyone</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Anyone can send you messages</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="allowMessages"
                        value="followers"
                        checked={privacy.allowMessages === 'followers'}
                        onChange={(e) => setPrivacy({...privacy, allowMessages: e.target.value})}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-medium">Followers Only</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Only your followers can message you</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-2xl font-bold">Notification Settings</h2>
              
              <div className="bg-[var(--secondary-bg)] rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Likes</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">When someone likes your posts</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.likes}
                        onChange={(e) => setNotifications({...notifications, likes: e.target.checked})}
                        className="w-5 h-5"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Comments</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">When someone comments on your posts</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.comments}
                        onChange={(e) => setNotifications({...notifications, comments: e.target.checked})}
                        className="w-5 h-5"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5" />
                        <div>
                          <div className="font-medium">New Followers</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">When someone follows you</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.follows}
                        onChange={(e) => setNotifications({...notifications, follows: e.target.checked})}
                        className="w-5 h-5"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Messages</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">When someone sends you a message</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.messages}
                        onChange={(e) => setNotifications({...notifications, messages: e.target.checked})}
                        className="w-5 h-5"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Sound & Vibration</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Sound</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Play sound for notifications</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Vibration</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Vibrate for notifications</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-2xl font-bold">Appearance</h2>
              
              <div className="bg-[var(--secondary-bg)] rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Theme</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={!darkMode}
                        onChange={() => setDarkMode(false)}
                        className="w-4 h-4"
                      />
                      <div className="flex items-center gap-2">
                        <Sun className="w-5 h-5" />
                        <span>Light Mode</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={darkMode}
                        onChange={() => setDarkMode(true)}
                        className="w-4 h-4"
                      />
                      <div className="flex items-center gap-2">
                        <Moon className="w-5 h-5" />
                        <span>Dark Mode</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="theme"
                        value="auto"
                        className="w-4 h-4"
                      />
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        <span>System Default</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Font Size</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fontSize"
                        value="small"
                        className="w-4 h-4"
                      />
                      <span>Small</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fontSize"
                        value="medium"
                        defaultChecked
                        className="w-4 h-4"
                      />
                      <span>Medium</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fontSize"
                        value="large"
                        className="w-4 h-4"
                      />
                      <span>Large</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="max-w-2xl space-y-6">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              
              <div className="bg-[var(--secondary-bg)] rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
                  <div className="space-y-4">
                    <button className="flex items-center justify-between w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Download Data</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Get a copy of your data</div>
                        </div>
                      </div>
                    </button>
                    
                    <button className="flex items-center justify-between w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Privacy Policy</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Read our privacy policy</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                  <div className="space-y-4">
                    <button className="flex items-center justify-between w-full p-4 border border-red-200 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition text-red-600 dark:text-red-400">
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Log Out</div>
                          <div className="text-sm">Sign out of your account</div>
                        </div>
                      </div>
                    </button>
                    
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center justify-between w-full p-4 border border-red-200 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition text-red-600 dark:text-red-400"
                    >
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Delete Account</div>
                          <div className="text-sm">Permanently delete your account</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Delete Account</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;