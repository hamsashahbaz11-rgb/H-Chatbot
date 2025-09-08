"use client"
import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Brain, Users, Zap, Shield, ArrowRight, Star, Link} from 'lucide-react'; 
import Footer from './components/Footer';

export default function Home({ session }) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);  
    useEffect(() => {
         setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % 3);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Adaptive Intelligence",
            description: "Learns your preferences and conversation style over time"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Personalized Experience",
            description: "Tailored responses based on your unique personality"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Instant responses with advanced AI processing"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Privacy First",
            description: "Your conversations remain completely private and secure"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Creative Director",
            text: "This AI understands me better than most humans. It's like having a brilliant friend available 24/7.",
            rating: 5
        },
        {
            name: "Marcus Rodriguez",
            role: "Software Engineer",
            text: "The personalization is incredible. It remembers our conversations and builds on them naturally.",
            rating: 5
        },
        {
            name: "Emma Thompson",
            role: "Writer",
            text: "Finally, an AI that adapts to my writing style and helps me think through complex ideas.",
            rating: 5
        }
    ];

   
    const floatingStyle = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(5px) rotate(-1deg); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .delay-500 {
      animation-delay: 0.5s;
    }
    .delay-1000 {
      animation-delay: 1s;
    }
    .delay-2000 {
      animation-delay: 2s;
    }
    .delay-3000 {
      animation-delay: 3s;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `;

    return (
       

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
    
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/[0.015] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-2/5 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
    </div>

    {/* Hero Section */}
    <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/[0.05] backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white/80" />
                <span className="text-sm font-medium text-white/90">Your Personal AI Companion</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-tight tracking-tight">
                Conversations That
                <br />
                <span className="bg-gradient-to-b from-white/80 to-white/50 bg-clip-text text-transparent">
                    Understand You
                </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                Experience AI that adapts to your personality, remembers your preferences, and grows with every conversation.
                Your perfect digital companion awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 flex items-center space-x-2 shadow-2xl backdrop-blur-sm">
                    <span>Start Chatting Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="px-8 py-4 rounded-xl text-lg font-semibold border border-white/30 hover:border-white/50 transition-all duration-300 hover:bg-white/[0.05] backdrop-blur-sm">
                    Watch Demo  
                </button>
            </div>
        </div>

        {/* Chat Preview */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl relative group">
                {/* Hover effect line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
                
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-xs border border-white/10">
                            <p className="text-white/90">Hey! I need help planning a creative project for this weekend.</p>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-md border border-white/10">
                            <p className="text-white/90">I remember you love hands-on creative work and have that art supplies collection! How about we explore some mixed-media collage ideas that match your aesthetic? I can suggest techniques based on your previous projects.</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-xs border border-white/10">
                            <p className="text-white/90">Perfect! You really do know me well 😊</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <div className={`mt-32 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tight">
                    Why Choose H-Chatbot?
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                    Advanced AI technology meets personalized experience to create conversations that feel natural and meaningful.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className={`group bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:bg-white/[0.05] hover:shadow-2xl`} style={{animationDelay: `${index * 100}ms`}}>
                        {/* Hover effect line */}
                        <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
                        
                        <div className="text-white/80 mb-4 group-hover:text-white transition-colors duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                        <p className="text-white/70 leading-relaxed font-light">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Testimonials */}
        <div className={`mt-32 transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tight">
                    Loved by Thousands
                </h2>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl relative group">
                    {/* Hover effect line */}
                    <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
                    
                    <div className="transition-all duration-500">
                        <div className="flex justify-center mb-4">
                            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 text-white/80 fill-current" />
                            ))}
                        </div>
                        <blockquote className="text-xl md:text-2xl text-center text-white/90 mb-6 italic font-light">
                            "{testimonials[currentTestimonial].text}"
                        </blockquote>
                        <div className="text-center">
                            <p className="font-semibold text-white/90">{testimonials[currentTestimonial].name}</p>
                            <p className="text-white/60">{testimonials[currentTestimonial].role}</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentTestimonial ? 'bg-white/60' : 'bg-white/20'
                                }`}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-32 mb-20 text-center transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-12 border border-white/[0.08] relative group">
                {/* Hover effect line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:w-full transition-all duration-700 ease-out"></div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tracking-tight">
                    Ready to Experience Personal AI?
                </h2>
                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto font-light">
                    Join thousands of users who've discovered the future of personalized conversations. Your AI companion is waiting.
                </p>
                <button className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 px-10 py-5 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 flex items-center space-x-3 mx-auto shadow-2xl backdrop-blur-sm">
                    <span>Begin Your Journey</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>
        </div>
 
      
    </main>
    
    <Footer/>
</div>
    );
}