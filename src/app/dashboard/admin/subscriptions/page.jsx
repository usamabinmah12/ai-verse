import { getSubscriptions } from '@/lib/api/promts';
import React from 'react';
import { CreditCard, Person, Calendar, Envelope } from '@gravity-ui/icons';

const page = async () => {
    // Fetch subscriptions from your API/Database
    const subscriptions = await getSubscriptions() || [];

    // Simple analytical calculations
    const totalSubs = subscriptions.length;
    const proSubs = subscriptions.filter((sub) => sub.planId === "user_pro").length;

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 my-6 text-slate-100">
            
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-black tracking-tight text-violet-400 flex items-center gap-2">
                    <CreditCard className="size-6 text-violet-400" /> Payment & Subscriptions
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-light">
                    Monitor user billing plans, active subscriptions, and transaction history.
                </p>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-xl backdrop-blur-sm flex items-center gap-4">
                    <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                        <Person className="size-5 text-violet-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Subscriptions</p>
                        <p className="text-2xl font-bold mt-0.5">{totalSubs}</p>
                    </div>
                </div>

                <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-xl backdrop-blur-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <CreditCard className="size-5 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Pro Users</p>
                        <p className="text-2xl font-bold text-emerald-400 mt-0.5">{proSubs}</p>
                    </div>
                </div>
            </div>

            {/* Subscriptions Table Section */}
            <div className="bg-slate-900/30 border border-slate-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="p-5 border-b border-slate-800/80 bg-slate-900/20">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">Transaction History</h2>
                </div>

                {totalSubs === 0 ? (
                    <div className="p-10 text-center text-sm text-slate-500">
                        No subscription history found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/40 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <th className="p-4">Subscription ID</th>
                                    <th className="p-4">User Email</th>
                                    <th className="p-4">Plan</th>
                                    <th className="p-4">Purchase Date</th>
                                    <th className="p-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm">
                                {subscriptions.map((sub) => (
                                    <tr key={sub._id} className="hover:bg-slate-800/20 transition-colors duration-150">
                                        {/* ID */}
                                        <td className="p-4 font-mono text-xs text-slate-400">
                                            #{sub._id.toString().substring(0, 8)}...
                                        </td>
                                        
                                        {/* Email */}
                                        <td className="p-4 font-medium text-slate-200">
                                            <div className="flex items-center gap-2">
                                                <Envelope className="size-3.5 text-slate-500" />
                                                {sub.email}
                                            </div>
                                        </td>
                                        
                                        {/* Plan Name */}
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                                                sub.planId === 'user_pro' 
                                                ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' 
                                                : 'bg-slate-800 text-slate-300'
                                            }`}>
                                                {sub.planId === 'user_pro' ? 'PRO PLAN' : sub.planId}
                                            </span>
                                        </td>
                                        
                                        {/* Created At */}
                                        <td className="p-4 text-xs text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5 text-slate-500" />
                                                {new Date(sub.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>

                                        {/* Status Tag */}
                                        <td className="p-4 text-right">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;