import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Tooltip from './Tooltip';

const WordDisplay = ({ word, currentTheme, disabled, isFocusMode }) => {
    const [fontSize, setFontSize] = useState(60);

    const increaseSize = () => {
        setFontSize(prev => Math.min(prev + 5, 120));
    };

    const decreaseSize = () => {
        setFontSize(prev => Math.max(prev - 5, 20));
    };

    return (
        <div className={`w-full flex flex-col items-center justify-center py-10 ${disabled ? 'opacity-30' : ''}`}>
            <div
                className={`font-bold tracking-tight ${currentTheme.text} text-center break-words w-full h-auto min-h-[150px] flex items-center justify-center transition-all duration-200 px-4`}
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.2 }}
            >
                {word || '...'}
            </div>

            <div className={`flex items-center gap-6 mt-8 p-1.5 rounded-2xl border ${currentTheme.border} ${currentTheme.card} shadow-sm bg-opacity-30 backdrop-blur-sm transition-all duration-500 ${isFocusMode ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <Tooltip text="Smaller Text" currentTheme={currentTheme}>
                    <button
                        onClick={decreaseSize}
                        disabled={disabled || fontSize <= 20}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all ${currentTheme.text} disabled:opacity-30 disabled:hover:bg-transparent font-bold text-sm select-none active:scale-95`}
                    >
                        A
                    </button>
                </Tooltip>

                <div className={`w-[1px] h-4 ${currentTheme.border}`}></div>

                <Tooltip text="Larger Text" currentTheme={currentTheme}>
                    <button
                        onClick={increaseSize}
                        disabled={disabled || fontSize >= 120}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-all ${currentTheme.text} disabled:opacity-30 disabled:hover:bg-transparent font-bold text-xl select-none active:scale-95`}
                    >
                        A
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default WordDisplay;
