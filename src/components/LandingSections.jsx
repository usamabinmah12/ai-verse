"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// --- DUMMY DATA FOR DYNAMIC SECTIONS ---
const topCreators = [
  { id: 1, name: "Alex Nova", role: "Prompt Engineer", prompts: 142, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", rank: "👑 #1" },
  { id: 2, name: "Sarah Connor", role: "GPT Specialist", prompts: 98, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", rank: "⭐ #2" },
  { id: 3, name: "David K.", role: "Midjourney Wizard", prompts: 87, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", rank: "⚡ #3" },
  { id: 4, name: "Elena Rostova", role: "Claude Expert", prompts: 64, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80", rank: "🔥 #4" },
];

const reviews = [
  { id: 1, user: "Rahat Chowdhury", role: "Full Stack Developer", comment: "The ChatGPT prompts here reduced my boilerplate coding time by almost 40%. Absolutely game-changing!", rating: 5 },
  { id: 2, user: "Jessica V.", role: "UI/UX Designer", comment: "Midjourney v6 prompt structures from AI-VERSE are breathtaking. Dynamic aspect ratios parameters work flawlessly.", rating: 5 },
  { id: 3, user: "Tanvir Ahmed", role: "AI Researcher", comment: "Engineering-grade prompts with proper system instructions. Saved me days of trial and error.", rating: 4 },
];

const stats = [
  { number: "500K+", label: "Prompts Copied" },
  { number: "15K+", label: "Active Engineers" },
  { number: "99.2%", label: "Success Rate" },
  { number: "24/7", label: "API Uptime" },
];

// --- ANIMATION CONFIGS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function LandingSections() {
  return (
    <div className="bg-slate-950 text-slate-100 overflow-hidden space-y-32 py-16">

      {/* ====================================================
          1. WHY CHOOSE US SECTION
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-bold tracking-widest text-violet-400 uppercase">Why Choose AI-Verse</h2>
          <p className="text-3xl sm:text-4xl font-black mt-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Built for High-Performance AI Engineering
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Production Ready", desc: "Every prompt is strictly tested against Edge cases to prevent LLM hallucinations.", icon: "🎯" },
            { title: "Tokens Optimized", desc: "Crafted efficiently to minimize context window usage and cut API billing costs.", icon: "💎" },
            { title: "One-Click Deploy", desc: "Instantly copy optimized JSON structures, system instructions, or raw variables.", icon: "⚡" }
          ].map((item, index) => (
            <motion.div 
              key={index} variants={fadeInUp} whileHover={{ y: -6 }}
              className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm shadow-xl hover:border-violet-500/30 transition-colors"
            >
              <span className="text-4xl block mb-4">{item.icon}</span>
              <h3 className="text-xl font-bold mb-2 text-slate-200">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ====================================================
          2. TOP CREATORS SECTION (DYNAMIC)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Leaderboard</h2>
            <p className="text-3xl font-black mt-1">Top Prompt Architects</p>
          </div>
          <Link href="#" className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors">
            View All Elite Creators &rarr;
          </Link>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {topCreators.map((creator) => (
            <motion.div 
              key={creator.id} variants={fadeInUp} whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-850 relative group"
            >
              <span className="absolute top-4 right-4 text-xs font-mono font-bold bg-slate-800 text-violet-400 px-2.5 py-1 rounded-full border border-slate-700">
                {creator.rank}
              </span>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-violet-500/20">
                  <img src={creator.avatar} alt={creator.name} className="object-cover w-full h-full" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-200 group-hover:text-violet-400 transition-colors">{creator.name}</h3>
                  <p className="text-xs text-slate-500">{creator.role}</p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-900 flex justify-between items-center text-xs">
                <span className="text-slate-400">Shared Prompts</span>
                <span className="font-bold text-slate-200">{creator.prompts}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ====================================================
          3. CUSTOMER REVIEWS SECTION (DYNAMIC)
         ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Wall of Love</h2>
          <p className="text-3xl font-black mt-1">Trusted by 15,000+ Engineers</p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div 
              key={review.id} variants={fadeInUp}
              className="p-6 rounded-2xl bg-slate-900/30 border border-slate-850 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4 text-amber-400 text-sm">
                  {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">"{review.comment}"</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900/60">
                <h4 className="text-sm font-bold text-slate-200">{review.user}</h4>
                <p className="text-xs text-slate-500">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ====================================================
          4. EXTRA SECTION A: LIVE METRICS (COUNTER STATS)
         ==================================================== */}
      <section className="border-y border-slate-900 bg-slate-900/10 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <p className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-2 tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ====================================================
          5. EXTRA SECTION B: CTA (CALL TO ACTION)
         ==================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-violet-900/30 via-indigo-900/20 to-slate-900 border border-violet-500/20 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[300px] bg-violet-600/10 blur-[100px] rotate-12 pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-slate-100">
            Stop Guessing. <br /> Start Prompt Engineering.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Join the community of elite developers optimizing LLM outputs. Deploy perfect contexts in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auth/signup" className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-500 shadow-xl shadow-violet-600/20 transition-all text-sm inline-block">
                Get Started Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/promts" className="px-6 py-3 bg-slate-900 text-slate-300 font-semibold rounded-xl border border-slate-800 hover:border-slate-700 transition-all text-sm inline-block">
                Browse Ecosystem
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}