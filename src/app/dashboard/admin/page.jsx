import React from 'react';
import {  Card, Button, Avatar, Chip } from "@heroui/react";
import { 
    Person, 
     ChartTreemap, 
    LayoutCellsLarge, 
    CircleCheck, 
    CircleExclamation, 
    ArrowUpRight,
    Gear
} from "@gravity-ui/icons";
import { getPromt, getReviews, getSubscriptions, getUsers } from '@/lib/api/promts';

const AdminDashboard = async() => {
    
    const user = await getUsers();
    const userlen = user.length;
    const review = await getReviews();
    const reviewLen = review.length
     let promts = (await getPromt()) || [];
      promts = promts.filter((promt) => promt.status === "Approved");
      const promtLen = promts.length
    const subscriptions = await getSubscriptions();
    const money = subscriptions.length * 5;
    const stats = [
        { title: "Total Users", value: userlen, change: "+12%", icon: <Person size={22} className="text-violet-400" />, bg: "from-violet-500/10 to-transparent" },
        { title: "Approved Prompts", value: promtLen, change: "+28%", icon: <CircleCheck size={22} className="text-emerald-400" />, bg: "from-emerald-500/10 to-transparent" },
        { title: "Total Reviews", value: reviewLen, change: "-5%", icon: <CircleExclamation size={22} className="text-amber-400" />, bg: "from-amber-500/10 to-transparent" },
        { title: "Total Earnings", value: money, change: "+18%", icon: <ChartTreemap size={22} className="text-indigo-400" />, bg: "from-indigo-500/10 to-transparent" },
    ];

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
                    {/* <div className="flex gap-3 w-full sm:w-auto">
                        <Button size="sm" variant="flat" className="bg-slate-900 border border-slate-800 text-slate-300 font-medium rounded-xl flex-1 sm:flex-none">
                            <Gear size={16} /> Settings
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-600/15 flex-1 sm:flex-none">
                            Generate Report
                        </Button>
                    </div> */}
                </div>

                {/* ─── STATISTICS CARDS ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, i) => (
                        <Card key={i} className="bg-slate-900/30 border border-slate-900 rounded-2xl backdrop-blur-sm shadow-xl">
                            <Card className="p-5 flex flex-col gap-3 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-b ${stat.bg} opacity-40 pointer-events-none`} />
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
                        </Card>
                    ))}
                </div>

                {/* ─── MAIN CONTENT GRID ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Recent Activity Table (Left 2 Columns) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-200">Recent System Activity</h2>
                            <Button size="sm" variant="light" className="text-xs text-violet-400 font-semibold p-0 hover:underline">
                                View All <ArrowUpRight size={14} />
                            </Button>
                        </div>
                        
                        <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
                            <Card className="p-0 overflow-x-auto">
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
                                            <tr key={activity.id} className="hover:bg-slate-900/20 transition-colors group">
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
                            </Card>
                        </Card>
                    </div>

                    {/* Quick Overview Panel (Right 1 Column) */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-200">System Status Overview</h2>
                        <Card className="bg-slate-900/20 border border-slate-900 rounded-2xl p-5 shadow-xl space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-slate-400">
                                    <span>Server Load</span>
                                    <span className="text-violet-450 font-bold font-mono">34%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                                    <div className="h-full w-[34%] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-slate-400">
                                    <span>Database Storage</span>
                                    <span className="text-cyan-400 font-bold font-mono">68%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                                    <div className="h-full w-[68%] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                                </div>
                            </div>

                            <div className="pt-2 text-xs font-light text-slate-500 leading-relaxed border-t border-slate-900/60">
                                💡 <span className="font-semibold text-slate-400">Pro-Tip:</span> You have <span className="text-amber-400 font-medium">42 prompt submission requests</span> awaiting your approval. Keep the platform active!
                            </div>
                        </Card>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;