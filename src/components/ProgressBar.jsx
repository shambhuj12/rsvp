import React from 'react';

const ProgressBar = ({ progress, currentIndex, maxIndex, handleProgressChange, currentTheme }) => {
    return (
        <div className="w-[30%] mx-auto relative px-2 py-4">
            <div className="relative h-1 flex items-center group">
                <div className={`absolute w-full h-1 ${currentTheme.progressBg} rounded-full overflow-hidden`}>
                    <div
                        className={`h-full ${currentTheme.progressFill} transition-all duration-300`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <input
                    type="range"
                    min="0"
                    max={maxIndex}
                    value={currentIndex}
                    onChange={handleProgressChange}
                    className="absolute w-full h-full bg-transparent appearance-none cursor-pointer z-10 opacity-0"
                />
                <div
                    className={`absolute w-0.5 h-3 ${currentTheme.progressFill} transition-all duration-300 pointer-events-none`}
                    style={{ left: `calc(${progress}%)` }}
                />
            </div>
            <div className="text-center mt-2">
                <span className={`text-[10px] font-medium ${currentTheme.textMuted}`}>{Math.round(progress)}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
