"use client";

import React from 'react';
import { Card, Avatar, Chip, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { 
    Person, 
    ChartTreemap, 
    CircleCheck, 
    CircleExclamation, 
    ArrowUpRight 
} from "@gravity-ui/icons";

// অ্যানিমেশন কনফিগ
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 25 } }
};

export default function AdminDashboardClient({ data, recentActivities }) {
    const { userlen, reviewLen, approvedPromtLen, totalPromptsCount, money } = data;

    const stats = [
        { title: "Total Users", value: userlen, change: "+12%", icon: <Person size={22} className="text-violet-400" />, bg: "from-violet-500/10 to-transparent" },
        { title: "Approved Prompts", value: approvedPromtLen, change: "+28%", icon: <CircleCheck size={22} className="text-emerald-400" />, bg: "from-emerald-500/10 to-transparent" },
        { title: "Total Reviews", value: reviewLen, change: "-5%", icon: <CircleExclamation size={22} className="text-amber-400" />, bg: "from-amber-500/10 to-transparent" },
        { title: "Total Earnings", value: `$${money}`, change: "+18%", icon: <ChartTreemap size={22} className="text-indigo-400" />, bg: "from-indigo-500/10 to-transparent" },
    ];

    // এনালাইটিক্স গ্রাফের হাইট ক্যালকুলেশন মেকানিজম (ম্যাক্সিমাম ভ্যালুর রেশিও অনুযায়ী)
    const maxVal = Math.max(userlen, totalPromptsCount, reviewLen, 10);
    const chartBars = [
        { label: "Users", value: userlen, color: "bg-violet-500 shadow-violet-500/20" },
        { label: "Prompts (All)", value: totalPromptsCount, color: "bg-blue-500 shadow-blue-500/20" },
        { label: "Approved", value: approvedPromtLen, color: "bg-emerald-500 shadow-emerald-500/20" },
        { label: "Reviews", value: reviewLen, color: "bg-amber-500 shadow-amber-500/20" },
    ];

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* ─── STATISTICS CARDS WITH STAGGERED FADE-IN ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <motion.div key={i} variants={itemVariants} whileHover={{ y: -4, scale: 1.01 }}>
                        <Card className="bg-slate-900/40 border border-slate-900/85 rounded-2xl backdrop-blur-sm p-5 flex flex-col gap-3 relative overflow-hidden shadow-2xl">
                            <div className={`absolute inset-0 bg-gradient-to-b ${stat.bg} opacity-30 pointer-events-none`} />
                            <div className="flex justify-between items-center relative z-10">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.title}</span>
                                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 shadow-inner">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2 mt-2 relative z-10">
                                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-100">{stat.value}</span>
                                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                                    stat.change.startsWith('+') ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                                }`}>
                                    {stat.change}
                                </span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* ─── INTERACTIVE ANALYTICS & MAIN CONTENT GRID ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 📊 LEFT & CENTER: DYNAMIC ANALYTICS & ACTIVITY */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Visual Analytics Bar Chart */}
                    <motion.div variants={itemVariants}>
                        <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 shadow-xl">
                            <h3 className="text-base font-bold text-slate-200 mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping"/> Platform Distribution Analytics
                            </h3>
                            
                            <div className="flex items-end justify-between gap-4 h-48 pt-4 px-2 border-b border-slate-900">
                                {chartBars.map((bar, idx) => {
                                    const percentage = (bar.value / maxVal) * 100;
                                    return (
                                        <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                                            {/* Tooltip on hover */}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 border border-slate-800 rounded-md px-2 py-1 text-xs font-mono font-bold text-slate-200 mb-2 shadow-xl">
                                                {bar.value}
                                            </div>
                                            {/* Animated Bar */}
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.max(percentage, 8)}%` }}
                                                transition={{ duration: 1, ease: "circOut", delay: idx * 0.1 }}
                                                className={`w-full max-w-[50px] sm:max-w-[70px] ${bar.color} rounded-t-lg relative shadow-lg`}
                                            />
                                            <span className="text-[10px] sm:text-xs font-medium text-slate-400 mt-3 text-center truncate w-full">
                                                {bar.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Recent Activity Table */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-200">Recent System Activity</h2>
                            <Button size="sm" variant="light" className="text-xs text-violet-400 font-semibold p-0 hover:underline">
                                View All <ArrowUpRight size={14} />
                            </Button>
                        </div>
                        
                        <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden shadow-xl p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[500px]">
                                    <thead>
                                        <tr className="border-b border-slate-900 bg-slate-950/40 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                            <th className="p-4 pl-6">User</th>
                                            <th className="p-4">Action</th>
                                            <th className="p-4">Time</th>
                                            <th className="p-4 pr-6 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-900/60 text-sm font-light text-slate-300">
                                        {recentActivities.map((activity) => (
                                            <tr key={activity.id} className="hover:bg-slate-900/10 transition-colors group">
                                                <td className="p-4 pl-6 flex items-center gap-3">
                                                    <Avatar name={activity.user} size="sm" className="bg-slate-950 border border-slate-800 text-xs" />
                                                    <span className="font-semibold text-slate-200 group-hover:text-violet-400 transition-colors">{activity.user}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span>{activity.action}</span>{" "}
                                                    <span className="text-xs font-mono px-1.5 py-0.5 bg-slate-950 border border-slate-850 rounded text-slate-400">{activity.target}</span>
                                                </td>
                                                <td className="p-4 text-xs text-slate-500">{activity.time}</td>
                                                <td className="p-4 pr-6 text-right">
                                                    <Chip 
                                                        size="sm" 
                                                        variant="flat" 
                                                        className={`text-[10px] font-bold rounded-md ${
                                                            activity.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' :
                                                            activity.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                                                        }`}
                                                    >
                                                        {activity.status}
                                                    </Chip>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* ⚡ RIGHT SIDE: QUICK OVERVIEW PANEL */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className="text-lg font-bold text-slate-200">System Status Overview</h2>
                    <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl p-5 shadow-xl space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-slate-400">
                                <span>Server Load</span>
                                <span className="text-violet-450 font-bold font-mono">34%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: "34%" }} 
                                    transition={{ duration: 0.8, ease: "easeOut" }} 
                                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-slate-400">
                                <span>Database Storage</span>
                                <span className="text-cyan-400 font-bold font-mono">68%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: "68%" }} 
                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} 
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
                                />
                            </div>
                        </div>

                        <div className="pt-2 text-xs font-light text-slate-500 leading-relaxed border-t border-slate-900/60">
                            💡 <span className="font-semibold text-slate-400">Pro-Tip:</span> You have <span className="text-amber-400 font-medium">42 prompt submission requests</span> awaiting your approval. Keep the platform active!
                        </div>
                    </Card>
                </motion.div>

            </div>
        </motion.div>
    );
}