"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import {
  Ellipsis,
  Heart,
  MessageCircleDashed,
  Forward,
  Bookmark,
  X,
  SendHorizonal
} from "lucide-react";
import type { Comment as PostComment } from '../../Data';
import Link from "next/link";
import { useAppContext } from '@/context/useAppContext';
import { toast } from "sonner";
import axios from "axios";

export interface PostCardImage {
  id: number | string;
  image: string;
}

export interface PostCardProps {
  user: {
    name: string;
    profileImage: string;
    status?: string;
    userId?: string;
  };
  time: string;
  text: string;
  images: PostCardImage[];
  likeCount: number;
  commentCount: number;
  liked?: boolean;
  bookmarked?: boolean;
  comments: PostComment[];
  id: string; // Added id prop
}

const PostCard: React.FC<PostCardProps> = ({
  user,
  time,
  text,
  images,
  likeCount,
  commentCount,
  liked = false,
  comments,
  bookmarked,
  id,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomImageId, setZoomImageId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [localComments, setLocalComments] = useState<PostComment[]>(comments);
  const [commentInput, setCommentInput] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openReplies, setOpenReplies] = useState<{ [commentId: string]: boolean }>({});

  const { backendUrl, userData,likePost ,bookmark} = useAppContext();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/comment/create`,
        {
          content: commentInput,
          postId: id,
        },
        { withCredentials: true }
      );
      if (response.data.success) {

        const newComment = {
          id: response.data.comment.id,
          user: {
            name: response.data.comment.user.name,
            profilePicture: response.data.comment.user.profilePicture,
          },
          text: response.data.comment.content,
          createdAt: response.data.comment.createdAt,
        };
        setLocalComments((prev) => [...prev, newComment]);
        setCommentInput("");
      } else {
        toast.error(response.data.message || "Failed to post comment");
      }
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReplySubmit = async (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/reply/create`,
        {
          content: commentInput,
          commentId,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        const newReply = {
          id: response.data.reply.id,
          user: {
            name: response.data.reply.user.name,
            profilePicture: response.data.reply.user.profilePicture,
          },
          text: response.data.reply.content,
          createdAt: response.data.reply.createdAt,
        };
        setLocalComments(prev =>
          prev.map(c =>
            c.id === commentId
              ? {
                  ...c,
                  replies: [ ...(c.replies || []), newReply ]
                }
              : c
          )
        );
        setCommentInput("");
        setReplyToId(null);
      } else {
        toast.error(response.data.message || "Failed to post reply");
      }
    } catch (err) {
      toast.error("Failed to post reply");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleImageClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleZoom = (id: string) => {
    setZoomImageId(id);
  };

  const closeZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomImageId(null);
  };

  const handleLike = () => {
    likePost(id);
  };
  const handlebookmark = () => {
    bookmark(id);
  };

  const handleToggleReplies = (commentId: string) => {
    setOpenReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/?post=${id}`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post!',
        url: postUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(postUrl);
      toast.success('Post link copied to clipboard!');
    }
  };

  const zoomedImage = images.find(img => img.id === zoomImageId);

  return (
    <div
      className="flex flex-col items-center p-4 rounde-md w-full"
      style={{
        backgroundColor: "var(--secondary-bg)",
      }}
    >
      {/* The heading section */}
      <div className="flex w-full items-center justify-between border-b-1   dark:border-gray-300 ">
        <div className="flex gap-2 items-center">
          {user.userId ? (
            <Link href={`/${user.userId}`}>
              <div
                className="w-8 h-8 flex justify-center items-center rounded-full p-0.5 hover:opacity-80 transition"
                style={{ backgroundColor: "var(--primary-bg)" }}
              >
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  width={30}
                  height={30}
                  className="object-cover w-full h-full cursor-pointer rounded-full"
                />
              </div>
            </Link>
          ) : (
            <div
              className="w-8 h-8 flex justify-center items-center rounded-full p-0.5"
              style={{ backgroundColor: "var(--primary-bg)" }}
            >
              <Image
                src={user.profileImage}
                alt={user.name}
                width={30}
                height={30}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          )}
          <div className="flex flex-col ">
            {user.userId ? (
              <Link href={`/${user.userId}`}>
                <p className="font-semibold cursor-pointer hover:text-[var(--accent)] transition">{user.name}</p>
              </Link>
            ) : (
              <p className="font-semibold">{user.name}</p>
            )}
            {user.status && <span className="italic text-green-600">{user.status}</span>}
          </div>
        </div>
        <div className="flex gap-2 place-items-start">
          <span className="font-semibold text-sm">{time}</span>
          <div className="relative">
            <Ellipsis
              className="cursor-pointer hover:scale-110 transition ease-in-out duration-300"
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow z-50 flex flex-col">
                <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left">Edit</button>
                <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left">Delete</button>
                <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-red-500">Block</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* text containe */}
      <div className="w-full flex p-2 flex-col justify-start">
        <span
          className={`block cursor-pointer ${expanded ? '' : 'clamp-2'} `}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {text}
        </span>
      </div>
      {/* Image container */}
      <div className="w-full mt-3">
        {images.length === 1 ? (
          <div
            className="relative w-full h-64 cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              src={images[0].image}
              alt="post image"
              fill
              className="object-cover rounded-lg"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            className={`grid gap-2 ${images.length === 2 ? "grid-cols-2" : "grid-cols-2 grid-rows-2"
              }`}
          >
            {images.slice(0, 4).map((img, idx) => (
              <div
                key={img.id}
                className="relative w-full h-40 cursor-pointer"
                onClick={handleImageClick}
              >
                <Image
                  src={img.image}
                  alt="post image"
                  fill
                  className="object-cover rounded-lg"
                  style={{ objectFit: "cover" }}
                />
                {/* Overlay only on the 4th image if there are more than 4 */}
                {idx === 3 && images.length > 4 && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg text-white text-2xl font-bold bg-black/40">
                    +{images.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Modal for image preview */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl max-h-[calc(100vh-120px)] rounded-lg overflow-y-auto flex flex-col items-center justify-center p-2"
            style={{
              backgroundColor: "var(--primary-bg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex flex-col  gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative w-full h-auto max-h-[60vh] min-h-[200px] cursor-zoom-in flex items-center justify-center"
                  onClick={() => handleZoom(img.id.toString())}
                >
                  <Image
                    src={img.image}
                    alt="modal image"
                    fill
                    className="object-contain rounded-lg"
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              ))}
            </div>
            <button
              className="absolute top-2 right-2 p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: "var(--secondary-bg)",
                color: "var(--primary-text)",
              }}
              onClick={closeModal}
            >
              <X size={20} />
            </button>
          </div>
          {/* Zoom overlay */}
          {zoomImageId && zoomedImage && (
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-90"
              onClick={closeZoom}
            >
              <div
                className="relative w-full max-w-3xl max-h-[calc(100vh-120px)] h-[60vh] rounded-lg"
                style={{
                  backgroundColor: "var(--primary-bg)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={zoomedImage.image}
                  alt="zoomed image"
                  fill
                  className="object-contain rounded-lg"
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <button
                  className="absolute top-2 right-2 p-2 rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: "var(--secondary-bg)",
                    color: "var(--primary-text)",
                  }}
                  onClick={closeZoom}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* like comment and share section */}
      <div className="flex justify-between p-2 items-center w-full">
        {/* like and comment */}
        <div className="flex gap-4 w-1/2 items-center">
          <div className="flex flex-col items-center justify-center">
            <button
              className="w-7 h-7 p-1 flex items-center justify-center cursor-pointer rounded-full"
              onClick={handleLike}
            >
              <Heart
                className="cursor-pointer"
                fill={liked ? "red" : "none"}
                stroke={liked ? "red" : "currentColor"}
              />
            </button>
            <span className="text-[9px] md:text-xs">
              {likeCount > 0
                ? `${likeCount} Like${likeCount > 1 ? "s" : ""}`
                : "0 Likes"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className="w-7 h-7 p-1 flex items-center justify-center cursor-pointer rounded-full"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleDashed />
            </button>
            <span className="text-[9px] md:text-xs">
              {commentCount > 0
                ? `${commentCount} Comment${commentCount > 1 ? "s" : ""}`
                : "0 Comment"}
            </span>
          </div>
        </div>
        {/* Save and Share */}
        <div className="flex gap-2 w-1/2 items-center mt-4 justify-end">
          <button className="w-7 h-7 p-1 flex items-center justify-center cursor-pointer rounded-full" onClick={handleShare}>
            <Forward />
          </button>
          <button className="w-7 h-7 p-1 flex items-center justify-center cursor-pointer rounded-full" onClick={handlebookmark}>
            <Bookmark
              fill={bookmarked ? "red" : "none"}
              stroke={bookmarked ? "red" : "currentColor"}
            />
          </button>
        </div>
      </div>
      {showComments && (
        <div className="w-full mt-2 bg-[var(--primary-bg)] rounded-lg p-3 shadow">
          <h4 className="font-semibold mb-2">Comments</h4>
          {localComments.length > 0 ? (
            <ul className="space-y-3">
              {localComments.map((comment) => (
                <li key={comment.id} className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <Image
                      src={comment.user?.profilePicture || "/user.jpg"}
                      alt={comment.user?.name || "Unknown User"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <span className="font-bold">{comment.user?.name || "Unknown User"}</span>
                      <p className="text-sm">{comment?.text}</p>
                      <button
                        className="text-xs text-blue-500 hover:underline mt-1"
                        type="button"
                        onClick={() => {
                          setReplyToId(comment.id);
                          const prefill = `@${comment.user?.name || "Unknown User"} `;
                          setCommentInput(prefill);
                          setTimeout(() => {
                            if (commentInputRef.current) {
                              commentInputRef.current.focus();
                              // Place cursor at the end
                              commentInputRef.current.setSelectionRange(prefill.length, prefill.length);
                            }
                          }, 0);
                        }}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                  {/* Reply input only for this comment */}
                  {replyToId === comment.id && (
                    <form
                      className="flex items-center gap-2 mt-2 ml-10"
                      onSubmit={e => handleReplySubmit(e, comment.id)}
                    >
                      <input
                        ref={commentInputRef}
                        type="text"
                        className="flex-1 rounded-full border px-4 py-2 bg-[var(--primary-bg)] focus:outline-none"
                        placeholder={`Replying to @${comment.user?.name || "Unknown User"}`}
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        disabled={isSubmitting}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : <SendHorizonal size={20}/>}
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-full bg-gray-300 text-black font-semibold hover:opacity-80 transition"
                        onClick={() => {
                          setReplyToId(null);
                          setCommentInput('');
                        }}
                      >
                        <X size={20} />
                      </button>
                    </form>
                  )}
                  <button
                    className="text-xs text-blue-500 hover:underline mt-1 ml-2"
                    type="button"
                    onClick={() => handleToggleReplies(comment.id)}
                  >
                    {openReplies[comment.id] ? "Hide replies" : "Show replies"} {comment.replies?.length}
                  </button>
                  {openReplies[comment.id] && (
                    <div className="ml-10 mt-2">
                      {/* Render replies for this comment here */}
                      {comment.replies && openReplies[comment.id] && (
                        <div className="ml-10 mt-2">
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="flex items-start gap-2 mb-2">
                              <Image
                                src={reply.user?.profilePicture || "/user.jpg"}
                                alt={reply.user?.name || "Unknown User"}
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <div>
                                <span className="font-bold">{reply.user?.name || "Unknown User"}</span>
                                <p className="text-sm">{reply.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {Array.isArray(comment.replies) && comment.replies.length < 1 && (
                        <p className="text-xs text-gray-500">No replies yet.</p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
          {/* Add new comment input if not replying */}
          {replyToId === null && (
         
            <form
              className="flex items-center gap-2 mt-4"
              onSubmit={handleCommentSubmit}
            >
              <input
                ref={commentInputRef}
                type="text"
                className="flex-1 rounded-full border px-4 py-2 bg-[var(--primary-bg)] focus:outline-none"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : <SendHorizonal size={20}/>}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
