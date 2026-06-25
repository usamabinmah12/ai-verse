"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import logo from "../../assets/logo.jpg";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;
  // Auth States for assignment requirements
  const isLoggedIn = user ? true : false;
  
  let userRole = user?.role || "user" ;
  if(!userRole) {
    userRole = "user"
  }
  // console.log("User role is : ", userRole);
  const userPlan = user?.plan || "user_free";
  // console.log("Plan is : ", userPlan);
  const handleSignOut = async () => {
    await signOut();
  };
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "All Prompts", href: "/promts" },
  ];
  const isFreePlan = userPlan === "user_free" || userPlan === "creator_free" || !userPlan;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Side: Hamburger & Brand */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none sm:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>

            {/* Logo and Platform Name */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src={logo}
                width={36}
                height={36}
                alt="PromptVerse Logo"
                className="rounded-lg object-cover"
              />
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                PromptVerse
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links (Centered) */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-violet-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {isLoggedIn && (
              <div className="flex items-center justify-between  bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl max-w-md mx-auto">
                <Link
                  href={`/dashboard/${userRole}`}
                  className="text-sm  font-bold text-slate-400 hover:text-slate-100 transition-all duration-200 flex items-center gap-10 px-3"
                >
                  <span>Dashboard</span>
                </Link>

               
              </div>
            )}
          </div>
            { isFreePlan ? <div> <Link
                  href="/plans"
                  className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-2 py-2 rounded-[20px] shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 tracking-wide uppercase"
                >
                  Upgrade To Pro
                </Link></div>
            : <div> <Link
                  href="/plans"
                  className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-2 py-2 rounded-[20px] shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 tracking-wide uppercase"
                >
                 Premium Plan
                </Link></div>}
          {/* Right Side Actions: Auth Control Buttons */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/signin"
                  className="hidden sm:inline-block text-sm font-medium text-slate-300 hover:text-violet-400 transition-colors"
                >
                  Login
                </Link>
                <Button
                  as={Link}
                  href="/auth/signup"
                  className="bg-violet-600 text-white font-medium hover:bg-violet-500 transition-all rounded-xl text-sm h-9 px-4"
                >
                  Register
                </Button>
              </>
            ) : (
              <div className="gap-2 space-x-3.5">
                <span>
                  Hi , <span className="text-3xl font-bold">{user.name}</span>
                </span>
                <Button
                  className="border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all rounded-xl text-sm h-9 px-4"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay Drawer (Controlled via State) */}
      {isMenuOpen && (
        <div
          className="sm:hidden bg-slate-950 border-b border-slate-800"
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-4 pt-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-violet-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isLoggedIn && (
              <Link
                href={`/dashboard/${userRole}`}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-violet-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {!isLoggedIn && (
              <Link
                href="/auth/signin"
                className="block rounded-md px-3 py-2 text-base font-medium text-violet-400 hover:bg-slate-800 transition-colors pt-4 border-t border-slate-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
