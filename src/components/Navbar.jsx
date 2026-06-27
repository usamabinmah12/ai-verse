"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import logo from "../../assets/logo.jpg";
import { signOut, useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending, status } = useSession(); 

  const user = session?.user;
  const isLoggedIn = !!user;
  
  const isLoading = isPending || status === "loading";
  
  let userRole = user?.role || "user";
  const userPlan = user?.plan || "user_free";
  
  const handleSignOut = async () => {
    await signOut();
    toast("Logged Out Succesfully");
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All Prompts", href: "/promts" },
  ];

  const isFreePlan = userPlan === "user_free" || userPlan === "creator_free" || !userPlan;

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeInOut" } }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left Side: Hamburger & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none sm:hidden cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </motion.div>
            </button>

            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Image src={logo} width={36} height={36} alt="PromptVerse Logo" className="rounded-lg object-cover" />
              </motion.div>
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                PromptVerse
              </span>
            </Link>
          </div>

          
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {menuItems.map((item, index) => (
              <motion.div key={index} whileHover={{ y: -1 }}>
                <Link href={item.href} className="text-sm font-medium text-slate-300 hover:text-violet-400 transition-colors">
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {!isLoading && isLoggedIn && (
              <motion.div whileHover={{ y: -1 }} className="flex items-center justify-between bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl px-3 py-1">
                <Link href={`/dashboard/${userRole}`} className="text-sm font-bold text-slate-400 hover:text-slate-100 transition-colors">
                  Dashboard
                </Link>
              </motion.div>
            )}
          </div>

          {/* Upgrade / Pricing Button */}
          <div>
            {user ? <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/plans"
                className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-3 py-2 rounded-[20px] shadow-lg shadow-indigo-500/10 transition-all tracking-wide uppercase inline-block"
              >
                {isLoading ? "Checking Plan..." : isFreePlan ? "Upgrade To Pro" : "Premium Plan"}
              </Link>
            </motion.div>
            : 
            ""}
            
          </div>

          {/* Right Side Actions: Auth Control / Loading Spinner */}
          <div className="flex items-center gap-4 min-w-[100px] justify-end">
            <AnimatePresence mode="wait">
              {isLoading ? (
                
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center py-1 px-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-10 h-10 font-bold border-4 border-violet-500 border-t-transparent rounded-full"
                  />
                </motion.div>
              ) : !isLoggedIn ? (
                <motion.div key="auth-out" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
                  <Link href="/auth/signin" className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-violet-400 transition-colors">
                    Login
                  </Link>
                  <Link href="/auth/signup" className=" flex items-center bg-violet-600 text-white font-medium hover:bg-violet-500 rounded-xl text-sm h-9 px-4 cursor-pointer">
                    Register
                  </Link>
                </motion.div>
              ) : (
                <motion.div key="auth-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
                  <span className=" text-slate-300 hidden md:inline text-2xl">
                    Hi, <span className="font-bold text-violet-400 ">{user.name}</span>
                  </span>
                  <Button className="border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-xl text-sm h-9 px-4 cursor-pointer" onClick={handleSignOut}>
                    Logout
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="sm:hidden bg-slate-950 border-b border-slate-800 overflow-hidden">
            <div className="space-y-1 px-2 pb-4 pt-2">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-violet-400" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}

              {!isLoading && isLoggedIn && (
                <Link href={`/dashboard/${userRole}`} className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              )}

              {!isLoading && !isLoggedIn && (
                <Link href="/auth/signin" className="block rounded-md px-3 py-2 text-base font-medium text-violet-400 hover:bg-slate-800 pt-4 border-t border-slate-800/50" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;