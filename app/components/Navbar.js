 
"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io"; 
import { FcGoogle } from "react-icons/fc"; 
import { HiMenu, HiX } from 'react-icons/hi';
import Link from "next/link";
import DialogWithInput from "@/components/comp-320";
import ChatHistory from "@/app/components/ChatHistory";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import { MessageCirclePlus } from "lucide-react"; 
import Image from "next/image";
import { useToast } from "../context/ToastContext";
import { FaGithub } from "react-icons/fa";

export const getUser = async (email) => {
  try {
    const response = await fetch("/api/get-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data.userId;
  } catch (error) {
    showToast("Error getting user: " + error.message, "error");
  }
};

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const { showToast } = useToast();

  const handleUser = async (email, name, image) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, image }),
      });
      await response.json();
    } catch (error) {
      showToast("Error creating user: " + error.message, "error");
    }
  };

  const handleConversation = async (title) => {
    try {
      const userId = await getUser(session.user.email);
      
      if (!userId) return;

      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title }),
      });

      const data = await response.json();
      <Footer id={data.conversation._id} />;
      router.push(`/chat/${data.conversation._id}`);
    } catch (error) {
      showToast("Error creating conversation: " + error.message, "error");
    }
  };

  const toggleChatHistory = () => {
    setShowChatHistory(!showChatHistory);
  };

  const toggleSignupDialog = () => {
    setIsSignupDialogOpen(!isSignupDialogOpen);
  };

  const handleSignIn = (provider) => {
    signIn(provider);
    setIsSignupDialogOpen(false);
  };

  // Close dialogs when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showChatHistory && !event.target.closest(".chat-history-container")) {
        setShowChatHistory(false);
      }
      if (isSignupDialogOpen && !event.target.closest(".signup-dialog-container")) {
        setIsSignupDialogOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChatHistory, isSignupDialogOpen]);

  // ✅ Runs only when session changes
  useEffect(() => {
    if (session?.user) {
      handleUser(session.user.email, session.user.name, session.user.image);
    }
  }, [session]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-black border-b border-gray-800 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" onClick={closeMobileMenu}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 flex-shrink-0"
              >
                <span className="font-bold text-lg sm:text-xl tracking-wide text-white">
                  H-Chatbot
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 lg:gap-6"
              >
                {!session ? (
                  // Not signed in - Show Signup Button
                  <button
                    onClick={toggleSignupDialog}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 font-medium"
                  >
                    Sign Up
                  </button>
                ) : (
                  // Signed in - Show user info and actions
                  <div className="flex items-center gap-3 lg:gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-2">
                      <Image
                        src={session.user.image}
                        alt="User profile"
                        height={32}
                        width={32}
                        className="w-8 h-8 rounded-full border border-gray-700"
                      />
                      <span className="text-white text-sm lg:text-base font-medium hidden lg:inline max-w-24 truncate">
                        {session.user.name}
                      </span>
                    </div>

                    {/* Chat History Button */}
                    <button
                      onClick={toggleChatHistory}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200"
                      title="Chat History"
                    >
                      <MessageCirclePlus size={18} />
                      <span className="hidden xl:inline text-sm">History</span>
                    </button>
                    <Link href={"/prefrences"}>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200"
                      title="Set your preferences ofr better Experience"
                    >
                      <MessageCirclePlus size={18} />
                      <span className="hidden xl:inline text-sm">Inhance Experience</span>
                    </button>
                    </Link>

                    {/* New Chat Dialog */}
                    <div className="hidden lg:block">
                      <DialogWithInput onSave={handleConversation} />
                    </div>

                    {/* Logout */}
                    <button
                  
                  onClick={() => signOut()}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                      title="Logout"
                    >
                      <IoIosLogOut size={18} />
                      <span className="hidden xl:inline text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <HiX className="block h-6 w-6" />
                ) : (
                  <HiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black border-t border-gray-800"
            >
              <div className="px-4 pt-2 pb-3 space-y-3">
                {!session ? (
                  // Not signed in - Mobile - Show Signup Button
                  <button
                    onClick={() => {
                      toggleSignupDialog();
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 font-medium"
                  >
                    Sign Up
                  </button>
                ) : (
                  // Signed in - Mobile
                  <div className="space-y-3">
                    {/* User Info - Mobile */}
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-lg">
                      <Image
                        src={session.user.image}
                        alt="User profile"
                        height={40}
                        width={40}
                        className="w-10 h-10 rounded-full border border-gray-600"
                      />
                      <div>
                        <span className="text-white font-medium block">
                          {session.user.name}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {session.user.email}
                        </span>
                      </div>
                    </div>

                    {/* Actions - Mobile */}
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          toggleChatHistory();
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200"
                      >
                        <MessageCirclePlus size={20} />
                        <span>Chat History</span>
                      </button>
                      <Link href={"/prefrences"}>
                      <button
                         
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-200"
                      >
                        <MessageCirclePlus size={20} />
                        <span>Inhance Experience</span>
                      </button>
                      </Link>

                      <div className="w-full" >
                        <DialogWithInput onSave={handleConversation} />
                      </div>

                      <button
                        onClick={() => {
                          signOut();
                          closeMobileMenu();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
                      >
                        <IoIosLogOut size={20} />
                        <span>Logout</span>
                      </button>
                     
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Signup Dialog */}
      <AnimatePresence>
        {isSignupDialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 z-50"
              onClick={() => setIsSignupDialogOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl signup-dialog-container">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome to H-Chatbot
                  </h2>
                  <p className="text-gray-400">
                    Sign up to start chatting with our AI assistant
                  </p>
                </div>

                {/* Sign-in Options */}
                <div className="space-y-4">
                  {/* Google Sign-in */}
                  <button
                    onClick={() => handleSignIn("google")}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-xl shadow-md hover:bg-gray-100 transition-all duration-200 font-medium group"
                  >
                    <FcGoogle size={24} />
                    <span>Continue with Google</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* GitHub Sign-in */}
                  <button
                    onClick={() => handleSignIn("github")}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 text-white rounded-xl shadow-md hover:bg-gray-700 transition-all duration-200 font-medium group border border-gray-600"
                  >
                    <FaGithub size={24} />
                    <span>Continue with GitHub</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <span className="px-4 text-gray-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsSignupDialogOpen(false)}
                  className="w-full px-6 py-3 text-gray-400 hover:text-white transition-colors duration-200 font-medium"
                >
                  Maybe later
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Chat History Sidebar */}
      <AnimatePresence>
        {showChatHistory && session && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowChatHistory(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 z-50 chat-history-container"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <button
                    onClick={() => setShowChatHistory(false)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Chat History Content */}
                <div className="flex-1 overflow-y-auto">
                  <ChatHistory />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}