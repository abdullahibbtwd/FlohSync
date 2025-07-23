"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
interface UserData {
  username: string;
  id:string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profilePicture: string;
  coverPicture: string;
  joinedDate:string;
  followers: any[] | number;
  following: any[] | number;
  followersCount?: number;
  followingCount?: number;
  post:number;
}
interface PostData {
  id: string;
  user: {
    name: string;
    profilePicture: string;
    id: string;
    bookmark:boolean;
  };
  content: string;
  contentImage: { id: string; image: string }[];
  image?: string[]; 
  likes: number;
  likedBy: string[];
 
  comments: {
    id: string;
    content: string;
    user: { name: string; profilePicture: string };
    createdAt: string;
    replies?: {
      id: string;
      content: string;
      user: { name: string; profilePicture: string };
      createdAt: string;
    }[];
  }[];
  createdAt: string;
  video: string;
  liked: boolean; // Added liked property
  bookmarked: boolean; // Added bookmarked property
}
interface UserToFollow {
  id: string;
  name: string;
  username: string;
  profile_picture: string;
  location: string;
  bio: string;
  joinedDate: string;
  followers: number;
  following: number;
  posts: number;
  relation_status: string;
}

interface AppContextProps {
  user: string | null;
  setUser: (user: string | null) => void;
  isDark: boolean;
  toggleTheme: () => void;
  router: ReturnType<typeof useRouter>;
  userData: UserData | null;
  getUserData: () => Promise<void>;
  backendUrl: string;
  usersToFollow: UserToFollow[];
  getUsersToFollow: () => Promise<void>;
  posts: PostData[];
  getPosts: () => Promise<void>;
  likedPosts: string[];
  setLikedPosts: (posts: string[]) => void;
  bookmark: (postId: string) => void;
  likePost: (postId: string) => void;
  bookmarkedPosts: string[];
  setBookmarkedPosts: (posts: string[]) => void;
  addVideoComment: (postId: string, content: string) => Promise<any>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [usersToFollow, setUsersToFollow] = useState<UserToFollow[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (storedTheme === null && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true,
      });
      console.log(response.data); // Should show { success: true, userData: { ... } }

      if (response.data.success) {
        setUserData(response.data.userData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  const likePost = async (postId: string) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/like/get-like",
        { postId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? {
                  ...post,
                  likes: response.data.likeCount,
                  liked: response.data.liked,
                }
              : post
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };
  const bookmark = async (postId: string) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/bookmark/add",
        { postId },
        { withCredentials: true }
      );
      if (response.data.success) {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? { ...post, bookmarked: response.data.bookmark }
              : post
          )
        );
        if (response.data.success) {
          toast.success(response.data.bookmark ? "Post bookmarked!" : "Bookmark removed!");
        }
        setBookmarkedPosts(prevBookmarked =>
          response.data.bookmark
            ? [...prevBookmarked, postId]
            : prevBookmarked.filter(id => id !== postId)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to bookmark post");
    }
  };
  const getUsersToFollow = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/userToFollow", {
        withCredentials: true,
      });
      console.log('Users to follow:', response.data);

      if (response.data.success) {
        setUsersToFollow(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const getPosts = async () => {

  try {
    const response = await axios.get(backendUrl + "/api/post/get-posts", {
      withCredentials: true,
    });
    if (response.data.success) {
      setPosts(response.data.posts.slice().reverse());
      setBookmarkedPosts(response.data.bookmarkedPostIds); // <-- add this
      console.log(response.data.posts);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error in getPosts:", error);
  }
};

  const addVideoComment = async (postId: string, content: string) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/comment/create',
        { postId, content },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success('Comment added!');
        return response.data.comment;
      } else {
        toast.error(response.data.message || 'Failed to add comment');
      }
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  useEffect(() => {
    getUserData();
    getUsersToFollow();
    getPosts();
  }, []); // Fetch user data and users to follow on component mount
  const value = {
    user,
    setUser,
    isDark,
    toggleTheme,
    router,
    getUserData,
    backendUrl,
    userData,
    usersToFollow,
    getUsersToFollow,
    posts,
    getPosts,
    likedPosts,
    setLikedPosts,
    likePost,
    bookmark,
    bookmarkedPosts,
    setBookmarkedPosts,
    addVideoComment
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
