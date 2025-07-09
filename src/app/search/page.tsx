"use client";
import React, { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const MOCK_USERS = [
  { id: 1, name: "Alice", username: "alice" },
  { id: 2, name: "Bob", username: "bob" },
  { id: 3, name: "Charlie", username: "charlie" },
  { id: 4, name: "David", username: "david" },
];

const MOCK_POSTS = [
  { id: 1, title: "My first Floh!", content: "Hello world!" },
  { id: 2, title: "React Tips", content: "Hooks are awesome." },
  { id: 3, title: "Next.js 15 Released", content: "Check out the new features." },
];

function fuzzyMatch(str: string, query: string) {
  // Simple fuzzy: includes or startsWith (case-insensitive)
  const q = query.toLowerCase();
  const s = str.toLowerCase();
  return s.includes(q) || s.startsWith(q);
}

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"users" | "posts" | "videos">("users");
  const [searched, setSearched] = useState(false);
  const router = useRouter();

  const filteredUsers = query
    ? MOCK_USERS.filter(
        (u) =>
          fuzzyMatch(u.name, query) || fuzzyMatch(u.username, query)
      )
    : [];
  const filteredPosts = query
    ? MOCK_POSTS.filter(
        (p) =>
          fuzzyMatch(p.title, query) || fuzzyMatch(p.content, query)
      )
    : [];

  // Suggestions: show if nothing found, or always show below input
  const userSuggestions =
    input && !filteredUsers.length
      ? MOCK_USERS.filter(
          (u) =>
            u.name.toLowerCase().startsWith(input.toLowerCase()) ||
            u.username.toLowerCase().startsWith(input.toLowerCase())
        )
      : [];
  const postSuggestions =
    input && !filteredPosts.length
      ? MOCK_POSTS.filter(
          (p) =>
            p.title.toLowerCase().startsWith(input.toLowerCase()) ||
            p.content.toLowerCase().startsWith(input.toLowerCase())
        )
      : [];

  // After filteredPosts, add this:
  const firstLetter = query ? query[0].toLowerCase() : "";
  const morePosts =
    query && filteredPosts.length > 0
      ? MOCK_POSTS.filter(
          (p) =>
            (p.title[0].toLowerCase() === firstLetter || p.content[0].toLowerCase() === firstLetter) &&
            !filteredPosts.includes(p)
        )
      : [];

  // Add filteredVideos for future use (even if empty for now)
  const filteredVideos = query ? [] : [];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setQuery(input.trim());
    setSearched(true);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="min-h-screen -pt-24 flex flex-col items-center px-4 py-10"
      style={{ background: "var(--primary-bg)", color: "var(--primary-text)" }}
    >
      {/* Back Button */}
      <div className="w-full max-w-lg mb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          style={{ color: "var(--primary-text)" }}
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
      </div>
      <form
        className="w-full max-w-lg flex gap-2 mb-8"
        onSubmit={handleSearch}
        style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--primary-bg)" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search users or posts..."
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          style={{ background: "var(--secondary-bg)", color: "var(--primary-text)" }}
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-colors duration-200"
        >
          <Search size={20}/>
        </button>
      </form>
      <div className="w-full max-w-lg">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 rounded-l-lg font-semibold transition-colors duration-200 ${tab === "users" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => setTab("users")}
          >
            Users{searched ? ` (${filteredUsers.length})` : ""}
          </button>
          <button
            className={`flex-1 py-2 font-semibold transition-colors duration-200 ${tab === "posts" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => setTab("posts")}
          >
            Posts{searched ? ` (${filteredPosts.length})` : ""}
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg font-semibold transition-colors duration-200 ${tab === "videos" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            onClick={() => setTab("videos")}
          >
            Videos{searched ? ` (${filteredVideos.length})` : ""}
          </button>
        </div>
        <div className="rounded-lg p-4" style={{ background: "var(--secondary-bg)" }}>
          {tab === "users" ? (
            searched ? (
              filteredUsers.length > 0 ? (
                <ul>
                  {filteredUsers.map((user) => (
                    <li key={user.id} className="py-2 border-b border-gray-300 last:border-b-0 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-gray-400">@{user.username}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <div className="text-center text-gray-400 mb-2">No users found.</div>
                  {userSuggestions.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Suggestions:</div>
                      <ul>
                        {userSuggestions.map((user) => (
                          <li key={user.id} className="py-1 cursor-pointer hover:underline" onClick={() => { setInput(user.name); setQuery(user.name); setSearched(true); }}>
                            {user.name} <span className="text-gray-400">(@{user.username})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )
            ) : null
          ) : tab === "posts" ? (
            searched ? (
              filteredPosts.length > 0 ? (
                <>
                  <ul>
                    {filteredPosts.map((post) => (
                      <li key={post.id} className="py-2 border-b border-gray-300 last:border-b-0">
                        <div className="font-semibold mb-1">{post.title}</div>
                        <div className="text-sm text-gray-400">{post.content}</div>
                      </li>
                    ))}
                  </ul>
                  {morePosts.length > 0 && (
                    <div className="mt-6">
                      <div className="text-xs text-gray-400 mb-2">More posts starting with &quot;{query[0]}&quot;</div>
                      <ul>
                        {morePosts.map((post) => (
                          <li key={post.id} className="py-2 border-b border-gray-300 last:border-b-0">
                            <div className="font-semibold mb-1">{post.title}</div>
                            <div className="text-sm text-gray-400">{post.content}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-center text-gray-400 mb-2">No posts found.</div>
                  {postSuggestions.length > 0 && (
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Suggestions:</div>
                      <ul>
                        {postSuggestions.map((post) => (
                          <li key={post.id} className="py-1 cursor-pointer hover:underline" onClick={() => { setInput(post.title); setQuery(post.title); setSearched(true); }}>
                            {post.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )
            ) : null
          ) : (
            <div className="text-center text-gray-400 mb-2">No videos found.</div>
          )}
        </div>
      </div>
    </div>
  );
} 