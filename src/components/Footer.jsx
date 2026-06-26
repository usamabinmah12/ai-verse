"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // 💡 framer-motion ইম্পোর্ট করা হয়েছে

export default function Footer() {
  
  // 📝 কোড ক্লিন রাখার জন্য অ্যানিমেশন ভেরিয়েন্টস
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // প্রতিটি কলাম একটির পর একটি আসবে
        delayChildren: 0.1
      }
    }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-900 overflow-hidden pt-16 pb-8 mt-20">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 size-96 bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 size-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 💡 motion.div এবং whileInView ব্যবহার করা হয়েছে যাতে স্ক্রল করে নিচে গেলেই অ্যানিমেশন ট্রিপল হয় */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Top Section: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Identity */}
          <motion.div variants={columnVariants} className="lg:col-span-2 space-y-4">
            <Link href="/" className="text-xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
              AI-VERSE
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Discover, learn, and master advanced engineering with our curated prompt ecosystem. Elevate your AI-driven workflow today.
            </p>
            
            {/* Social Links Badge Setup */}
            <div className="flex gap-3 pt-2">
              {['Twitter', 'GitHub', 'Discord'].map((platform) => (
                <motion.a
                  key={platform}
                  href="#"
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(30, 41, 59, 0.9)", borderColor: "rgba(109, 40, 217, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 1: Explore */}
          <motion.div variants={columnVariants} className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {['All Prompts', 'Midjourney', 'ChatGPT', 'Claude AI'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-violet-400 transition-colors text-xs font-medium block w-fit">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: Platform */}
          <motion.div variants={columnVariants} className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {['Premium Plans', 'Creator Studio', 'API Access', 'Leaderboard'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-violet-400 transition-colors text-xs font-medium block w-fit">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Legal */}
          <motion.div variants={columnVariants} className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-violet-400">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Contact Support'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-violet-400 transition-colors text-xs font-medium block w-fit">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Bottom Section: Copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-slate-500">
            &copy; {new Date().getFullYear()} AI-Verse Inc. All rights reserved.
          </p>
          
          {/* Live Operational Status Indicator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 bg-slate-900/40 border border-slate-850 rounded-xl"
          >
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
              All Systems Operational
            </span>
          </motion.div>
        </div>

      </motion.div>
    </footer>
  );
}