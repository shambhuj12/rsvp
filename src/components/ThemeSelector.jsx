import React from 'react';
import Tooltip from './Tooltip';

const ThemeSelector = ({ currentTheme, theme, isThemeOpen, setIsThemeOpen, handleThemeSelect }) => {
    const themeColors = {
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        green: 'bg-emerald-500',
        orange: 'bg-orange-500',
        rose: 'bg-rose-500',
        grey: 'bg-neutral-500',
        black: 'bg-zinc-950 border border-zinc-700'
    };

    return (
        <div className="relative">
            <Tooltip text="Change Theme" currentTheme={currentTheme} position="bottom">
                <button
                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                    className={`${currentTheme.card} border ${currentTheme.border} rounded-full p-2 flex items-center justify-center hover:scale-110 transition-all shadow-lg active:scale-95`}
                >
                    <div className={`w-5 h-5 rounded-full ${themeColors[theme] || 'bg-slate-500'} shadow-sm`} />
                </button>
            </Tooltip>

            {isThemeOpen && (
                <div className={`absolute right-0 mt-3 p-2 ${currentTheme.card} border ${currentTheme.border} rounded-2xl shadow-2xl z-50 backdrop-blur-md bg-opacity-95 animate-scale-in origin-top-right`}>
                    <div className="flex flex-col gap-3">
                        {Object.entries(themeColors).map(([t, colorClass]) => (
                            <Tooltip key={t} text={t.charAt(0).toUpperCase() + t.slice(1)} currentTheme={currentTheme} position="left">
                                <button
                                    onClick={() => handleThemeSelect(t)}
                                    className={`w-8 h-8 rounded-full ${colorClass} transition-all hover:scale-110 hover:shadow-lg flex items-center justify-center ${theme === t ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110' : ''}`}
                                >
                                    {theme === t && (
                                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                    )}
                                </button>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
