"use client"
import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, Brain, Users, Zap, Shield, ArrowRight, ArrowLeft, Check, Globe, Volume2, Lightbulb, Target, Thermometer, Plus, X } from 'lucide-react' 
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '../context/ToastContext';
export default function PreferencesPage() {
    const router = useRouter;
    const { showToast } = useToast();
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState({});
    const [customInputValue, setCustomInputValue] = useState('');
    const [preferences, setPreferences] = useState({
        tone: "friendly",
        detailLevel: "medium",
        language: "en",
        interests: [],
        responseStyle: "balanced",
        domainKnowledge: [],
        temperature: 0.7,
        customOptions: {
            tone: [],
            detailLevel: [],
            language: [],
            interests: [],
            responseStyle: [],
            domainKnowledge: []
        }
    });
    const { data: session } = useSession();



    const handleSubmit = async () => {
        
        try {
            const payload = {
                email: session.user.email,
                tone: preferences.tone || customOptions.tone,
                detailLevel: preferences.detailLevel || customOptions.detailLevel,
                language: preferences.language || customOptions.language,
                interests: preferences.interests || customOptions.interests,
                responseStyle: preferences.responseStyle || customOptions.responseStyle,
                domainKnowledge: preferences.domainKnowledge || customOptions.domainKnowledge,
                temperature: preferences.temperature,
            };

            if (payload.email || payload.tone || payload.detailLevel || payload.language || payload.interests || payload.responseStyle || payload.domainKnowledge || payload.temperature) {
                
            }

            const response = await fetch("/api/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            })


            if (response.status === 200) {
                showToast('Preferences saved! Your personalized AI experience is ready.', 'success');
                router.redirect("/")
                
            }
        } catch (error) {
            
            showToast("Something went wrong!", "error")
        }

    };


   

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const steps = [
        {
            title: "Communication Tone",
            subtitle: "How would you like me to talk with you?",
            icon: <MessageCircle className="w-8 h-8" />,
            field: "tone"
        },
        {
            title: "Response Detail",
            subtitle: "How much detail do you prefer in responses?",
            icon: <Volume2 className="w-8 h-8" />,
            field: "detailLevel"
        },
        {
            title: "Language Preference",
            subtitle: "Which language should we use?",
            icon: <Globe className="w-8 h-8" />,
            field: "language"
        },
        {
            title: "Your Interests",
            subtitle: "What topics fascinate you?",
            icon: <Lightbulb className="w-8 h-8" />,
            field: "interests"
        },
        {
            title: "Response Style",
            subtitle: "How should I structure my responses?",
            icon: <Brain className="w-8 h-8" />,
            field: "responseStyle"
        },
        {
            title: "Areas of Expertise",
            subtitle: "What fields do you work in or want to learn about?",
            icon: <Target className="w-8 h-8" />,
            field: "domainKnowledge"
        },
        {
            title: "Creativity Level",
            subtitle: "How creative should my responses be?",
            icon: <Thermometer className="w-8 h-8" />,
            field: "temperature"
        }
    ];

    const fieldOptions = {
        tone: [
            { value: "friendly", label: "Friendly & Warm", desc: "Conversational and approachable", emoji: "😊" },
            { value: "formal", label: "Professional", desc: "Business-like and structured", emoji: "💼" },
            { value: "casual", label: "Casual & Relaxed", desc: "Easy-going and informal", emoji: "😎" },
            { value: "funny", label: "Playful & Humorous", desc: "Light-hearted with jokes", emoji: "😄" }
        ],
        detailLevel: [
            { value: "short", label: "Brief & Concise", desc: "Quick, to-the-point answers", emoji: "⚡" },
            { value: "medium", label: "Balanced Detail", desc: "Moderate explanations", emoji: "⚖️" },
            { value: "detailed", label: "Comprehensive", desc: "Thorough, in-depth responses", emoji: "📚" }
        ],
        language: [
            { value: "en", label: "English", desc: "International language", emoji: "🇺🇸" },
            { value: "ur", label: "Urdu", desc: "اردو میں بات چیت", emoji: "🇵🇰" },
            { value: "ar", label: "Arabic", desc: "التواصل باللغة العربية", emoji: "🇸🇦" }
        ],
        responseStyle: [
            { value: "balanced", label: "Balanced Approach", desc: "Mix of facts and opinions", emoji: "⚖️" },
            { value: "analytical", label: "Analytical", desc: "Data-driven and logical", emoji: "📊" },
            { value: "creative", label: "Creative & Imaginative", desc: "Think outside the box", emoji: "🎨" },
            { value: "practical", label: "Practical & Actionable", desc: "Focus on real solutions", emoji: "🔧" }
        ]
    };

    const interestOptions = [
        { value: "technology", label: "Technology", emoji: "💻" },
        { value: "science", label: "Science", emoji: "🔬" },
        { value: "arts", label: "Arts & Culture", emoji: "🎨" },
        { value: "business", label: "Business", emoji: "💼" },
        { value: "health", label: "Health & Wellness", emoji: "🏥" },
        { value: "education", label: "Education", emoji: "📚" },
        { value: "entertainment", label: "Entertainment", emoji: "🎬" },
        { value: "sports", label: "Sports", emoji: "⚽" },
        { value: "travel", label: "Travel", emoji: "✈️" },
        { value: "cooking", label: "Cooking", emoji: "👨‍🍳" },
        { value: "finance", label: "Finance", emoji: "💰" },
        { value: "philosophy", label: "Philosophy", emoji: "🤔" }
    ];

    const domainOptions = [
        { value: "software_development", label: "Software Development", emoji: "💻" },
        { value: "data_science", label: "Data Science", emoji: "📊" },
        { value: "marketing", label: "Marketing", emoji: "📢" },
        { value: "design", label: "Design", emoji: "🎨" },
        { value: "medicine", label: "Medicine", emoji: "🩺" },
        { value: "law", label: "Law", emoji: "⚖️" },
        { value: "finance", label: "Finance", emoji: "💰" },
        { value: "education", label: "Education", emoji: "🎓" },
        { value: "research", label: "Research", emoji: "🔬" },
        { value: "consulting", label: "Consulting", emoji: "💡" },
        { value: "engineering", label: "Engineering", emoji: "🔧" },
        { value: "psychology", label: "Psychology", emoji: "🧠" }
    ];

    const handleOptionSelect = (field, value) => {
        if (field === 'interests' || field === 'domainKnowledge') {
            const currentValues = preferences[field];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            setPreferences(prev => ({ ...prev, [field]: newValues }));
        } else {
            setPreferences(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleCustomInputToggle = (field) => {
        setShowCustomInput(prev => ({ ...prev, [field]: !prev[field] }));
        setCustomInputValue('');
    };

    const handleCustomInputSubmit = (field) => {
        if (customInputValue.trim()) {
            const customValue = `${customInputValue.toLowerCase().replace(/\s+/g, '_')}`;
            const customLabel = customInputValue.trim();

            // Add to custom options
            setPreferences(prev => ({
                ...prev,
                customOptions: {
                    ...prev.customOptions,
                    [field]: [...prev.customOptions[field], { value: customValue, label: customLabel, emoji: "✨", isCustom: true }]
                }
            }));

            // Select the custom option
            if (field === 'interests' || field === 'domainKnowledge') {
                setPreferences(prev => ({
                    ...prev,
                    [field]: [...prev[field], customValue]
                }));
            } else {
                setPreferences(prev => ({
                    ...prev,
                    [field]: customValue
                }));
            }

            setCustomInputValue('');
            setShowCustomInput(prev => ({ ...prev, [field]: false }));
        }
    };

    const removeCustomOption = (field, valueToRemove) => {
        // Remove from custom options
        setPreferences(prev => ({
            ...prev,
            customOptions: {
                ...prev.customOptions,
                [field]: prev.customOptions[field].filter(option => option.value !== valueToRemove)
            }
        }));

        // Remove from selected preferences
        if (field === 'interests' || field === 'domainKnowledge') {
            setPreferences(prev => ({
                ...prev,
                [field]: prev[field].filter(value => value !== valueToRemove)
            }));
        } else if (preferences[field] === valueToRemove) {
            // Reset to default if this was the selected option
            const defaultValues = {
                tone: "friendly",
                detailLevel: "medium",
                language: "en",
                responseStyle: "balanced"
            };
            setPreferences(prev => ({
                ...prev,
                [field]: defaultValues[field]
            }));
        }
    };

    const handleTemperatureChange = (value) => {
        setPreferences(prev => ({ ...prev, temperature: value }));
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getTemperatureLabel = (temp) => {
        if (temp <= 0.3) return { label: "Conservative", desc: "Focused and predictable", color: "text-blue-400" };
        if (temp <= 0.7) return { label: "Balanced", desc: "Mix of creativity and logic", color: "text-green-400" };
        return { label: "Creative", desc: "Imaginative and diverse", color: "text-purple-400" };
    };

    const getAllOptions = (field) => {
        const baseOptions = fieldOptions[field] || [];
        const customOptions = preferences.customOptions[field] || [];
        return [...baseOptions, ...customOptions];
    };

    const getAllMultiSelectOptions = (field) => {
        if (field === 'interests') {
            return [...interestOptions, ...preferences.customOptions[field]];
        }
        if (field === 'domainKnowledge') {
            return [...domainOptions, ...preferences.customOptions[field]];
        }
        return [];
    };

    const renderCustomInput = (field) => {
        if (!showCustomInput[field]) return null;

        return (
            <div className="mt-6 max-w-md mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h4 className="text-lg font-semibold text-white mb-4">Add Custom Option</h4>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={customInputValue}
                            onChange={(e) => setCustomInputValue(e.target.value)}
                            placeholder="Enter your custom option..."
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleCustomInputSubmit(field);
                                }
                            }}
                        />
                        <button
                            onClick={() => handleCustomInputSubmit(field)}
                            disabled={!customInputValue.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add
                        </button>
                    </div>
                    <button
                        onClick={() => handleCustomInputToggle(field)}
                        className="mt-3 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    };

    const renderStepContent = () => {
        const step = steps[currentStep];

        if (step.field === 'interests') {
            const allOptions = getAllMultiSelectOptions('interests');
            return (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                        {allOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <button
                                    onClick={() => handleOptionSelect('interests', option.value)}
                                    className={`w-full p-2 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${preferences.interests.includes(option.value)
                                        ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                                        : 'border-white/20 bg-white/5 hover:border-purple-300/50 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center space-x-1 mb-1">
                                        <span className="text-xl">{option.emoji}</span>
                                        <span className="font-semibold text-white">{option.label}</span>
                                        {preferences.interests.includes(option.value) && (
                                            <Check className="w-3 h-3 text-purple-400 ml-auto" />
                                        )}
                                    </div>
                                </button>
                                {option.isCustom && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeCustomOption('interests', option.value);
                                        }}
                                        className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                                    >
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => handleCustomInputToggle('interests')}
                            className="inline-flex items-center  px-1  bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 rounded-xl transition-all duration-300"
                        >
                            <Plus className="w-3 h-3" />
                            <span>Add Custom Interest</span>
                        </button>
                    </div>

                    {renderCustomInput('interests')}
                </div>
            );
        }

        if (step.field === 'domainKnowledge') {
            const allOptions = getAllMultiSelectOptions('domainKnowledge');
            return (
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                        {allOptions.map((option) => (
                            <div key={option.value} className="relative">
                                <button
                                    onClick={() => handleOptionSelect('domainKnowledge', option.value)}
                                    className={`w-full p-2 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${preferences.domainKnowledge.includes(option.value)
                                        ? 'border-pink-400 bg-pink-500/20 shadow-lg shadow-pink-500/20'
                                        : 'border-white/20 bg-white/5 hover:border-pink-300/50 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-center space-x-1 mb-1">
                                        <span className="text-2xl">{option.emoji}</span>
                                        <span className="font-semibold text-white">{option.label}</span>
                                        {preferences.domainKnowledge.includes(option.value) && (
                                            <Check className="w-3 h-3 text-pink-400 ml-auto" />
                                        )}
                                    </div>
                                </button>
                                {option.isCustom && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeCustomOption('domainKnowledge', option.value);
                                        }}
                                        className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                                    >
                                        <X className="w-2 h-2 text-white" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => handleCustomInputToggle('domainKnowledge')}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 rounded-lg transition-all duration-300"
                        >
                            <Plus className="w-3 h-3" />
                            <span>Add Custom Domain</span>
                        </button>
                    </div>

                    {renderCustomInput('domainKnowledge')}
                </div>
            );
        }

        if (step.field === 'temperature') {
            const tempInfo = getTemperatureLabel(preferences.temperature);
            return (
                <div className="max-w-md mx-auto">
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-blue-300">Conservative</span>
                            <span className={` ${tempInfo.color}`}>{tempInfo.label}</span>
                            <span className="text-purple-300">Creative</span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="1.0"
                            step="0.1"
                            value={preferences.temperature}
                            onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                            <span>0.1</span>
                            <span className={`font-medium ${tempInfo.color}`}>{preferences.temperature}</span>
                            <span>1.0</span>
                        </div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="text-lg font-semibold text-white mb-2">{tempInfo.label}</div>
                        <div className="text-gray-300">{tempInfo.desc}</div>
                    </div>
                </div>
            );
        }

        // For single-select fields (tone, detailLevel, language, responseStyle)
        const allOptions = getAllOptions(step.field);
        return (
            <div>
                <div className="grid gap-2 max-w-xl mx-auto mb-3">
                    {allOptions.map((option) => (
                        <div key={option.value} className="relative">
                            <button
                                onClick={() => handleOptionSelect(step.field, option.value)}
                                className={`w-full px-6 py-2 rounded-xl border-2 transition-all duration-300 text-left hover:scale-102 ${preferences[step.field] === option.value
                                    ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                                    : 'border-white/20 bg-white/5 hover:border-purple-300/50 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <span className="text-3xl">{option.emoji}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-white">{option.label}</h3>
                                            {preferences[step.field] === option.value && (
                                                <Check className="w-6 h-6 text-purple-400" />
                                            )}
                                        </div>
                                        <p className="text-gray-300 mt-1">{option.desc || "Custom option"}</p>
                                    </div>
                                </div>
                            </button>
                            {option.isCustom && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeCustomOption(step.field, option.value);
                                    }}
                                    className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                                >
                                    <X className="w-3 h-3 text-white" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => handleCustomInputToggle(step.field)}
                        className="inline-flex items-center  px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 rounded-xl transition-all duration-300"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        <span>Add Custom Option</span>
                    </button>
                </div>

                {renderCustomInput(step.field)}
            </div>
        );
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
            <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ffffff, #e5e5e5);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ffffff, #e5e5e5);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }
      `}</style>

            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-40 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-40 h-80 bg-gray-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            </div>

            {/* Header */}
            <div className={`relative z-10 text-center pt-20 pb-4 transition-all duration-75 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-white to-gray-300 rounded-2xl flex items-center justify-center">
                        <Brain className="w-8 h-8 text-black" />
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Let's Personalize Your AI
                </h1>
                <p className="text-md text-gray-400 max-w-lg mx-auto">
                    Help us understand you better so we can provide the perfect conversational experience
                </p>
            </div>

            {/* Progress Bar */}
            <div className={`relative z-10 max-w-xl mx-auto px-6 mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-full h-3 mb-4">
                    <div
                        className="bg-gradient-to-r from-white to-gray-300 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <span>Step {currentStep + 1} of {steps.length}</span>
                    <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-3">
                <div className={`transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {/* Step Header */}
                    <div className="text-center mb-4">
                        <div className="flex justify-center mb-1">
                            <div className="w-14 h-14 bg-gradient-to-r from-white to-gray-300 rounded-xl flex items-center justify-center">
                                {React.cloneElement(steps[currentStep].icon, { className: "w-6 h-6 text-black" })}
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-xl font-semibold mb-1 text-white">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-md text-gray-400">
                            {steps[currentStep].subtitle}
                        </p>
                    </div>

                    {/* Step Content */}
                    <div className="mb-6">
                        {renderStepContent()}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center max-w-xl mx-auto">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="flex items-center space-x-2 px-3 py-1 rounded-full border-2 border-gray-600 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800/50"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Previous</span>
                        </button>

                        {currentStep === steps.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center space-x-2 bg-gradient-to-r from-white to-gray-200 text-black px-8 py-3 rounded-full text-lg font-semibold hover:from-gray-100 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-xl"
                            >
                                <span>Complete Setup</span>
                                <Check className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={nextStep}
                                className="flex items-center space-x-2 bg-gradient-to-r from-white to-gray-200 text-black px-6 py-3 rounded-full text-lg font-semibold hover:from-gray-100 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-xl"
                            >
                                <span>Next</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Card */}
            <div className="fixed bottom-6 right-6 max-w-md mb-3 min-h-[200px] bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 border border-gray-700 shadow-2xl hidden lg:block">
                <h4 className="font-semibold text-white mb-2">Current Preferences</h4>
                <div className="space-y-1 text-sm text-gray-400">
                    <div>Tone: <span className="text-gray-200">{preferences.tone}</span></div>
                    <div>Detail: <span className="text-gray-200">{preferences.detailLevel}</span></div>
                    <div>Language: <span className="text-gray-200">{preferences.language}</span></div>
                    <div>Style: <span className="text-gray-200">{preferences.responseStyle}</span></div>
                    <div>Creativity: <span className="text-gray-200">{preferences.temperature}</span></div>
                </div>
            </div>
        </div>
    );
}