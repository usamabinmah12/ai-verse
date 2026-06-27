"use client";

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Copy, Check } from '@gravity-ui/icons';
import { updateCopy } from '@/lib/actions/update';
import { router } from 'better-auth/api';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function DetailActionArea({isPremiumUser, promptText, promptId }) {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = async () => {
    try {
      
        await navigator.clipboard.writeText(promptText);
        setCopied(true);
        
      
        setTimeout(() => setCopied(false), 2000);
        
        console.log("Prompt id is:", promptId);
        
        
        const response = await updateCopy(promptId);
        
        if (response?.success) {
            toast("Copied to Clipeboard")
            router.refresh(); 
        }

    } catch (err) {
        console.error("Failed to copy or update count:", err);
    }
};
    

    return (
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 flex flex-col">
            {/* Top Bar for Action Area */}
            <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
                <span className="uppercase font-bold tracking-widest text-xs text-violet-400">Plain Prompt Text</span>
                {isPremiumUser  ?  <Button 
                    size="sm" 
                    onClick={handleCopy}
                    className={`h-7 rounded-lg text-xs font-bold px-3.5 flex items-center gap-1.5 transition-all cursor-pointer ${
                        copied 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/15"
                    }`}
                >
                    {copied ? <><Check className="size-3.5" /> Copied!</> : <><Copy className="size-3.5" /> Copy Prompt</>}
                </Button> : 
                <div>
                    For copy <Link href={"/plans"} ><Button variant='primary'>UPGRADE TO PREMIUM </Button></Link>

                </div> }
               
            </div>
            {/* Real Prompt Content Body */}
            <div className="p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap select-all leading-relaxed max-h-[350px] overflow-y-auto bg-slate-950">
              {isPremiumUser ? <div> {promptText}</div> : "You are in Free Mode"} 
            </div>
        </div>
    );
}