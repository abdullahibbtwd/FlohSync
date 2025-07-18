export interface Comment {
  id: string;
  user: {
    name: string;
    profilePicture: string;
  };
  text: string;
  createdAt: string;
  replies?: Comment[];
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

// export const posts: Post[] = [
//   {
//     id: "1",
//     user: {
//       name: "Alice Smith",
//       profileImage: "https://picsum.photos/id/237/200/300",
//     },
//     content: "Enjoying a sunny day at the park! ☀️",
//     contentImage: [
//       { id: "1-0", image: "https://picsum.photos/id/1018/600/400" },
//       { id: "1-1", image: "https://picsum.photos/id/1018/600/400" },
//     ],
//     likes: 12,
//     likedBy: ["Bob", "Charlie", "Diana"],
//     comments: [
//       {
//         id: "c1",
//         user: {
//           name: "Bob Johnson",
//           profileImage: "https://picsum.photos/id/237/200/300",
//         },
//         text: "Looks beautiful! Have fun!",
//         createdAt: "2024-06-01T10:15:00Z",
//       },
//       {
//         id: "c2",
//         user: {
//           name: "Charlie Lee",
//           profileImage: "https://picsum.photos/id/238/200/300",
//         },
//         text: "Wish I was there!",
//         createdAt: "2024-06-01T10:20:00Z",
//       },
//     ],
//     createdAt: "2025-07-04T10:00:00Z",
//   },
//   {
//     id: "2",
//     user: {
//       name: "Diana Prince",
//       profileImage: "https://picsum.photos/id/237/200/300",
//     },
//     content: "Just finished a new painting! 🎨",
//     contentImage: [
//       { id: "2-0", image: "https://picsum.photos/id/1039/600/400" },
//       { id: "2-1", image: "https://picsum.photos/id/1024/600/400" },
//     ],
//     likes: 34,
//     likedBy: ["Alice", "Bob"],
//     comments: [
//       {
//         id: "c3",
//         user: {
//           name: "Alice Smith",
//           profileImage: "https://picsum.photos/id/239/200/300",
//         },
//         text: "Amazing work, Diana!",
//         createdAt: "2024-06-02T14:05:00Z",
//       },
//     ],
//     createdAt: "2024-06-02T14:00:00Z",
//   },
//   {
//     id: "3",
//     user: {
//       name: "Charlie Lee",
//       profileImage: "https://picsum.photos/id/237/200/300",
//     },
//     content: "Had a great time hiking in the mountains.",
//     contentImage: [
//       { id: "3-0", image: "https://picsum.photos/id/1024/600/400" },
//       { id: "3-1", image: "https://picsum.photos/id/1039/600/400" },
//     ],
//     likes: 20,
//     likedBy: ["Diana", "Alice"],
//     comments: [],
//     createdAt: "2024-06-03T09:30:00Z",
//   },
// ];

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


export const users = {
  "current_user_id": "user0",
  "users": [
    {
      "user_id": "user0",
      "name": "Alex Johnson",
      "username": "alex_j",
      "phone_number": "+15551234567",
      "location": "New York, USA",
      "profile_picture": "https://picsum.photos/id/1/200/200",
      "followers": ["user1", "user3", "user5", "user6"],
      "following": ["user1", "user2", "user5"],
      "posts": [
        {
          "post_id": "post0_1",
          "content": "Enjoying the NYC sunset! 🌇",
          "image": "https://picsum.photos/id/2/600/400",
          "video": null,
          "timestamp": "2025-07-01T19:30:00Z"
        },
        {
          "post_id": "post0_2",
          "content": "Check out my new vlog! #travel #nyc",
          "image": null,
          "video": {
            "id": "v0_1",
            "videoUrl": "/test.mp4",
            "music": "Original Sound - Alex Johnson",
            "likes": 342,
            "comments": 45,
            "shares": 12,
            "time": "1 day ago"
          },
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
      "profile_picture": "https://picsum.photos/id/3/200/200",
      "followers": ["user0", "user2", "user4"],
      "following": ["user0", "user2", "user3"],
      "posts": [
        {
          "post_id": "post1_1",
          "content": "Exploring Camden Market today!",
          "image": "https://picsum.photos/id/4/600/400",
          "video": null,
          "timestamp": "2025-07-02T12:45:00Z"
        },
        {
          "post_id": "post1_2",
          "content": "London street art tour! #art #london",
          "image": null,
          "video": {
            "id": "v1_1",
            "videoUrl": "/test1.mp4",
            "music": "Trending Sound - London Vibes",
            "likes": 567,
            "comments": 89,
            "shares": 23,
            "time": "3 hours ago"
          },
          "timestamp": "2025-07-05T10:30:00Z"
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
      "profile_picture": "https://picsum.photos/id/5/200/200",
      "followers": ["user0", "user1", "user4", "user6"],
      "following": ["user1", "user3"],
      "posts": [
        {
          "post_id": "post2_1",
          "content": "Sushi making class!",
          "image": "https://picsum.photos/id/6/600/400",
          "video": null,
          "timestamp": "2025-06-28T11:20:00Z"
        },
        {
          "post_id": "post2_2",
          "content": "Shinjuku night walk #tokyo #nightlife",
          "image": null,
          "video": {
            "id": "v2_1",
            "videoUrl": "/test.mp4",
            "music": "Original Sound - Tokyo Nights",
            "likes": 892,
            "comments": 156,
            "shares": 67,
            "time": "5 hours ago"
          },
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
      "profile_picture": "https://picsum.photos/id/7/200/200",
      "followers": ["user0", "user1", "user2", "user5"],
      "following": ["user0"],
      "posts": [
        {
          "post_id": "post3_1",
          "content": "Beach day! ☀️",
          "image": "https://picsum.photos/id/8/600/400",
          "video": null,
          "timestamp": "2025-07-05T13:10:00Z"
        },
        {
          "post_id": "post3_2",
          "content": "Miami sunset vibes 🌅 #miami #sunset",
          "image": null,
          "video": {
            "id": "v3_1",
            "videoUrl": "/test1.mp4",
            "music": "Trending Sound - Miami Sunset",
            "likes": 1234,
            "comments": 234,
            "shares": 89,
            "time": "2 hours ago"
          },
          "timestamp": "2025-07-06T18:20:00Z"
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
      "profile_picture": "https://picsum.photos/id/9/200/200",
      "followers": ["user1", "user2"],
      "following": ["user1", "user2"],
      "posts": [
        {
          "post_id": "post4_1",
          "content": "Gyeongbokgung Palace visit",
          "image": "https://picsum.photos/id/10/600/400",
          "video": null,
          "timestamp": "2025-06-30T09:30:00Z"
        },
        {
          "post_id": "post4_2",
          "content": "Korean street food tour! #seoul #food",
          "image": null,
          "video": {
            "id": "v4_1",
            "videoUrl": "/test.mp4",
            "music": "Original Sound - Seoul Food",
            "likes": 756,
            "comments": 123,
            "shares": 45,
            "time": "1 day ago"
          },
          "timestamp": "2025-07-04T12:15:00Z"
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
      "profile_picture": "https://picsum.photos/id/11/200/200",
      "followers": ["user0", "user3"],
      "following": ["user0", "user3"],
      "posts": [
        {
          "post_id": "post5_1",
          "content": "Street food adventure!",
          "image": "https://picsum.photos/id/12/600/400",
          "video": null,
          "timestamp": "2025-07-02T18:00:00Z"
        },
        {
          "post_id": "post5_2",
          "content": "Diwali preparations #diwali #festival",
          "image": null,
          "video": {
            "id": "v5_1",
            "videoUrl": "/test1.mp4",
            "music": "Traditional Sound - Diwali Celebrations",
            "likes": 1890,
            "comments": 345,
            "shares": 178,
            "time": "4 hours ago"
          },
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
      "profile_picture": "https://picsum.photos/id/13/200/200",
      "followers": ["user0"],
      "following": ["user0", "user2"],
      "posts": [
        {
          "post_id": "post6_1",
          "content": "Opera House view!",
          "image": "https://picsum.photos/id/14/600/400",
          "video": null,
          "timestamp": "2025-07-01T10:15:00Z"
        },
        {
          "post_id": "post6_2",
          "content": "Sydney Harbour Bridge climb! #sydney #adventure",
          "image": null,
          "video": {
            "id": "v6_1",
            "videoUrl": "/test.mp4",
            "music": "Original Sound - Sydney Adventure",
            "likes": 654,
            "comments": 98,
            "shares": 34,
            "time": "6 hours ago"
          },
          "timestamp": "2025-07-05T14:30:00Z"
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
      "profile_picture": "https://picsum.photos/id/15/200/200",
      "followers": ["user8", "user9"],
      "following": ["user8", "user9"],
      "posts": [
        {
          "post_id": "post7_1",
          "content": "Eiffel Tower lunch",
          "image": "https://picsum.photos/id/16/600/400",
          "video": null,
          "timestamp": "2025-06-29T12:30:00Z"
        },
        {
          "post_id": "post7_2",
          "content": "Paris fashion week highlights! #paris #fashion",
          "image": null,
          "video": {
            "id": "v7_1",
            "videoUrl": "/test1.mp4",
            "music": "Trending Sound - Paris Fashion",
            "likes": 2341,
            "comments": 456,
            "shares": 234,
            "time": "1 day ago"
          },
          "timestamp": "2025-07-03T15:45:00Z"
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
      "profile_picture": "https://picsum.photos/id/17/200/200",
      "followers": ["user7", "user9"],
      "following": ["user7", "user9"],
      "posts": [
        {
          "post_id": "post8_1",
          "content": "Carnival preparations!",
          "image": "https://picsum.photos/id/18/600/400",
          "video": null,
          "timestamp": "2025-07-03T11:40:00Z"
        },
        {
          "post_id": "post8_2",
          "content": "Samba dance tutorial! #carnival #samba",
          "image": null,
          "video": {
            "id": "v8_1",
            "videoUrl": "/test.mp4",
            "music": "Traditional Sound - Samba Rhythms",
            "likes": 987,
            "comments": 167,
            "shares": 89,
            "time": "3 hours ago"
          },
          "timestamp": "2025-07-06T19:20:00Z"
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
      "profile_picture": "https://picsum.photos/id/19/200/200",
      "followers": ["user7"],
      "following": ["user7", "user8"],
      "posts": [
        {
          "post_id": "post9_1",
          "content": "Desert safari adventure",
          "image": null,
          "video": {
            "id": "v9_1",
            "videoUrl": "/test1.mp4",
            "music": "Original Sound - Desert Adventure",
            "likes": 1456,
            "comments": 289,
            "shares": 156,
            "time": "2 days ago"
          },
          "timestamp": "2025-07-04T09:20:00Z"
        },
        {
          "post_id": "post9_2",
          "content": "Burj Khalifa sunset view #dubai #sunset",
          "image": null,
          "video": {
            "id": "v9_2",
            "videoUrl": "/test.mp4",
            "music": "Trending Sound - Dubai Nights",
            "likes": 2134,
            "comments": 423,
            "shares": 234,
            "time": "5 hours ago"
          },
          "timestamp": "2025-07-07T18:45:00Z"
        }
      ],
      "relation_status": "not_connected"
    },
  ],
};