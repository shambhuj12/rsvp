import React, { useState, useEffect, useRef } from 'react';
import { themes } from './constants/themes';
import ThemeSelector from './components/ThemeSelector';
import FileUpload from './components/FileUpload';
import WordDisplay from './components/WordDisplay';
import Controls from './components/Controls';
import ProgressBar from './components/ProgressBar';

export default function App() {
    const [text, setText] = useState('');
    const [words, setWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(300);
    const [fileName, setFileName] = useState('');
    const [theme, setTheme] = useState('blue');
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const intervalRef = useRef(null);

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
        };
    }, [isPlaying, wpm, currentIndex, words.length]);

    const togglePlay = () => {
        if (words.length === 0) return;
        setIsPlaying(!isPlaying);
    };

    const goBack = () => {
        setCurrentIndex(prev => Math.max(0, prev - 10));
        setIsPlaying(false);
    };

    const resetReading = () => {
        setCurrentIndex(0);
        setIsPlaying(false);
    };

    const adjustWpm = (delta) => {
        setWpm(prev => Math.max(100, Math.min(1000, prev + delta)));
    };

    const handleProgressChange = (e) => {
        const newIndex = parseInt(e.target.value);
        setCurrentIndex(newIndex);
        setIsPlaying(false);
    };

    const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;

    const handleThemeSelect = (selectedTheme) => {
        setTheme(selectedTheme);
        setIsThemeOpen(false);
    };

    return (
        <div className={`min-h-screen w-full ${currentTheme.bg} flex flex-col p-8 transition-colors duration-500`}>
            <ThemeSelector
                currentTheme={currentTheme}
                theme={theme}
                isThemeOpen={isThemeOpen}
                setIsThemeOpen={setIsThemeOpen}
                handleThemeSelect={handleThemeSelect}
            />

            <div className="w-full max-w-3xl mx-auto flex-1 flex items-center">
                <div className="w-full space-y-6">
                    <FileUpload
                        fileName={fileName}
                        currentTheme={currentTheme}
                        handleFileUpload={handleFileUpload}
                    />

                    {fileName && (
                        <>
                            <WordDisplay
                                word={words[currentIndex]}
                                currentTheme={currentTheme}
                            />

                            <Controls
                                isPlaying={isPlaying}
                                wpm={wpm}
                                adjustWpm={adjustWpm}
                                togglePlay={togglePlay}
                                goBack={goBack}
                                resetReading={resetReading}
                                currentTheme={currentTheme}
                                disabled={words.length === 0}
                            />

                            {words.length > 0 && (
                                <ProgressBar
                                    progress={progress}
                                    currentIndex={currentIndex}
                                    maxIndex={words.length - 1}
                                    handleProgressChange={handleProgressChange}
                                    currentTheme={currentTheme}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
