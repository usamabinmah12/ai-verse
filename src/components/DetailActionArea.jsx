"use client";

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Copy, Check } from '@gravity-ui/icons';

export default function DetailActionArea({ promptText, promptId }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promptText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            
            // অপশনাল: আপনি চাইলে এখানে ব্যাকএন্ডে ফায়ার করে ডাটাবেজের `copyCount` ১ বাড়িয়ে নিতে পারেন
            // await fetch(`http://localhost:5000/api/promts/copy/${promptId}`, { method: 'PATCH' });
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    return (
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 flex flex-col">
            {/* Top Bar for Action Area */}
            <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
                <span className="uppercase font-bold tracking-widest text-xs text-violet-400">Plain Prompt Text</span>
                <Button 
                    size="sm" 
                    onClick={handleCopy}
                    className={`h-7 rounded-lg text-xs font-bold px-3.5 flex items-center gap-1.5 transition-all cursor-pointer ${
                        copied 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/15"
                    }`}
                >
                    {copied ? <><Check className="size-3.5" /> Copied!</> : <><Copy className="size-3.5" /> Copy Prompt</>}
                </Button>
            </div>
            {/* Real Prompt Content Body */}
            <div className="p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap select-all leading-relaxed max-h-[350px] overflow-y-auto bg-slate-950">
                {promptText}
            </div>
        </div>
    );
}