import React, { useState, useEffect, useRef } from 'react';
import { Focus, Minimize } from 'lucide-react';
import ThemeSelector from './components/ThemeSelector';
import FileUpload from './components/FileUpload';
import WordDisplay from './components/WordDisplay';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import Footer from './components/Footer';
import Tooltip from './components/Tooltip';

// Styling defined at one place (the Theme System) 
// and applied "inline" through the application.
const themes = {
    blue: {
        bg: 'bg-[#02040a]',
        card: 'bg-blue-950/10',
        border: 'border-blue-900/20',
        text: 'text-blue-50',
        textSecondary: 'text-blue-200/70',
        textMuted: 'text-blue-400/40',
        accent: 'text-blue-500',
        accentHover: 'hover:text-blue-400',
        button: 'bg-blue-950/30 hover:bg-blue-900/40',
        buttonIcon: 'text-blue-500',
        primary: 'bg-blue-600/90 hover:bg-blue-500',
        primaryShadow: 'shadow-blue-900/20',
        progressBg: 'bg-blue-950/40',
        progressFill: 'bg-blue-600',
        arrow: 'border-t-blue-600',
    },
    purple: {
        bg: 'bg-[#05020a]',
        card: 'bg-purple-950/10',
        border: 'border-purple-900/20',
        text: 'text-purple-50',
        textSecondary: 'text-purple-200/70',
        textMuted: 'text-purple-400/40',
        accent: 'text-purple-500',
        accentHover: 'hover:text-purple-400',
        button: 'bg-purple-950/30 hover:bg-purple-900/40',
        buttonIcon: 'text-purple-500',
        primary: 'bg-purple-600/90 hover:bg-purple-500',
        primaryShadow: 'shadow-purple-900/20',
        progressBg: 'bg-purple-950/40',
        progressFill: 'bg-purple-600',
        arrow: 'border-t-purple-600',
    },
    green: {
        bg: 'bg-[#020a04]',
        card: 'bg-emerald-950/10',
        border: 'border-emerald-900/20',
        text: 'text-emerald-50',
        textSecondary: 'text-emerald-200/70',
        textMuted: 'text-emerald-400/40',
        accent: 'text-emerald-500',
        accentHover: 'hover:text-emerald-400',
        button: 'bg-emerald-950/30 hover:bg-emerald-900/40',
        buttonIcon: 'text-emerald-500',
        primary: 'bg-emerald-600/90 hover:bg-emerald-500',
        primaryShadow: 'shadow-emerald-900/20',
        progressBg: 'bg-emerald-950/40',
        progressFill: 'bg-emerald-600',
        arrow: 'border-t-emerald-600',
    },
    orange: {
        bg: 'bg-[#0a0402]',
        card: 'bg-orange-950/10',
        border: 'border-orange-900/20',
        text: 'text-orange-50',
        textSecondary: 'text-orange-200/70',
        textMuted: 'text-orange-400/40',
        accent: 'text-orange-500',
        accentHover: 'hover:text-orange-400',
        button: 'bg-orange-950/30 hover:bg-orange-900/40',
        buttonIcon: 'text-orange-500',
        primary: 'bg-orange-600/90 hover:bg-orange-500',
        primaryShadow: 'shadow-orange-900/20',
        progressBg: 'bg-orange-950/40',
        progressFill: 'bg-orange-600',
        arrow: 'border-t-orange-600',
    },
    rose: {
        bg: 'bg-[#0a0204]',
        card: 'bg-rose-950/10',
        border: 'border-rose-900/20',
        text: 'text-rose-50',
        textSecondary: 'text-rose-200/70',
        textMuted: 'text-rose-400/40',
        accent: 'text-rose-500',
        accentHover: 'hover:text-rose-400',
        button: 'bg-rose-950/30 hover:bg-rose-900/40',
        buttonIcon: 'text-rose-500',
        primary: 'bg-rose-600/90 hover:bg-rose-500',
        primaryShadow: 'shadow-rose-900/20',
        progressBg: 'bg-rose-950/40',
        progressFill: 'bg-rose-600',
        arrow: 'border-t-rose-600',
    },
    grey: {
        bg: 'bg-neutral-900',
        card: 'bg-neutral-800',
        border: 'border-neutral-700',
        text: 'text-neutral-100',
        textSecondary: 'text-neutral-200',
        textMuted: 'text-neutral-500',
        accent: 'text-neutral-400',
        accentHover: 'hover:text-neutral-300',
        button: 'bg-neutral-700 hover:bg-neutral-600',
        buttonIcon: 'text-neutral-300',
        primary: 'bg-neutral-600 hover:bg-neutral-500',
        primaryShadow: 'shadow-neutral-900/40',
        progressBg: 'bg-neutral-700',
        progressFill: 'bg-neutral-500',
        arrow: 'border-t-neutral-400',
    },
    black: {
        bg: 'bg-black',
        card: 'bg-zinc-950',
        border: 'border-zinc-900',
        text: 'text-zinc-100',
        textSecondary: 'text-zinc-200',
        textMuted: 'text-zinc-600',
        accent: 'text-zinc-400',
        accentHover: 'hover:text-zinc-300',
        button: 'bg-zinc-900 hover:bg-zinc-800',
        buttonIcon: 'text-zinc-400',
        primary: 'bg-zinc-700 hover:bg-zinc-600',
        primaryShadow: 'shadow-black/60',
        progressBg: 'bg-zinc-900',
        progressFill: 'bg-zinc-600',
        arrow: 'border-t-zinc-500',
    },
};

