"use client";

import { useState } from "react";
import { ArrowUpToLine, FileText, Sparkles, Layers, Sliders, Eye } from "@gravity-ui/icons";

export default function AddPromptPage() {
    // Form States
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        aiTool: "",
        tags: "",
        difficulty: "Beginner", 
        visibility: "Public",   
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    // Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Image Selection & Preview Handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUploadError(null);

        if (file) {
            // Simple 5MB Validation
            if (file.size > 5 * 1024 * 1024) {
                setUploadError("File size exceeds 5MB limit");
                return;
            }
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // ImgBB Image Upload Function
    const uploadImageToImgBB = async (file) => {
        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
        if (!IMGBB_API_KEY) {
            console.error("ImgBB API Key is missing inside environment variables!");
            return null;
        }

        const imageData = new FormData();
        imageData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: imageData
            });
            const data = await response.json();
            
            if (data.success) {
                return data.data.url; // আসল ইমেজ সিডিএন লিঙ্ক
            } else {
                setUploadError("Upload failed. Try again.");
                return null;
            }
        } catch (err) {
            setUploadError("Network error during image upload");
            return null;
        }
    };

    // Form Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setUploadError(null);

        let thumbnailUrl = "";

        // ইমেজ সিলেক্ট করা থাকলে প্রথমে ImgBB তে আপলোড হবে
        if (selectedFile) {
            const uploadedUrl = await uploadImageToImgBB(selectedFile);
            if (uploadedUrl) {
                thumbnailUrl = uploadedUrl;
            } else {
                setLoading(false);
                return;
            }
        }

        // ফাইনাল ডাটা অবজেক্ট
        const promptSubmissionData = {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            category: formData.category,
            aiTool: formData.aiTool,
            tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean), 
            difficulty: formData.difficulty,
            visibility: formData.visibility,
            thumbnail: thumbnailUrl, 
            copyCount: 0,            
            status: "pending",       
        };

        console.log("Final Prompt Payload for Server:", promptSubmissionData);
        
        // এখানে আপনার ব্যাকএন্ড ফেচ (Fetch API) রিকোয়েস্টটি অন করতে পারেন
        alert("Prompt successfully created! (Check console for data object)");

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 my-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm text-zinc-900 dark:text-zinc-100">
            <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-500">
                    <Sparkles className="size-6" /> Create New AI Prompt
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Share your high-quality AI prompt with the community. Newly submitted prompts will be marked as <span className="text-amber-500 font-semibold">pending</span> until approved by an admin.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Prompt Title */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Prompt Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Ultimate SEO Article Generator"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    />
                </div>

                {/* 2. Prompt Description */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Prompt Description</label>
                    <textarea
                        name="description"
                        required
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain what this prompt does and its use case..."
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none"
                    />
                </div>

                {/* 3. Prompt Content */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-1">
                        <FileText className="size-4" /> Prompt Content
                    </label>
                    <textarea
                        name="content"
                        required
                        rows="6"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Act as an expert copywriter... [Paste your exact prompt here]"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>

                {/* 2 Column Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 flex items-center gap-1">
                            <Layers className="size-4" /> Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g., Marketing, Coding, Writing"
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                        />
                    </div>

                    {/* AI Tool */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">AI Tool Name</label>
                        <input
                            type="text"
                            name="aiTool"
                            required
                            value={formData.aiTool}
                            onChange={handleChange}
                            placeholder="e.g., ChatGPT, Midjourney, Claude"
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                        />
                    </div>
                </div>

                {/* 4. Tags */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        required
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Separate with commas (e.g., seo, copywriting, blog)"
                        className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    />
                </div>

                {/* 2 Column Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Difficulty Level */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 flex items-center gap-1">
                            <Sliders className="size-4" /> Difficulty Level
                        </label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm cursor-pointer"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Pro">Pro</option>
                        </select>
                    </div>

                    {/* Visibility */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 flex items-center gap-1">
                            <Eye className="size-4" /> Visibility
                        </label>
                        <select
                            name="visibility"
                            value={formData.visibility}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm cursor-pointer"
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private (Premium)</option>
                        </select>
                    </div>
                </div>

                {/* 5. Thumbnail Image Upload via ImgBB */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Thumbnail Image</label>
                    <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-500 transition-colors rounded-2xl p-6 flex flex-col items-center justify-center relative cursor-pointer group bg-zinc-50 dark:bg-zinc-800/50">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {imagePreview ? (
                            <div className="w-full flex flex-col items-center gap-3">
                                <img
                                    src={imagePreview}
                                    alt="Thumbnail preview"
                                    className="max-h-48 rounded-lg object-cover shadow-sm"
                                />
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Click or drag to replace image</p>
                            </div>
                        ) : (
                            <div className="text-center flex flex-col items-center gap-2">
                                <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 group-hover:scale-105 transition-transform">
                                    <ArrowUpToLine className="size-6 text-zinc-500 dark:text-zinc-400" />
                                </div>
                                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                                    <span className="text-blue-600 dark:text-blue-500 font-medium">Click to upload</span> or drag and drop
                                </div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">PNG, JPG, WEBP up to 5MB</p>
                            </div>
                        )}
                    </div>
                    {uploadError && (
                        <p className="text-xs text-red-500 mt-2 font-medium">{uploadError}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {loading ? "Uploading & Submitting..." : "Submit Prompt"}
                    </button>
                </div>

            </form>
        </div>
    );
}