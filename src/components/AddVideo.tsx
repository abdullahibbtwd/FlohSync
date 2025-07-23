"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from '../context/useAppContext';
import axios from 'axios';
import { toast } from 'sonner';

export default function App() {
  return (
    <div className=" flex items-center justify-center ">
      <VideoUploadEditor />
    </div>
  );
}

const DUMMY_USERS: string[] = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Kevin",
  "Liam",
  "Mia",
  "Noah",
  "Olivia",
  "Peter",
];

function VideoUploadEditor() {
  const [stage, setStage] = useState<string>("upload");

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>("none");

  const [description, setDescription] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);

  const [tagInput, setTagInput] = useState<string>("");

  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);

  const [userSearchInput, setUserSearchInput] = useState<string>("");

  const [userSearchResults, setUserSearchResults] = useState<string[]>([]);

  const [privacy, setPrivacy] = useState<string>("public"); // 'public', 'flowmates'

  // Ref for the video element to control playback and get duration
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { userData, backendUrl } = useAppContext();

  /**
   * Handles video file selection from the input.
   * Creates a URL for preview and sets initial trim points.
   * @param {Event} event - The file input change event.
   */
  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
      setStage("edit");
      // Reset editing states when a new video is selected
      setFilter("none");
      setDescription("");
      setTags([]);
      setTaggedUsers([]);
      setPrivacy("public");
    } else {
      console.error("Please select a valid video file.");
    }
  };

  useEffect(() => {
    if (videoRef.current && stage === "edit" && videoUrl) {
      const videoElement = videoRef.current as HTMLVideoElement;
      videoElement.onloadedmetadata = () => {
        // setTrimPoints({ start: 0, end: videoElement.duration }); // Removed trim points
      };
      // Play video to load metadata faster in some browsers
      videoElement
        .play()
        .catch((e) => console.log("Video play interrupted:", e));
    }
  }, [videoUrl, stage]);

  /**
   * Handles adding a tag from the input field.
   * @param {Event} e - The keyboard event.
   */
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); // Prevent form submission
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  /**
   * Removes a tag from the list.
   * @param {string} tagToRemove - The tag to remove.
   */
  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  /**
   * Handles user search input and filters dummy users.
   * @param {Event} e - The input change event.
   */
  const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserSearchInput(input);
    if (input.length > 0) {
      setUserSearchResults(
        DUMMY_USERS.filter(
          (user) =>
            user.toLowerCase().includes(input.toLowerCase()) &&
            !taggedUsers.includes(user)
        )
      );
    } else {
      setUserSearchResults([]);
    }
  };

  /**
   * Adds a user to the tagged users list.
   * @param {string} user - The user to tag.
   */
  const tagUser = (user: string) => {
    setTaggedUsers((prev) => [...prev, user]);
    setUserSearchInput("");
    setUserSearchResults([]);
  };

  /**
   * Removes a user from the tagged users list.
   * @param {string} userToRemove - The user to remove.
   */
  const removeTaggedUser = (userToRemove: string) => {
    setTaggedUsers((prev) => prev.filter((user) => user !== userToRemove));
  };


  const handlePost = async () => {
    if (!videoFile) {
      toast.error('No video selected');
      return;
    }
    try {
      // Convert video file to base64
      const videoBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(videoFile);
      });
      const payload = {
        content: description,
        userId: userData?.id,
        video: videoBase64,
        tags: tags,
      };
      await axios.post(
        backendUrl + '/api/post/createvideo',
        payload,
        { withCredentials: true }
      );
      toast.success('Video post created!');

      setStage('upload');
      setVideoFile(null);
      setVideoUrl(null);
      setFilter('none');
      setTags([]);
      setTagInput('');
      setTaggedUsers([]);
      setUserSearchInput('');
      setUserSearchResults([]);
      setPrivacy('public');
      setDescription('');
    } catch (error) {
      console.error("Error in createVideoPost:", error);
      toast.error('Error creating video post');
      console.error(error);
    }
  };

  return (
    <div
      style={{ background: "var(--primary-bg)" }}
      className="relative w-full max-w-4xl rounded-xl shadow-2xl shadow-gray-400/75 overflow-hidden min-h-[600px] flex flex-col"
    >
      {/* Stage 1: Upload Initiation */}
      {stage === "upload" && (
        <div className="flex flex-col items-center justify-center flex-grow p-8">
          <h2
            className="text-3xl font-extrabold mb-6"
            style={{ color: "var(--primary-text)" }}
          >
            Upload FlohVid
          </h2>
          <label
            htmlFor="video-upload-input"
            className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center space-x-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>Upload Video</span>
          </label>
          <input
            id="video-upload-input"
            type="file"
            accept="video/mp4,video/mov,video/webm"
            className="hidden"
            onChange={handleVideoSelect}
          />
          <p
            className="mt-4 text-sm"
            style={{ color: "var(--secondary-text)" }}
          >
            MP4, MOV, WEBM formats supported.
          </p>
        </div>
      )}

      {/* Stage 2: Video Preview and Editing */}
      {stage === "edit" && (
        <div className="flex flex-col flex-grow p-6 md:p-8">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "var(--primary-text)" }}
          >
            Edit Your FLOHSYNC Video
          </h2>


          <div
            className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl mb-6"
            style={{ background: "var(--secondary-bg)" }}
          >
            {videoUrl && (
              <video
                ref={videoRef}
                src={videoUrl ?? undefined}
                controls
                className={`w-full h-full object-contain ${
                  filter === "grayscale" ? "filter grayscale" : ""
                } ${filter === "sepia" ? "filter sepia" : ""} ${
                  filter === "invert" ? "filter invert" : ""
                }`}
                onTimeUpdate={() => {}}
              />
            )}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           
            <div
              className="p-4 rounded-lg shadow-inner"
              style={{ background: "var(--secondary-bg)" }}
            >
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--primary-text)" }}
              >
                Filters
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFilter("none")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    filter === "none"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  None
                </button>
                <button
                  onClick={() => setFilter("grayscale")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    filter === "grayscale"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Grayscale
                </button>
                <button
                  onClick={() => setFilter("sepia")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    filter === "sepia"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Sepia
                </button>
                <button
                  onClick={() => setFilter("invert")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    filter === "invert"
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Invert
                </button>
              </div>
            </div>

            
          </div>

      
          <div className="flex justify-end mt-auto">
            <button
              onClick={() => setStage("upload")}
              className="mr-3 font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
              style={{
                background: "var(--secondary-bg)",
                color: "var(--primary-text)",
              }}
            >
              Back
            </button>
            <button
              onClick={() => setStage("post")}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Stage 3: Post Details Modal */}
      {stage === "post" && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <div
            className="rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            style={{ background: "var(--primary-bg)" }}
          >
            <h2
              className="text-3xl font-extrabold mb-6 text-center"
              style={{ color: "var(--primary-text)" }}
            >
              Finalize Your Post
            </h2>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-semibold mb-2"
                style={{ color: "var(--primary-text)" }}
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 resize-y min-h-[100px]"
                placeholder="What's your video about? Share your thoughts..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  background: "var(--secondary-bg)",
                  color: "var(--primary-text)",
                }}
              />
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label
                htmlFor="tags"
                className="block text-lg font-semibold mb-2"
                style={{ color: "var(--primary-text)" }}
              >
                Tags
              </label>
              <input
                id="tags"
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Add tags (e.g., #FLOHSYNC #Video)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                style={{
                  background: "var(--secondary-bg)",
                  color: "var(--primary-text)",
                }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center text-sm font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "var(--secondary-bg)",
                      color: "var(--primary-text)",
                    }}
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-indigo-400 focus:outline-none"
                      style={{ color: "var(--primary-text)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* User Tagging */}
            <div className="mb-6">
              <label
                htmlFor="user-tagging"
                className="block text-lg font-semibold mb-2"
                style={{ color: "var(--primary-text)" }}
              >
                Tag Users
              </label>
              <div className="relative">
                <input
                  id="user-tagging"
                  type="text"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Search and tag Flowmates..."
                  value={userSearchInput}
                  onChange={handleUserSearchChange}
                  style={{
                    background: "var(--secondary-bg)",
                    color: "var(--primary-text)",
                  }}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {userSearchResults.length > 0 && (
                  <ul
                    className="absolute z-10 w-full border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto"
                    style={{ background: "var(--primary-bg)" }}
                  >
                    {userSearchResults.map((user, index) => (
                      <li
                        key={index}
                        className="p-3 hover:bg-indigo-100 cursor-pointer flex justify-between items-center"
                        style={{ color: "var(--primary-text)" }}
                        onClick={() => tagUser(user)}
                      >
                        {user}
                        <span className="text-green-500 text-sm">Add</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {taggedUsers.map((user, index) => (
                  <span
                    key={index}
                    className="flex items-center text-sm font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "var(--secondary-bg)",
                      color: "var(--primary-text)",
                    }}
                  >
                    @{user}
                    <button
                      onClick={() => removeTaggedUser(user)}
                      className="ml-2 hover:text-blue-400 focus:outline-none"
                      style={{ color: "var(--primary-text)" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div className="mb-8">
              <label
                className="block text-lg font-semibold mb-2"
                style={{ color: "var(--primary-text)" }}
              >
                Privacy
              </label>
              <div className="flex items-center space-x-6">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-green-600"
                    name="privacy"
                    value="public"
                    checked={privacy === "public"}
                    onChange={() => setPrivacy("public")}
                  />
                  <span
                    className="ml-2"
                    style={{ color: "var(--primary-text)" }}
                  >
                    Public
                  </span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-green-600"
                    name="privacy"
                    value="flowmates"
                    checked={privacy === "flowmates"}
                    onChange={() => setPrivacy("flowmates")}
                  />
                  <span
                    className="ml-2"
                    style={{ color: "var(--primary-text)" }}
                  >
                    Flowmates Only
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setStage("edit")}
                className="font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                style={{
                  background: "var(--secondary-bg)",
                  color: "var(--primary-text)",
                }}
              >
                Back
              </button>
              <button
                onClick={handlePost}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
