import React from 'react';
import { LayoutCellsLarge } from "@gravity-ui/icons";
import { getPromt, getReviews, getSubscriptions, getUsers } from '@/lib/api/promts';
import AdminDashboardClient from "./AdminDashboardClient"; // 💡 নতুন ক্লায়েন্ট ভিউয়ার কন্টেনার

const AdminDashboard = async() => {
    // ─── DATA FETCHING (SERVER SIDE) ───
    const user = await getUsers() || [];
    const userlen = user.length;
    
    const review = await getReviews() || [];
    const reviewLen = review.length;
    
    let promtsResponse = (await getPromt()) || [];
    let promts = Array.isArray(promtsResponse) ? promtsResponse : (promtsResponse.data || []);
    // টোটাল সাবমিশন ও অ্যাপ্রুভড প্রম্পটের ডাটা আলাদা করা হলো অ্যানালিটিক্সের জন্য
    const totalPromptsCount = promts.length;
    const approvedPrompts = promts.filter((promt) => promt.status === "Approved");
    const approvedPromtLen = approvedPrompts.length;
    
    const subscriptions = await getSubscriptions() || [];
    const money = subscriptions.length * 5;

    // ক্লায়েন্ট অ্যানালিটিক্স কম্পোনেন্টে পাঠানোর জন্য ডাটা প্যাকিং
    const serverData = {
        userlen,
        reviewLen,
        approvedPromtLen,
        totalPromptsCount,
        money
    };

    // রিয়েল-টাইম ফিল দেওয়ার জন্য কিছু লাইভ অ্যাক্টিভিটি ডেটা
    const recentActivities = [
        { id: 1, user: "Anik Rahman", action: "Submitted a new prompt", target: "Cyberpunk Avatar Generator", time: "2 mins ago", status: "Pending" },
        { id: 2, user: "Sultana Kemal", action: "Upgraded plan", target: "Creator Pro", time: "15 mins ago", status: "Success" },
        { id: 3, user: "Rakib Hasan", action: "Reported an issue", target: "API Timeout Error", time: "1 hour ago", status: "Failed" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* ─── HEADER SECTION ─── */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-900">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-widest">
                            <LayoutCellsLarge size={14} /> Core Control Panel
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mt-1">
                            Admin Dashboard
                        </h1>
                    </div>
                </div>

                {/* ─── CLIENT RE-RENDER WITH FRAMER MOTION ─── */}
                <AdminDashboardClient data={serverData} recentActivities={recentActivities} />

            </div>
        </div>
    );
};

export default AdminDashboard;