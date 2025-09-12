 
import Link from 'next/link'
import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 animate-pulse"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Glowing border effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center py-6 sm:py-8 px-4">
        
        {/* Navigation links with enhanced styling */}
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
          
          <Link 
            href="/" 
            className="group relative px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-300 ease-out rounded-lg hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10"
          >
            <span className="relative z-10">Home</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/5 group-hover:to-blue-600/10 transition-all duration-300"></div>
          </Link>
          
          <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-600 to-transparent mx-1"></div>
          
          <Link
            href="https://github.com/hamsashahbaz11-rgb"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-300 ease-out rounded-lg hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10"
          >
            <FaGithub className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">GitHub</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-purple-600/5 group-hover:to-purple-600/10 transition-all duration-300"></div>
          </Link>
          
          <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-600 to-transparent mx-1"></div>
          
          <Link
            href="https://www.linkedin.com/in/hamza-shahbaz-a37637380/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-300 ease-out rounded-lg hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10"
          >
            <FaLinkedinIn className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">LinkedIn</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300"></div>
          </Link>
          
          <div className="w-px h-4 bg-gradient-to-b from-transparent via-gray-600 to-transparent mx-1"></div>
          
          <Link
            href="mailto:hamsashahbaz11@gmail.com"
            className="group relative flex items-center gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-300 ease-out rounded-lg hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10"
          >
            <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Email</span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:via-red-600/5 group-hover:to-red-600/10 transition-all duration-300"></div>
          </Link>
\
          
        </div>
      </div>
      
      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      </div>
    </footer>
  )
}

export default Footer