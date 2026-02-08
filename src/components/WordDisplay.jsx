import React from 'react';

const WordDisplay = ({ word, currentTheme, disabled }) => {
    return (
        <div className={`w-full flex items-center justify-center p-10 ${disabled ? 'opacity-30' : ''}`}>
            <div className={`text-5xl md:text-6xl font-bold tracking-tight ${currentTheme.text} text-center break-words max-w-full drop-shadow-sm select-none`}>
                {word || '...'}
            </div>
        </div>
    );
};

export default WordDisplay;
