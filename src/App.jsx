import React, { useState, useEffect, useRef } from 'react';
import ThemeSelector from './components/ThemeSelector';
import FileUpload from './components/FileUpload';
import WordDisplay from './components/WordDisplay';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';
import Footer from './components/Footer';

// Styling defined at one place (the Theme System) 
// and applied "inline" through the application.
const themes = {
    blue: {
        bg: 'bg-slate-950',
        card: 'bg-slate-900',
        border: 'border-slate-800',
        text: 'text-slate-50',
        textSecondary: 'text-slate-200',
        textMuted: 'text-slate-500',
        accent: 'text-blue-400',
        accentHover: 'hover:text-blue-300',
        button: 'bg-slate-800 hover:bg-slate-700',
        buttonIcon: 'text-blue-400',
        primary: 'bg-blue-700 hover:bg-blue-600',
        primaryShadow: 'shadow-blue-900/40',
        progressBg: 'bg-slate-800',
        progressFill: 'bg-blue-600',
        arrow: 'border-t-blue-500',
    },
    purple: {
        bg: 'bg-slate-950',
        card: 'bg-slate-900',
        border: 'border-slate-800',
        text: 'text-slate-50',
        textSecondary: 'text-slate-200',
        textMuted: 'text-slate-500',
        accent: 'text-purple-400',
        accentHover: 'hover:text-purple-300',
        button: 'bg-slate-800 hover:bg-slate-700',
        buttonIcon: 'text-purple-400',
        primary: 'bg-purple-700 hover:bg-purple-600',
        primaryShadow: 'shadow-purple-900/40',
        progressBg: 'bg-slate-800',
        progressFill: 'bg-purple-600',
        arrow: 'border-t-purple-500',
    },
    green: {
        bg: 'bg-slate-950',
        card: 'bg-slate-900',
        border: 'border-slate-800',
        text: 'text-slate-50',
        textSecondary: 'text-slate-200',
        textMuted: 'text-slate-500',
        accent: 'text-emerald-400',
        accentHover: 'hover:text-emerald-300',
        button: 'bg-slate-800 hover:bg-slate-700',
        buttonIcon: 'text-emerald-400',
        primary: 'bg-emerald-700 hover:bg-emerald-600',
        primaryShadow: 'shadow-emerald-900/40',
        progressBg: 'bg-slate-800',
        progressFill: 'bg-emerald-600',
        arrow: 'border-t-emerald-500',
    },
    orange: {
        bg: 'bg-slate-950',
        card: 'bg-slate-900',
        border: 'border-slate-800',
        text: 'text-slate-50',
        textSecondary: 'text-slate-200',
        textMuted: 'text-slate-500',
        accent: 'text-orange-400',
        accentHover: 'hover:text-orange-300',
        button: 'bg-slate-800 hover:bg-slate-700',
        buttonIcon: 'text-orange-400',
        primary: 'bg-orange-700 hover:bg-orange-600',
        primaryShadow: 'shadow-orange-900/40',
        progressBg: 'bg-slate-800',
        progressFill: 'bg-orange-600',
        arrow: 'border-t-orange-500',
    },
    rose: {
        bg: 'bg-slate-950',
        card: 'bg-slate-900',
        border: 'border-slate-800',
        text: 'text-slate-50',
        textSecondary: 'text-slate-200',
        textMuted: 'text-slate-500',
        accent: 'text-rose-400',
        accentHover: 'hover:text-rose-300',
        button: 'bg-slate-800 hover:bg-slate-700',
        buttonIcon: 'text-rose-400',
        primary: 'bg-rose-700 hover:bg-rose-600',
        primaryShadow: 'shadow-rose-900/40',
        progressBg: 'bg-slate-800',
        progressFill: 'bg-rose-600',
        arrow: 'border-t-rose-500',
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
    const intervalRef = useRef(null);
    const resumeTimeoutRef = useRef(null);

    const introText = "RSVP stands for Rapid Serial Visual Presentation. It is a method of reading where words are displayed one by one in the same position. This helps you read faster by eliminating the time your eyes spend moving from word to word. Conventional reading is slower because your eyes have to scan the page. With RSVP, you can achieve much higher reading speeds. Upload a file to start your journey into faster reading! ";

    useEffect(() => {
        if (words.length === 0) {
            const introWords = introText.split(/\s+/).filter(word => word.length > 0);
            setWords(introWords);
            setIsPlaying(true);
        }
    }, []);

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
            <header className={`w-full border-b ${currentTheme.border} ${currentTheme.card} px-8 py-4 flex items-center justify-between z-20 transition-all duration-300 animate-slide-down`}>
                <div className="flex items-center gap-6">
                    <h1 className={`text-xl font-black tracking-tighter ${currentTheme.text} flex items-center gap-2`}>
                        <span className={currentTheme.accent}>RSVP</span>READER
                    </h1>
                    <div className={`h-6 w-[1px] ${currentTheme.progressBg} opacity-50`}></div>
                    <FileUpload
                        fileName={fileName}
                        currentTheme={currentTheme}
                        handleFileUpload={handleFileUpload}
                        compact={true}
                    />
                </div>

                <ThemeSelector
                    currentTheme={currentTheme}
                    theme={theme}
                    isThemeOpen={isThemeOpen}
                    setIsThemeOpen={setIsThemeOpen}
                    handleThemeSelect={handleThemeSelect}
                />
            </header>

            {/* Main Content Area - Everything Centered */}
            <main className="flex-1 flex flex-col items-center justify-center relative w-full max-w-4xl mx-auto px-4">
                <div className="flex flex-col items-center gap-12 w-full animate-fade-in">
                    {/* Word Display - Top */}
                    <div className="animate-slide-up">
                        <WordDisplay
                            word={words[currentIndex]}
                            currentTheme={currentTheme}
                            disabled={words.length === 0 && fileName}
                        />
                    </div>

                    {/* WPM & Controls - Middle */}
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

                    {/* Progress Bar - Bottom */}
                    <div className="w-full max-w-2xl animate-slide-up animation-delay-200">
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
            </main>

            {/* Footer - Bottom */}
            <div className="animate-slide-up animation-delay-300 w-full z-10">
                <Footer currentTheme={currentTheme} />
            </div>
        </div>
    );
}
