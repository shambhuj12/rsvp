import React from 'react';

const WordDisplay = ({ word, currentTheme, disabled, fontSize }) => {
    return (
        <div className={`w-full flex flex-col items-center justify-center py-10 ${disabled ? 'opacity-30' : ''}`}>
            <div
                className={`font-bold tracking-tight ${currentTheme.text} text-center break-words w-full h-auto min-h-[150px] flex items-center justify-center transition-all duration-200 px-4`}
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.2 }}
            >
                {word || '...'}
            </div>
        </div>
    );
};

export default WordDisplay;
