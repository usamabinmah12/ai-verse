import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowLeft, House, Compass } from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 🌌 Background Futuristic Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[350px] sm:size-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 size-72 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center max-w-md mx-auto space-y-6">
        
        {/* 🔢 Neon 404 Badge */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono text-xs font-black tracking-widest uppercase animate-pulse">
          Error Code: 404
        </div>

        {/* 🛸 Large Decorative 404 Text */}
        <h1 className="text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-slate-100 via-slate-300 to-slate-600 bg-clip-text text-transparent select-none drop-shadow-2xl">
          404
        </h1>

        {/* 📑 Error Message */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-200 tracking-tight">
            Lost in the AI-Verse?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            The page you are looking for might have been moved, deleted, or never existed in this dimension.
          </p>
        </div>

        {/* 🛠️ Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          
          {/* Go Back Button (Uses browser history) */}
          <Link href="/dashboard" >
            <Button
              as="a"
              variant="bordered"
              size="md"
              className="w-full sm:w-auto rounded-xl h-11 px-5 text-xs font-bold border-slate-800 text-slate-300 hover:bg-slate-900/60 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="size-4" /> Go Back
            </Button>
          </Link>

          {/* Return Home Button */}
          <Link href="/" >
            <Button
              as="a"
              variant="solid"
              size="md"
              className="w-full sm:w-auto rounded-xl h-11 px-6 text-xs font-bold tracking-wide shadow-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
            >
              <House className="size-4" /> Return Home
            </Button>
          </Link>
          
        </div>

        {/* 🧭 Helpful Suggestion */}
        <div className="pt-8 border-t border-slate-900/60 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Compass className="size-3.5 text-slate-600" />
          <span>Need help? Try checking our <Link href="/promts" className="text-violet-400/80 hover:text-violet-400 underline transition-colors">Prompt Marketplace</Link></span>
        </div>

      </div>
    </div>
  );
}