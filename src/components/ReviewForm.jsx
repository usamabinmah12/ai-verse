"use client";

import { createReview } from '@/lib/api/review';
import React, { useState } from 'react';

const ReviewForm = ({userId , promptId}) => {
    console.log("Id is : ", userId)
    const [reviewText, setReviewText] = useState("");
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        const reviewData = {
            userId: userId,         // প্রপ্স থেকে আসা ইউজার আইডি
            promptId: promptId,     // প্রপ্স থেকে আসা প্রম্পট আইডি
            review: reviewText,     // টেক্সট এরিয়া থেকে আসা মেসেজ
            createdAt: new Date()   // অপশনাল: সাবমিটের সময় ট্র্যাক করার জন্য
        };
        console.log("review data" , reviewData);
        await createReview(reviewData , promptId);

    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-slate-900/20 border border-slate-800/60 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="mb-4 text-left">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                    Submit Your Review
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                    Share your experience using this structured prompt.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                    <textarea
                        rows="4"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your feedback here..."
                        className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all duration-200尊 resize-none font-mono"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/15 cursor-pointer transition-all active:scale-[0.98]"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;