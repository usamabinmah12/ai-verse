import { getReviews } from '@/lib/api/promts';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import { Card } from '@heroui/react'; // অথবা আপনার প্রজেক্টের কার্ড কম্পোনেন্ট

const MyReviews = async () => {
    const reviews = await getReviews() || [];
    const user = await getUserSession();

    // 💡 ১. নিরাপদ আইডি ফিল্টারিং (দুটোকেই স্ট্রিং-এ রূপান্তর করে ম্যাচ করা)
    const myReviews = reviews.filter(review => 
        review.userId?.toString() === user?.id?.toString() || 
        review.userId?.toString() === user?.id?.toString()
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-slate-950 min-h-screen text-slate-100">
            {/* 📊 Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-900">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-200">
                        My Submitted Reviews
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Manage and view all the feedback you've shared with the community.
                    </p>
                </div>
                {/* Review Count Badge */}
                <span className="self-start sm:self-center px-3 py-1.5 text-xs font-bold bg-slate-900/60 border border-slate-800 text-violet-400 rounded-xl shadow-inner font-mono">
                    Total Reviews: <span className="text-slate-200 ml-1">{myReviews.length}</span>
                </span>
            </div>

            {/* 💬 Reviews Grid/List Area */}
            {myReviews.length === 0 ? (
                /* Empty State */
                <div className="py-16 text-center border border-dashed border-slate-850 rounded-2xl bg-slate-900/10 backdrop-blur-sm">
                    <div className="size-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
                        💬
                    </div>
                    <p className="text-sm text-slate-400 font-medium">You haven't written any reviews yet!</p>
                    <p className="text-xs text-slate-500 mt-1">Your prompt reviews will appear here.</p>
                </div>
            ) : (
                /* Mapping the current logged-in user's reviews */
                <div className="grid grid-cols-1 gap-4">
                    {myReviews.map((rev, index) => (
                        <div 
                            key={rev._id || index} 
                            className="p-5 bg-slate-900/30 border border-slate-850 rounded-2xl hover:border-slate-800/80 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                        >
                            {/* Accent line on hover */}
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex justify-between items-start gap-4 mb-3 pl-1">
                                <div className="space-y-1">
                                    {/* Prompt Name Placeholder (ইউজার কোন প্রম্পটে রিভিউ দিয়েছে তা চেনার জন্য) */}
                                    <span className="text-xs font-bold text-violet-400 uppercase tracking-wider font-mono">
                                        Prompt Review
                                    </span>
                                    {/* আপনি চাইলে এখানে rev.promptTitle থাকলে তা দেখাতে পারেন */}
                                    <h4 className="text-sm font-semibold text-slate-300 group-hover:text-slate-200 transition-colors">
                                        {rev.promptTitle || "AI Prompt Resource"}
                                    </h4>
                                </div>
                                {/* Timestamp */}
                                <span className="text-[10px] text-slate-500 font-mono bg-slate-950/60 px-2 py-1 rounded-md border border-slate-900">
                                    {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : "Just now"}
                                </span>
                            </div>
                            
                            {/* Actual Review Text Content */}
                            <div className="p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    "{rev.review}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyReviews;