import { getPromt } from '@/lib/api/promts';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import PromtTable from './PromtTable';

const MyPromt = async () => {
    let promts = await getPromt() || [];
    const user = await getUserSession();
    const id = user?.id;

    console.log('id is:', id);

    // শুধুমাত্র বর্তমান user's prompts রাখবে
    promts = promts.filter(promt => promt.promtId === id);

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8 my-6 text-slate-100">
            {/* Page Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black tracking-tight text-violet-400">My AI Prompts</h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">Manage, edit, or track the stats of your submitted prompts.</p>
                </div>
            </div>

            {/* HeroUI / NextUI Style Modern Table */}
            <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
                {promts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <th className="p-4 pl-6">Prompt info</th>
                                    <th className="p-4">AI Tool</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Usage</th>
                                    <th className="p-4 pr-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50 text-sm">
                                {promts.map((promt) => (
                                    <PromtTable
                                        key={promt._id}
                                        promt={promt}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-2">
                        <p className="text-sm text-slate-400 font-medium">You have no Prompt Available</p>
                        <p className="text-xs text-slate-500">Click on create prompt to add your first shortcut!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyPromt;