"use client";

import React from 'react';
import { Card, Button, Avatar, Chip, Progress } from "@heroui/react"; 
import { 
    CloudArrowUpIn, // 💡 সঠিক আইকন নাম 'CloudArrowUpInIn' নয়
    LayoutCellsLarge, 
    CircleCheck, 
    Clock,
    Flame,
    ArrowUpRight,
    FileDollar
} from "@gravity-ui/icons";
import Link from 'next/link';

export default function CreatorDashboard() {
    // 📊 ক্রিয়েটর অ্যানালিটিক্স ডাটা
    const stats = [
        { title: "Total Earnings", value: "$1,245.50", change: "+14.2%", icon: <FileDollar size={20} className="text-emerald-400" />, bg: "from-emerald-500/10 to-transparent" },
        { title: "Prompts Sold", value: "148", change: "+22%", icon: <Flame size={20} className="text-amber-400" />, bg: "from-amber-500/10 to-transparent" },
        { title: "Active Prompts", value: "24", change: "Stable", icon: <CircleCheck size={20} className="text-violet-400" />, bg: "from-violet-500/10 to-transparent" },
        { title: "Pending Review", value: "3", change: "In Queue", icon: <Clock size={20} className="text-cyan-400" />, bg: "from-cyan-500/10 to-transparent" },
    ];

    const recentSales = [
        { id: "tx_1", title: "Cyberpunk Cinematic Avatar", tool: "Midjourney", price: "$4.99", date: "Just now" },
        { id: "tx_2", title: "Hyper-Realistic Living Room", tool: "Stable Diffusion", price: "$8.50", date: "20 mins ago" },
        { id: "tx_3", title: "Minimalist UI Layout Code", tool: "v0 / Claude", price: "$12.00", date: "2 hours ago" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                
                {/* ─── HEADER SECTION ─── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-900">
                    <div className="flex items-center gap-4">
                        <Avatar 
                            name="Creative Mind" 
                            showFallback
                            className="w-14 h-14 bg-slate-900 border border-slate-800 text-slate-200 text-lg shadow-inner ring-2 ring-violet-500/20"
                        />
                        <div>
                            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                                <LayoutCellsLarge size={12} /> Creator Workspace
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent mt-0.5">
                                Welcome back, Creator!
                            </h1>
                        </div>
                    </div>
                    
                    <Link href={"/dashboard/creator/promts/new"} 
                        className="w-full md:w-auto font-bold tracking-wide rounded-xl text-xs h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/15 cursor-pointer flex items-center gap-2 px-5"
                    >
                        <CloudArrowUpIn size={16} /> Submit New Prompt
                    </Link>
                </div>

                {/* ─── STATS GRID ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, i) => (
                        <Card key={i} className="bg-slate-900/40 border border-slate-900 rounded-2xl backdrop-blur-sm shadow-xl hover:border-slate-800 transition-colors">
                            <div className="p-5 flex flex-col gap-3 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-b ${stat.bg} opacity-30 pointer-events-none`} />
                                <div className="flex justify-between items-center relative z-10">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{stat.title}</span>
                                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-850 shadow-inner">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className="flex items-baseline justify-between mt-2 relative z-10">
                                    <span className="text-2xl font-black font-mono tracking-tight text-slate-100">{stat.value}</span>
                                    <span className="text-[10px] font-semibold text-slate-500 font-mono">
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* ─── MAIN CONTENT ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Recent Sales Activity */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-base sm:text-lg font-bold text-slate-200">Recent Prompt Purchases</h2>
                            <span className="text-xs text-violet-400 font-mono cursor-pointer hover:underline flex items-center gap-1">
                                View Analytics <ArrowUpRight size={14} />
                            </span>
                        </div>

                        <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
                            <div className="p-0 divide-y divide-slate-900/60">
                                {recentSales.map((sale) => (
                                    <div key={sale.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-900/10 transition-colors group">
                                        <div className="flex flex-col min-w-0 gap-1">
                                            <h4 className="text-sm font-bold text-slate-200 truncate group-hover:text-violet-400 transition-colors">
                                                {sale.title}
                                            </h4>
                                            <div className="flex items-center gap-2">
                                                <Chip size="sm" variant="flat" className="bg-slate-950 border border-slate-850 rounded text-[10px] px-1 text-slate-400 font-mono">
                                                    {sale.tool}
                                                </Chip>
                                                <span className="text-xs text-slate-500 font-light">{sale.date}</span>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold font-mono text-emerald-400 ml-4">
                                            +{sale.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Target / Creator Tier Progress */}
                    <div className="space-y-4">
                        <h2 className="text-base sm:text-lg font-bold text-slate-200">Creator Milestone</h2>
                        <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl p-5 shadow-xl space-y-5">
                            <div className="flex justify-between items-start">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-bold text-slate-200">Elite Creator Tier</h4>
                                    <p className="text-xs text-slate-400 font-light">Sell 50 more prompts to level up</p>
                                </div>
                                <Chip size="sm" className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase rounded-md tracking-wider">
                                    Level 2
                                </Chip>
                            </div>

                            <Card
                                size="sm"
                                value={74} 
                                maxValue={100}
                                color="secondary"
                                className="w-full"
                                classNames={{
                                    track: "bg-slate-950 border border-slate-900",
                                    indicator: "bg-gradient-to-r from-violet-500 to-indigo-500"
                                }}
                            />

                            <div className="flex justify-between items-center text-xs text-slate-500 pt-1 font-mono">
                                <span>148 / 200 Sales</span>
                                <span className="font-bold text-slate-400">74%</span>
                            </div>

                            <div className="pt-4 border-t border-slate-900/60 text-xs text-slate-500 leading-relaxed font-light">
                                💡 <span className="font-medium text-slate-400">Tip:</span> AI Tools like <span className="text-violet-400 font-medium">Midjourney v6</span> are highly trending this week.
                            </div>
                        </Card>
                    </div>

                </div>

            </div>
        </div>
    );
}