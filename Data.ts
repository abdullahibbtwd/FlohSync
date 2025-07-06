export interface Comment {
  id: string;
  user: {
    name: string;
    profileImage: string;
  };
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  user: {
    name: string;
    profileImage: string;
  };
  content: string;
  contentImage?: { id: string; image: string }[];
  likes: number;
  likedBy: string[];
  comments: Comment[];
  createdAt: string;
}

export const posts: Post[] = [
  {
    id: "1",
    user: {
      name: "Alice Smith",
      profileImage: "https://picsum.photos/id/237/200/300",
    },
    content: "Enjoying a sunny day at the park! ☀️",
    contentImage: [
      { id: "1-0", image: "https://picsum.photos/id/1018/600/400" },
      { id: "1-1", image: "https://picsum.photos/id/1018/600/400" },
    ],
    likes: 12,
    likedBy: ["Bob", "Charlie", "Diana"],
    comments: [
      {
        id: "c1",
        user: {
          name: "Bob Johnson",
          profileImage: "https://picsum.photos/id/237/200/300",
        },
        text: "Looks beautiful! Have fun!",
        createdAt: "2024-06-01T10:15:00Z",
      },
      {
        id: "c2",
        user: {
          name: "Charlie Lee",
          profileImage: "https://picsum.photos/id/238/200/300",
        },
        text: "Wish I was there!",
        createdAt: "2024-06-01T10:20:00Z",
      },
    ],
    createdAt: "2025-07-04T10:00:00Z",
  },
  {
    id: "2",
    user: {
      name: "Diana Prince",
      profileImage: "https://picsum.photos/id/237/200/300",
    },
    content: "Just finished a new painting! 🎨",
    contentImage: [
      { id: "2-0", image: "https://picsum.photos/id/1039/600/400" },
      { id: "2-1", image: "https://picsum.photos/id/1024/600/400" },
    ],
    likes: 34,
    likedBy: ["Alice", "Bob"],
    comments: [
      {
        id: "c3",
        user: {
          name: "Alice Smith",
          profileImage: "https://picsum.photos/id/239/200/300",
        },
        text: "Amazing work, Diana!",
        createdAt: "2024-06-02T14:05:00Z",
      },
    ],
    createdAt: "2024-06-02T14:00:00Z",
  },
  {
    id: "3",
    user: {
      name: "Charlie Lee",
      profileImage: "https://picsum.photos/id/237/200/300",
    },
    content: "Had a great time hiking in the mountains.",
    contentImage: [
      { id: "3-0", image: "https://picsum.photos/id/1024/600/400" },
      { id: "3-1", image: "https://picsum.photos/id/1039/600/400" },
    ],
    likes: 20,
    likedBy: ["Diana", "Alice"],
    comments: [],
    createdAt: "2024-06-03T09:30:00Z",
  },
];

export interface VideoComment {
  id: string;
  user: {
    name: string;
    profileImage: string;
  };
  text: string;
  createdAt: string;
}

export interface VideoData {
  id: string;
  username: string;
  description: string;
  time: string;
  music: string;
  videoUrl: string;
  likes: number;
  comments: number;
  shares: number;
  commentList: VideoComment[];
}

export const videos: VideoData[] = [
  {
    id: "v1",
    username: "creative_coder",
    description: "Check out this amazing React animation tutorial! #coding #webdev",
    time: "2 hours ago",
    music: "Original Sound - Developer Vibes",
    videoUrl: "/test.mp4",
    likes: 1542,
    comments: 243,
    shares: 87,
    commentList: [
      {
        id: "vc1",
        user: {
          name: "Alice Smith",
          profileImage: "https://picsum.photos/id/237/200/300",
        },
        text: "Awesome tutorial! Learned a lot.",
        createdAt: "2024-06-10T10:15:00Z",
      },
      {
        id: "vc2",
        user: {
          name: "Bob Johnson",
          profileImage: "https://picsum.photos/id/238/200/300",
        },
        text: "Can you do a video on Redux next?",
        createdAt: "2024-06-10T11:00:00Z",
      },
    ],
  },
  {
    id: "v2",
    username: "frontend_guru",
    description: "CSS Grid vs Flexbox: Which one do you use more? #css #frontend",
    time: "5 hours ago",
    music: "Trending Sound - CSS Tricks",
    videoUrl: "/test1.mp4",
    likes: 980,
    comments: 120,
    shares: 45,
    commentList: [
      {
        id: "vc3",
        user: {
          name: "Charlie Lee",
          profileImage: "https://picsum.photos/id/239/200/300",
        },
        text: "Grid for layouts, Flexbox for components!",
        createdAt: "2024-06-10T12:30:00Z",
      },
      {
        id: "vc4",
        user: {
          name: "Diana Prince",
          profileImage: "https://picsum.photos/id/240/200/300",
        },
        text: "Great explanation, thanks!",
        createdAt: "2024-06-10T13:00:00Z",
      },
    ],
  },
  {
    id: "v3",
    username: "js_ninja",
    description: "Async/Await made easy! #javascript #tips",
    time: "1 day ago",
    music: "Original Sound - JS Ninja",
    videoUrl: "/test.mp4",
    likes: 2100,
    comments: 300,
    shares: 120,
    commentList: [
      {
        id: "vc5",
        user: {
          name: "Eve Adams",
          profileImage: "https://picsum.photos/id/241/200/300",
        },
        text: "This clarified async for me, thanks!",
        createdAt: "2024-06-09T09:00:00Z",
      },
      {
        id: "vc6",
        user: {
          name: "Frank Miller",
          profileImage: "https://picsum.photos/id/242/200/300",
        },
        text: "Can you show error handling next time?",
        createdAt: "2024-06-09T10:00:00Z",
      },
    ],
  },
];
