import React from 'react';
import { Play, Pause, RotateCcw, Minus, Plus } from 'lucide-react';

const Controls = ({
    isPlaying,
    wpm,
    adjustWpm,
    togglePlay,
    goBack,
    resetReading,
    currentTheme,
    disabled
}) => {
    return (
        <div className="space-y-6">
            {/* Speed Control */}
            <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => adjustWpm(-50)}
                        className={`p-2 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        disabled={disabled}
                    >
                        <Minus className={`w-4 h-4 ${currentTheme.buttonIcon}`} />
                    </button>
                    <div className="text-center min-w-[90px]">
                        <div className={`text-xl font-light ${currentTheme.text}`}>{wpm}</div>
                        <div className={`text-xs ${currentTheme.accent}`}>WPM</div>
                    </div>
                    <button
                        onClick={() => adjustWpm(50)}
                        className={`p-2 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        disabled={disabled}
                    >
                        <Plus className={`w-4 h-4 ${currentTheme.buttonIcon}`} />
                    </button>
                </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <button
                        onClick={goBack}
                        className={`p-3 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        title="Go back 10 words"
                        disabled={disabled}
                    >
                        <RotateCcw className={`w-5 h-5 ${currentTheme.buttonIcon}`} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className={`p-4 rounded-lg ${currentTheme.primary} transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${currentTheme.primaryShadow}`}
                        disabled={disabled}
                    >
                        {isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                        ) : (
                            <Play className="w-6 h-6 text-white" />
                        )}
                    </button>
                    <button
                        onClick={resetReading}
                        className={`p-3 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        title="Reset to beginning"
                        disabled={disabled}
                    >
                        <RotateCcw className={`w-5 h-5 ${currentTheme.buttonIcon} rotate-180`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Controls;
