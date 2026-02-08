import React from 'react';

const ProgressBar = ({ progress, currentIndex, maxIndex, handleProgressChange, currentTheme }) => {
    return (
        <div className={`${currentTheme.card} rounded-xl shadow-lg p-4 border ${currentTheme.border}`}>
            <div className="relative">
                {/* Arrow marker */}
                <div
                    className={`absolute top-0 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent ${currentTheme.arrow} transition-all duration-300 pointer-events-none`}
                    style={{
                        left: `calc(${progress}% - 6px)`,
                        transform: 'translateY(-2px)'
                    }}
                />
                <div className="flex items-center gap-3 mb-3 mt-3">
                    <div className={`flex-1 h-1.5 ${currentTheme.progressBg} rounded-full overflow-hidden`}>
                        <div
                            className={`h-full ${currentTheme.progressFill} transition-all duration-300 shadow-lg ${currentTheme.progressGlow}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className={`text-sm ${currentTheme.accent} font-medium min-w-[50px] text-right`}>
                        {Math.round(progress)}%
                    </span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={maxIndex}
                    value={currentIndex}
                    onChange={handleProgressChange}
                    className="w-full h-6 bg-transparent appearance-none cursor-pointer absolute top-0 left-0 opacity-0"
                />
            </div>
        </div>
    );
};

export default ProgressBar;
