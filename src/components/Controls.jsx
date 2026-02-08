import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

const Controls = ({
    isPlaying,
    wpm,
    adjustWpm,
    togglePlay,
    goBack,
    goForward,
    currentTheme,
    disabled
}) => {
    return (
        <div className={`flex flex-col items-center gap-6 w-full ${disabled ? 'opacity-30 pointer-events-none' : ''}`}>
            {/* WPM Control - Top */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => adjustWpm(-50)}
                    className={`p-1.5 rounded-lg ${currentTheme.button} transition-all active:scale-90`}
                    disabled={disabled}
                >
                    <Minus className={`w-3.5 h-3.5 ${currentTheme.buttonIcon}`} />
                </button>

                <div className="text-center min-w-[70px]">
                    <div className={`text-xl font-bold ${currentTheme.text}`}>{wpm}</div>
                    <div className={`text-[8px] uppercase tracking-widest font-bold ${currentTheme.accent} opacity-60`}>WPM</div>
                </div>

                <button
                    onClick={() => adjustWpm(50)}
                    className={`p-1.5 rounded-lg ${currentTheme.button} transition-all active:scale-90`}
                    disabled={disabled}
                >
                    <Plus className={`w-3.5 h-3.5 ${currentTheme.buttonIcon}`} />
                </button>
            </div>

            {/* Playback Controls - Bottom */}
            <div className="flex items-center gap-4">
                <button
                    onClick={goBack}
                    className={`p-2 rounded-xl ${currentTheme.button} transition-all hover:scale-105 active:scale-95`}
                    title="Go back 10 words"
                    disabled={disabled}
                >
                    <ChevronLeft className={`w-5 h-5 ${currentTheme.buttonIcon}`} />
                </button>

                <button
                    onClick={togglePlay}
                    className={`p-4 rounded-2xl ${currentTheme.primary} transition-all hover:scale-105 active:scale-90 shadow-lg ${currentTheme.primaryShadow}`}
                    disabled={disabled}
                >
                    {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                    ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                </button>

                <button
                    onClick={goForward}
                    className={`p-2 rounded-xl ${currentTheme.button} transition-all hover:scale-105 active:scale-95`}
                    title="Go forward 10 words"
                    disabled={disabled}
                >
                    <ChevronRight className={`w-5 h-5 ${currentTheme.buttonIcon}`} />
                </button>
            </div>
        </div>
    );
};

export default Controls;
