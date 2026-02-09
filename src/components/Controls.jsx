import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import Tooltip from './Tooltip';

const Controls = ({
    isPlaying,
    wpm,
    adjustWpm,
    togglePlay,
    goBack,
    goForward,
    currentTheme,
    disabled,
    fileName,
    fontSize,
    increaseFontSize,
    decreaseFontSize
}) => {
    return (
        <div className={`flex flex-col items-center gap-6 w-full ${disabled && fileName ? 'opacity-30 pointer-events-none' : ''}`}>
            {/* Size Control */}
            <div className="flex items-center gap-4">
                <Tooltip text="Smaller Text" currentTheme={currentTheme}>
                    <button
                        onClick={decreaseFontSize}
                        disabled={disabled && fileName || fontSize <= 20}
                        className={`p-1.5 rounded-lg ${currentTheme.button} transition-all hover:scale-110 active:scale-90 hover:shadow`}
                    >
                        <Minus className={`w-3.5 h-3.5 ${currentTheme.buttonIcon}`} />
                    </button>
                </Tooltip>

                <div className="text-center min-w-[70px]">
                    <div className={`text-xl font-bold ${currentTheme.text}`}>{fontSize}px</div>
                    <div className={`text-[8px] uppercase tracking-widest font-bold ${currentTheme.accent} opacity-60`}>SIZE</div>
                </div>

                <Tooltip text="Larger Text" currentTheme={currentTheme}>
                    <button
                        onClick={increaseFontSize}
                        disabled={disabled && fileName || fontSize >= 120}
                        className={`p-1.5 rounded-lg ${currentTheme.button} transition-all hover:scale-110 active:scale-90 hover:shadow`}
                    >
                        <Plus className={`w-3.5 h-3.5 ${currentTheme.buttonIcon}`} />
                    </button>
                </Tooltip>
            </div>

            {/* WPM Control */}
            <div className="flex items-center gap-4">
                <Tooltip text="Slower" currentTheme={currentTheme}>
                    <button
                        onClick={() => adjustWpm(-25)}
                        className={`p-1.5 rounded-lg ${currentTheme.button} transition-all hover:scale-110 active:scale-90 hover:shadow`}
                        disabled={disabled && fileName}
                    >
                        <Minus className={`w-3.5 h-3.5 ${currentTheme.buttonIcon}`} />
                    </button>
                </Tooltip>

                <div className="text-center min-w-[70px]">
                    <div className={`text-xl font-bold ${currentTheme.text}`}>{wpm}</div>
                    <div className={`text-[8px] uppercase tracking-widest font-bold ${currentTheme.accent} opacity-60`}>WPM</div>
                </div>

                <Tooltip text="Faster" currentTheme={currentTheme}>
                    <button
                        onClick={() => adjustWpm(25)}
                        className={`p-1.5 rounded-lg ${currentTheme.button} transition-all hover:scale-110 active:scale-90 hover:shadow`}
                        disabled={disabled && fileName}
                    >
                        <Plus className={`w-3.5 h-3.5 ${currentTheme.buttonIcon}`} />
                    </button>
                </Tooltip>
            </div>

            {/* Playback Controls - Bottom */}
            <div className="flex items-center gap-4">
                <Tooltip text="Rewind 10 Words" currentTheme={currentTheme}>
                    <button
                        onClick={goBack}
                        className={`p-2 rounded-xl ${currentTheme.button} transition-all hover:scale-105 active:scale-95`}
                        disabled={disabled && fileName}
                    >
                        <ChevronLeft className={`w-5 h-5 ${currentTheme.buttonIcon}`} />
                    </button>
                </Tooltip>

                <Tooltip text={isPlaying ? "Pause" : "Play"} currentTheme={currentTheme}>
                    <button
                        onClick={togglePlay}
                        className={`p-4 rounded-2xl ${currentTheme.primary} transition-all hover:scale-105 active:scale-90 shadow-lg ${currentTheme.primaryShadow}`}
                        disabled={disabled && fileName}
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 text-white" />
                        ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                    </button>
                </Tooltip>

                <Tooltip text="Forward 10 Words" currentTheme={currentTheme}>
                    <button
                        onClick={goForward}
                        className={`p-2 rounded-xl ${currentTheme.button} transition-all hover:scale-105 active:scale-95`}
                        disabled={disabled && fileName}
                    >
                        <ChevronRight className={`w-5 h-5 ${currentTheme.buttonIcon}`} />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default Controls;
