

import React from 'react';
import { Card, Button, Avatar, Chip } from "@heroui/react";
import { 
    Bookmark, 
    ShoppingBag, 
    Gear, 
    CircleCheck, 
    ArrowUpRight,
    Compass,
    Copy,
    Key
} from "@gravity-ui/icons";
import { getUserSession } from '@/lib/core/session';
import { toast } from 'react-toastify';

export default async function UserPage() {
    
    const user = await getUserSession();
    const userProfile = {
        name: user?.name,
        email: user?.email,
        joinedDate: "Joined November 2025",
        tier: user?.plan,
    };

    const savedPrompts = [
        { id: "p1", title: "Hyper-Realistic Interior Design Renderer", tool: "Midjourney", price: "Free" },
        { id: "p2", title: "Minimalist UI Layout Code", tool: "v0 / Claude", price: "$12.00" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 space-y-8">
                
                {/* ─── USER HERO SECTION ─── */}
                <Card className="bg-gradient-to-br from-slate-900/60 to-slate-900/20 border border-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <Avatar 
                                name={userProfile.name}
                                showFallback
                                className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-950 border-2 border-indigo-500/30 text-slate-205 text-xl sm:text-2xl shadow-2xl"
                            />
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h1 className="text-xl sm:text-2xl font-black text-slate-100">{userProfile.name}</h1>
                                    <Chip size="sm" className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase rounded-md tracking-wider">
                                        {userProfile.tier}
                                    </Chip>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-400 font-light">{userProfile.email}</p>
                                <p className="text-[11px] font-mono text-slate-500">{userProfile.joinedDate}</p>
                            </div>
                        </div>
                        
                        {/* <div className="flex gap-3 w-full sm:w-auto">
                            <Button size="sm" variant="flat" className="bg-slate-950 border border-slate-850 text-slate-300 font-medium rounded-xl flex-1 sm:flex-none">
                                <Gear size={16} /> Edit Profile
                            </Button>
                        </div> */}
                    </div>
                </Card>

                {/* ─── MAIN CONTENT SPLIT ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left 2 Columns: Saved/Purchased Prompts */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-base sm:text-lg font-bold text-slate-200 flex items-center gap-2">
                                    <Bookmark size={18} className="text-indigo-400" /> Bookmarked Prompts
                                </h2>
                                <Button size="sm" variant="light" className="text-xs text-indigo-400 font-semibold p-0 hover:underline">
                                    Explore More <Compass size={14} />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {savedPrompts.map((prompt) => (
                                    <Card key={prompt.id} className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-2xl p-5 shadow-xl transition-all group">
                                        <div className="flex flex-col h-full justify-between gap-4">
                                            <div className="space-y-1.5">
                                                <Chip size="sm" variant="flat" className="bg-slate-950 border border-slate-850 text-[10px] text-slate-400 font-mono rounded px-1">
                                                    {prompt.tool}
                                                </Chip>
                                                <h3 className="font-bold text-sm text-slate-200 group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                    {prompt.title}
                                                </h3>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-slate-950">
                                                <span className="text-xs font-mono font-bold text-slate-400">{prompt.price}</span>
                                                <Button size="sm" isIconOnly variant="light" className="text-slate-400 hover:text-indigo-400 rounded-lg">
                                                    <Copy size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right 1 Column: Quick Actions & Stats */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-base sm:text-lg font-bold text-slate-200 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-cyan-400" /> Quick Stats
                            </h2>
                            <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl p-5 shadow-xl space-y-4">
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-xs text-slate-400">Prompts Purchased</span>
                                    <span className="text-sm font-bold font-mono text-cyan-400">12</span>
                                </div>
                                <div className="h-[1px] bg-slate-900" />
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-xs text-slate-400">API Generation Calls</span>
                                    <span className="text-sm font-bold font-mono text-indigo-400">340 / 500</span>
                                </div>
                                <div className="h-[1px] bg-slate-900" />
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-xs text-slate-400">Account Status</span>
                                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                                        <CircleCheck size={14} /> Verified
                                    </span>
                                </div>
                            </Card>
                        </div>

                        {/* Subscription Info Banner */}
                        <Card className="bg-gradient-to-r from-indigo-950/40 to-slate-900/40 border border-indigo-900/30 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-3 text-indigo-500/20 group-hover:text-indigo-500/30 transition-colors">
                                <Key size={40} />
                            </div>
                            <h4 className="text-sm font-bold text-slate-200">Need more power?</h4>
                            <p className="text-xs text-slate-400 font-light mt-1 leading-relaxed">
                                Upgrade to <span className="text-indigo-400 font-medium">Creator Plus</span> to start selling your own prompts and get unlimited access.
                            </p>
                            <Button size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/10 cursor-pointer">
                                Upgrade Plan <ArrowUpRight size={14} />
                            </Button>
                        </Card>
                    </div>

                </div>

            </div>
        </div>
    );
}