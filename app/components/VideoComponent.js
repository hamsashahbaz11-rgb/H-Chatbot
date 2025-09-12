"use client"
import React, { useEffect, useRef } from 'react'
import { X, Play, Pause, Volume2, Maximize2 } from 'lucide-react'

const VideoComponent = ({ isOpen, onClose }) => {
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [showCustomControls, setShowCustomControls] = React.useState(false)

    useEffect(() => {
        if (isOpen && videoRef.current) {
            // Auto-play when dialog opens (with user gesture)
            videoRef.current.play().catch(() => {
                // Ignore autoplay errors (browser restrictions)
            })
        } else if (!isOpen && videoRef.current) {
            // Pause and reset when dialog closes
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isOpen])

    // Handle escape key to close
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Prevent body scroll when dialog is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    if (!isOpen) return null

    return (
        <>
          <div className='fixed inset-0 flex justify-center items-center z-50 h-[100vh]' >
            <div 
                className="fixed inset-0 bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 backdrop-blur-md z-40 transition-all duration-500"
                onClick={onClose}
            >
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-cyan-400/25 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-60 right-20 w-1 h-1 bg-indigo-400/35 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
                </div>
            </div>
            {/* Enhanced Dialog container */}
            <div className={`fixed bottom-0 left-0 right-0 w-[60%] mx-auto p-10  h-[95vh] -mt-16 pt-14 z-50 transform transition-all duration-700 ease-out ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
                
                {/* Glowing border effect */}
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
                
                {/* Main container with glass effect */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-800/95 backdrop-blur-xl border-t border-gray-700/50 rounded-t-3xl shadow-2xl overflow-hidden">
                    
                    {/* Subtle grid overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                        }}></div>
                    </div>
                    
                    {/* Enhanced Header */}
                    <div className="relative flex items-center justify-between p-6 border-b border-gray-700/30 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                        
                        {/* Drag indicator with glow */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-full shadow-lg shadow-gray-500/20"></div>
                        
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-blue-500/30"></div>
                                <div className="absolute inset-0 w-2 h-8 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-sm opacity-50"></div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xl tracking-tight">Video Showcase</h3>
                                <p className="text-gray-400 text-sm mt-0.5">Interactive Preview</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={onClose}
                            className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-red-900/40 hover:to-red-800/40 text-gray-400 hover:text-red-300 transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-red-500/30 shadow-lg hover:shadow-red-500/10"
                        >
                            <X size={22} className="group-hover:rotate-90 transition-transform duration-300" />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-300"></div>
                        </button>
                    </div>
                    
                    {/* Enhanced Video container */}
                    <div className="relative w-full h-[calc(100%-100px)] p-4">
                        <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700/30">
                            
                            {/* Video element */}
                            <video 
                                ref={videoRef}
                                className="w-full h-full object-contain"
                                controls
                                preload="metadata"
                                playsInline
                                controlsList="nodownload"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src="https://ik.imagekit.io/kftisdybz/My_Chat_App_U-dHD-FTs.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            
                            {/* Custom loading overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900/90 to-black/90 opacity-0 pointer-events-none transition-opacity duration-500">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-gray-700 border-t-cyan-400 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400/50 rounded-full animate-spin blur-sm"></div>
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-white font-semibold">Loading Video</p>
                                    <p className="text-gray-400 text-sm mt-1">Please wait...</p>
                                </div>
                            </div>
                            
                            {/* Corner decorations */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-lg"></div>
                            <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-lg"></div>
                            <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400/40 rounded-bl-lg"></div>
                            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400/40 rounded-br-lg"></div>
                        </div>
                        
                        {/* Enhanced bottom info bar */}
                        <div className="absolute bottom-0 left-4 right-4 h-12 bg-gradient-to-r from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-md rounded-b-2xl border-t border-gray-700/30 flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                                <span className="text-gray-300 text-sm font-medium">Live Preview</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-xs">
                                <Volume2 size={14} />
                                <span>HD Quality</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Ambient lighting effects */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-1/3 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"></div>
                    
                    {/* Side glow effects */}
                    <div className="absolute top-1/2 left-0 w-px h-1/3 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"></div>
                    <div className="absolute top-1/2 right-0 w-px h-1/3 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"></div>
                </div>
            </div>
             </div>
        </>
    )
}

export default VideoComponent