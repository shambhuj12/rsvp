import React from 'react';

const WordDisplay = ({ word, currentTheme }) => {
    return (
        <div className={`${currentTheme.card} rounded-2xl shadow-2xl p-16 flex items-center justify-center min-h-[300px] border ${currentTheme.border}`}>
            <div className={`text-6xl font-light ${currentTheme.text} text-center break-words max-w-full`}>
                {word || ''}
            </div>
        </div>
    );
};

export default WordDisplay;
