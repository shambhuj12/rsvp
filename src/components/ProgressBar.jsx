import React from 'react';

const ProgressBar = ({ progress, currentIndex, maxIndex, handleProgressChange, handleSeekStart, handleSeekEnd, currentTheme, disabled }) => {
    return (
        <div className={`w-[30%] mx-auto relative px-2 py-4 ${disabled ? 'opacity-20 pointer-events-none' : ''}`}>
            <div className="relative h-2 flex items-center group cursor-pointer">
                <div className={`absolute w-full h-1 group-hover:h-2 transition-all duration-300 ${currentTheme.progressBg} rounded-full overflow-hidden`}>
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
                    onMouseDown={handleSeekStart}
                    onMouseUp={handleSeekEnd}
                    onTouchStart={handleSeekStart}
                    onTouchEnd={handleSeekEnd}
                    disabled={disabled}
                    className="absolute w-full h-full bg-transparent appearance-none cursor-pointer z-10 opacity-0"
                />
                <div
                    className={`absolute w-0.5 h-3 group-hover:h-4 group-hover:w-1 transition-all duration-300 pointer-events-none ${currentTheme.progressFill} rounded-full`}
                    style={{ left: `calc(${progress}%)`, transform: 'translateX(-50%)' }}
                />
            </div>
            <div className="text-center mt-2">
                <span className={`text-[10px] font-medium ${currentTheme.textMuted}`}>{Math.round(progress)}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