export default function App() {
    const [text, setText] = useState('');
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(200);
    const [fileName, setFileName] = useState('');
    const [theme, setTheme] = useState('grey');
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const intervalRef = useRef(null);
    const resumeTimeoutRef = useRef(null);
    const [introStarted, setIntroStarted] = useState(false);

    const introText = "RSVP stands for Rapid Serial Visual Presentation. It is a method of reading where words are displayed one by one in the same position. This helps you read faster by eliminating the time your eyes spend moving from word to word. Conventional reading is slower because your eyes have to scan the page. With RSVP, you can achieve much higher reading speeds. Upload a file to start your journey into faster reading! ";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroStarted(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (introStarted && words.length === 0 && !fileName) {
            const introWords = introText.split(/\s+/).filter(word => word.length > 0);
            setWords(introWords);
            setIsPlaying(true);
        }
    }, [introStarted, fileName, words.length]);

    const clearResumeTimeout = () => {
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current);
        }
    };

    const currentTheme = themes[theme];

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                setText(content);
                const wordArray = content.split(/\s+/).filter(word => word.length > 0);
                setWords(wordArray);
                setCurrentIndex(0);
                setIsPlaying(false);
            };
            reader.readAsText(file);
        }
    };

    const loadSample = async () => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL}sample.txt`);
            const text = await response.text();
            setText(text);
            const wordArray = text.split(/\s+/).filter(word => word.length > 0);
            setWords(wordArray);
            setFileName('Sample Text');
            setCurrentIndex(0);
            setIsPlaying(false);
        } catch (error) {
            console.error("Failed to load sample text:", error);
        }
    };

    useEffect(() => {
        if (isPlaying && currentIndex < words.length) {
            const interval = 60000 / wpm;
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => {
                    if (prev >= words.length - 1) {
                        // Loop the intro text if no file is selected
                        if (!fileName) {
                            return 0;
                        }
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, interval);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            clearResumeTimeout();
        };
    }, [isPlaying, wpm, currentIndex, words.length]);

    const togglePlay = () => {
        if (words.length === 0) return;
        setIsPlaying(!isPlaying);
    };

    const goBack = () => {
        if (words.length === 0) return;
        clearResumeTimeout();
        const wasPlaying = isPlaying;
        setIsPlaying(false);
        setCurrentIndex(prev => Math.max(0, prev - 10));

        resumeTimeoutRef.current = setTimeout(() => {
            if (wasPlaying) setIsPlaying(true);
        }, 500);
    };

    const goForward = () => {
        if (words.length === 0) return;
        clearResumeTimeout();
        const wasPlaying = isPlaying;
        setIsPlaying(false);
        setCurrentIndex(prev => Math.min(words.length - 1, prev + 10));

        resumeTimeoutRef.current = setTimeout(() => {
            if (wasPlaying) setIsPlaying(true);
        }, 500);
    };

    const resetReading = () => {
        setCurrentIndex(0);
        setIsPlaying(false);
    };

    const adjustWpm = (delta) => {
        setWpm(prev => Math.max(100, Math.min(1000, prev + delta)));
    };

    const wasPlayingBeforeSeek = useRef(false);

    const handleSeekStart = () => {
        wasPlayingBeforeSeek.current = isPlaying;
        setIsPlaying(false);
    };

    const handleSeekEnd = () => {
        clearResumeTimeout();
        resumeTimeoutRef.current = setTimeout(() => {
            if (wasPlayingBeforeSeek.current) {
                setIsPlaying(true);
            }
        }, 500);
    };

    const handleProgressChange = (e) => {
        const newIndex = parseInt(e.target.value);
        setCurrentIndex(newIndex);
    };

    const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;

    const handleThemeSelect = (selectedTheme) => {
        setTheme(selectedTheme);
        setIsThemeOpen(false);
    };

    return (
        <div className={`fixed inset-0 w-screen h-screen ${currentTheme.bg} flex flex-col transition-colors duration-500 overflow-hidden select-none`}>
            {/* Header Bar */}
            <header className={`w-full border-b ${isFocusMode ? 'border-transparent bg-transparent' : `${currentTheme.border} ${currentTheme.card}`} px-8 py-4 flex items-center justify-between z-20 transition-all duration-500 animate-slide-down`}>
                <div className={`flex items-center gap-6 transition-opacity duration-500 ${isFocusMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
                    <h1 className={`text-xl font-black tracking-tighter ${currentTheme.text} flex items-center gap-2`}>
                        <span className={currentTheme.accent}>RSVP</span>READER
                    </h1>
                    {!isFocusMode && (
                        <>
                            <div className={`h-6 w-[1px] ${currentTheme.progressBg} opacity-50`}></div>
                            <FileUpload
                                fileName={fileName}
                                currentTheme={currentTheme}
                                handleFileUpload={handleFileUpload}
                                loadSample={loadSample}
                                compact={true}
                            />
                        </>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Tooltip text={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"} currentTheme={currentTheme} position="bottom">
                        <button
                            onClick={() => setIsFocusMode(!isFocusMode)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs transition-all ${isFocusMode
                                ? `${currentTheme.accent} bg-white/5 hover:bg-white/10 ring-1 ring-white/20`
                                : `${currentTheme.textSecondary} hover:${currentTheme.text} hover:bg-white/5`}`}
                        >
                            {isFocusMode ? <Minimize className="w-4 h-4" /> : <Focus className="w-4 h-4" />}
                            {isFocusMode ? 'EXIT FOCUS' : 'FOCUS MODE'}
                        </button>
                    </Tooltip>

                    {!isFocusMode && (
                        <ThemeSelector
                            currentTheme={currentTheme}
                            theme={theme}
                            isThemeOpen={isThemeOpen}
                            setIsThemeOpen={setIsThemeOpen}
                            handleThemeSelect={handleThemeSelect}
                        />
                    )}
                </div>
            </header>

            {/* Main Content Area - Everything Centered */}
            <main className="flex-1 flex flex-col items-center justify-center relative w-full max-w-4xl mx-auto px-4">
                <div className="flex flex-col items-center gap-12 w-full animate-fade-in">
                    {/* Word Display - Top */}
                    <div className="animate-slide-up">
                        <WordDisplay
                            word={(!introStarted && !fileName && words.length === 0) ? "RSVP" : words[currentIndex]}
                            currentTheme={currentTheme}
                            disabled={words.length === 0 && fileName}
                            isFocusMode={isFocusMode}
                        />
                    </div>

                    {/* WPM & Controls - Middle - Hidden in Focus Mode */}
                    <div className={`transition-all duration-500 ${isFocusMode ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
                        <div className="animate-slide-up animation-delay-100">
                            <Controls
                                isPlaying={isPlaying}
                                wpm={wpm}
                                adjustWpm={adjustWpm}
                                togglePlay={togglePlay}
                                goBack={goBack}
                                goForward={goForward}
                                currentTheme={currentTheme}
                                disabled={words.length === 0 && fileName}
                                fileName={fileName}
                            />
                        </div>
                    </div>

                    {/* Progress Bar - Bottom - Hidden in Focus Mode */}
                    <div className={`w-full max-w-2xl transition-all duration-500 ${isFocusMode ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
                        <div className="animate-slide-up animation-delay-200">
                            <ProgressBar
                                progress={progress}
                                currentIndex={currentIndex}
                                maxIndex={Math.max(0, words.length - 1)}
                                handleProgressChange={handleProgressChange}
                                handleSeekStart={handleSeekStart}
                                handleSeekEnd={handleSeekEnd}
                                currentTheme={currentTheme}
                                disabled={words.length === 0 && fileName}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer - Bottom - Hidden in Focus Mode */}
            <div className={`w-full z-10 transition-all duration-500 ${isFocusMode ? 'opacity-0 translate-y-full pointer-events-none' : 'opacity-100'}`}>
                <div className="animate-slide-up animation-delay-300">
                    <Footer currentTheme={currentTheme} />
                </div>
            </div>
        </div>
    );
}
