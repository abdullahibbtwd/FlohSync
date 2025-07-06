"use client"
import React, { useRef, useState } from 'react'
import { Image as ImageIcon, User as UserIcon, X } from 'lucide-react'
import Image from 'next/image'

const MAX_IMAGES = 5;

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [tags, setTags] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files).slice(0, MAX_IMAGES - images.length);
    setImages(prev => [...prev, ...fileArray]);
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImagePreviews(prev => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the data
    console.log({ content, images, tags });
    alert('Post created! (Check console for data)');
    setContent('');
    setImages([]);
    setImagePreviews([]);
    setTags('');
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl bg-[var(--secondary-bg)] rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-2">Create a Post</h2>
        {/* Textarea for post content */}
        <textarea
          className="w-full rounded-lg border px-4 py-2 resize-none bg-[var(--primary-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          rows={4}
          placeholder="What's on your mind?"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        {/* Image selector */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer w-fit px-3 py-2 rounded-full bg-[var(--primary-bg)] hover:bg-[var(--accent)/10] transition">
            <ImageIcon className="w-5 h-5" />
            <span>Select up to 5 images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
              disabled={images.length >= MAX_IMAGES}
            />
          </label>
          {/* Image previews */}
          {imagePreviews.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative w-20 h-20">
                  <Image src={src} alt={`preview-${idx}`} fill className="object-cover rounded-lg" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Tag users */}
        <div className="flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          <input
            type="text"
            className="flex-1 rounded-full border px-4 py-2 bg-[var(--primary-bg)] focus:outline-none"
            placeholder="Tag users (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-6 py-2 rounded-full bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition"
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost
