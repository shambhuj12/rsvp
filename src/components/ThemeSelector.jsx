import React from 'react';

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
            <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className={`${currentTheme.card} border ${currentTheme.border} rounded-full p-2 flex items-center justify-center hover:scale-110 transition-all shadow-lg active:scale-95`}
                title="Change Theme"
            >
                <div className={`w-5 h-5 rounded-full ${themeColors[theme] || 'bg-slate-500'} shadow-sm`} />
            </button>

            {isThemeOpen && (
                <div className={`absolute right-0 mt-3 p-3 ${currentTheme.card} border ${currentTheme.border} rounded-2xl shadow-2xl z-50 backdrop-blur-md bg-opacity-95 animate-scale-in origin-top-right min-w-[180px]`}>
                    <div className="grid grid-cols-4 gap-3">
                        {Object.entries(themeColors).map(([t, colorClass]) => (
                            <button
                                key={t}
                                onClick={() => handleThemeSelect(t)}
                                className={`w-8 h-8 rounded-full ${colorClass} transition-all hover:scale-110 hover:shadow-lg flex items-center justify-center ${theme === t ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110' : ''}`}
                                title={t.charAt(0).toUpperCase() + t.slice(1)}
                            >
                                {theme === t && (
                                    <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
