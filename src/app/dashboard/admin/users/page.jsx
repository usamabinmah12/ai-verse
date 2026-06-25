import { getUsers } from '@/lib/api/promts';
import React from 'react';
import { Card, Avatar, Chip } from "@heroui/react";
import { At, Person, ShieldKeyhole } from "@gravity-ui/icons";

const AllUser = async () => {
    const users = (await getUsers()) || [];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Container */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-900 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            User Management
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 font-light mt-1">
                            Monitor and manage your application's user directory
                        </p>
                    </div>
                    {/* Total Badge */}
                    <div className="self-start sm:self-center bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-violet-400 backdrop-blur-sm">
                        Total Users: <span className="text-slate-100 font-bold font-mono ml-1">{users.length}</span>
                    </div>
                </div>

                {/* Users Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {users.map((user) => {
                        // রোলের উপর ভিত্তি করে ডাইনামিক কালার নির্ধারণ
                        const isCreator = user.role?.toLowerCase() === 'creator';
                        
                        return (
                            <Card 
                                key={user.id || user.email} 
                                className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px] group"
                            >
                                <Card className="p-5 flex flex-col gap-4">
                                    {/* User Top Info */}
                                    <div className="flex items-center gap-3.5">
                                        <Avatar
                                            src={user.image || undefined}
                                            name={user.name || "User"}
                                            showFallback
                                            fallback={<Person size={20} className="text-slate-400" />}
                                            className="w-12 h-12 text-sm bg-slate-950 border border-slate-800 text-slate-200 shadow-inner shrink-0 group-hover:border-violet-500/40 transition-colors"
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <h3 className="font-bold text-sm sm:text-base text-slate-200 truncate group-hover:text-violet-400 transition-colors">
                                                {user.name || "Anonymous"}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-0.5 truncate">
                                                <At size={12} className="shrink-0" />
                                                <span className="truncate">{user.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-[1px] bg-slate-950 w-full" />

                                    {/* Footer Details */}
                                    <div className="flex items-center justify-between text-xs pt-0.5">
                                        <span className="text-slate-500 flex items-center gap-1">
                                            <ShieldKeyhole size={14} />
                                            Permission
                                        </span>
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            className={`font-semibold capitalize tracking-wide rounded-lg px-2 text-[11px] ${
                                                isCreator 
                                                    ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' 
                                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            }`}
                                        >
                                            {user.role || 'User'}
                                        </Chip>
                                    </div>
                                </Card>
                            </Card>
                        );
                    })}
                </div>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-slate-900 rounded-2xl bg-slate-900/10">
                        <Person size={40} className="text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 font-light text-sm">No users found in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUser;