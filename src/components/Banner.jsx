"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Code, User, Star, Flame } from 'lucide-react';
import Image from 'next/image';
import logo from '../../assets/logo.jpg';
import { motion } from 'framer-motion'; // 💡 motion ইম্পোর্ট করা হয়েছে

const Banner = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const trendingTags = [
    "SEO Optimize", 
    "React Component", 
    "Copywriter", 
    "Midjourney V6", 
    "Gemini Code Helper", 
    "Claude Architect"
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  // 📝 অ্যানিমেশন ভেরিয়েন্টস (Clean Code-এর জন্য)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const floatingVariants = (delay = 0) => ({
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay
      }
    }
  });

  return (
    // 💡 section-কে motion.section করা হয়েছে
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-[85vh] w-full bg-slate-950 overflow-hidden flex items-center justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Neon Glow Mesh Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Layout Grid Column: Text Content & Input Controls */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Top Feature Accent Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium tracking-wide">
            <Image
              src={logo}
              width={24}
              height={24}
              alt="PromptVerse Logo"
              className="rounded-lg object-cover"
            />     
            <span>The Ultimate Prompt Hub</span>
          </motion.div>

          {/* Heading Typographic Stack */}
          <div className="space-y-4">
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Unlock the True Potential of{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Generative AI
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
              Discover, bookmark, and run engineering-grade prompts for ChatGPT, Gemini, Claude, and Midjourney. Boost your programmatic productivity today.
            </motion.p>
          </div>

          {/* Prompt Search Input Field Container */}
          <motion.form variants={itemVariants} onSubmit={handleSearchSubmit} className="max-w-xl space-y-4">
            <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-2xl focus-within:border-violet-500/50 transition-all duration-300">
              {/* <div className="flex items-center flex-1 pl-3 gap-2">
                <Search className="text-slate-500 w-5 h-5 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by title, tag, or AI tool (e.g. 'React', 'Gemini')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-0 text-slate-100 placeholder-slate-500 w-full focus:outline-none focus:ring-0 text-sm h-10"
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm tracking-wide rounded-xl px-6 h-11 transition-all flex-shrink-0 cursor-pointer"
              >
                Explore
              </motion.button> */}
            </div>

            {/* Sub-Input Trending Meta Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mr-1">Trending:</span>
              {trendingTags.map((tag, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagClick(tag)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-200 cursor-pointer"
                >
                  #{tag}
                </motion.button>
              ))}
            </div>
          </motion.form>

          {/* Navigation Action Buttons Route triggers */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/promts')}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium text-sm hover:opacity-95 transition-all shadow-lg shadow-violet-600/20 rounded-xl px-6 h-12 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Prompts</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "rgba(30, 41, 59, 1)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/auth/signup')}
              className="border border-slate-800 bg-slate-900/40 text-slate-300 text-sm font-medium rounded-xl px-6 h-12 transition-all cursor-pointer"
            >
              Become a Creator
            </motion.button>
          </motion.div>

        </div>

        {/* Right Layout Grid Column: Structural UI Card Artifact Preview */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 relative hidden lg:flex justify-center items-center"
        >
          <div className="w-[420px] h-[340px] bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-3xl p-6 border border-slate-800 relative shadow-2xl backdrop-blur-sm">
            
            {/* Overlay Elements 1: Code Window Preview Panel (Floating) */}
            <motion.div 
              variants={floatingVariants(0)}
              animate="animate"
              className="absolute top-6 -left-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl max-w-[280px] space-y-2 z-20"
            >
              <div className="flex items-center gap-2">
                <Code className="text-emerald-400 w-4 h-4" />
                <span className="text-xs text-slate-400 font-mono">system_prompt.json</span>
              </div>
              <p className="text-xs text-slate-300 font-mono line-clamp-3">
                "Act as an expert software architect specializing in complex multi-role Next.js setups..."
              </p>
            </motion.div>

            {/* Overlay Elements 2: Creator Floating Statistics Badge (Floating with Delay) */}
            <motion.div 
              variants={floatingVariants(0.5)} // 💡 একটু ডিলে দেওয়া হয়েছে যাতে অপোজিট রিদমে ভাসে
              animate="animate"
              className="absolute bottom-10 -right-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl max-w-[240px] space-y-3 z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500 flex items-center justify-center">
                  <User className="text-violet-400 w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Alex Rivers</h4>
                  <p className="text-[10px] text-slate-500">Top Rated Creator</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400 bg-slate-950/80 p-2 rounded-lg gap-4">
                <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-amber-500" /> 2.4k Copies</span>
                <span className="text-emerald-400 flex items-center gap-0.5"><Star className="w-3 h-3 fill-current" /> 4.9</span>
              </div>
            </motion.div>

            {/* Inner Graphic Grid Anchor */}
            <div className="w-full h-full border border-dashed border-slate-800/60 rounded-2xl flex flex-col justify-center items-center text-center p-4">
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 text-slate-600 mb-2 font-mono text-sm">
                {"✨"}
              </div>
              <span className="text-xs font-mono text-slate-600">Marketplace Ecosystem View</span>
            </div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Banner;