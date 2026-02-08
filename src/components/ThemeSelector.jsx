import React from 'react';

const ThemeSelector = ({ currentTheme, theme, isThemeOpen, setIsThemeOpen, handleThemeSelect }) => {
    return (
        <div className="relative">
            <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className={`${currentTheme.card} border ${currentTheme.border} rounded-xl px-4 py-2 flex items-center gap-2 ${currentTheme.text} hover:scale-105 transition-all shadow-lg active:scale-95`}
            >
                <div className={`w-3 h-3 rounded-full ${theme === 'blue' ? 'bg-blue-500' :
                        theme === 'purple' ? 'bg-purple-500' :
                            theme === 'green' ? 'bg-emerald-500' :
                                theme === 'orange' ? 'bg-orange-500' :
                                    theme === 'rose' ? 'bg-rose-500' :
                                        theme === 'grey' ? 'bg-neutral-500' :
                                            'bg-zinc-500'
                    }`} />
                <span className="text-sm font-medium capitalize">{theme}</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isThemeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isThemeOpen && (
                <div className={`absolute right-0 mt-3 w-48 ${currentTheme.card} border ${currentTheme.border} rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-md bg-opacity-80 p-1`}>
                    {['blue', 'purple', 'green', 'orange', 'rose', 'grey', 'black'].map((t) => (
                        <button
                            key={t}
                            onClick={() => handleThemeSelect(t)}
                            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 rounded-xl transition-all ${theme === t ? 'bg-white/5' : ''}`}
                        >
                            <div className={`w-4 h-4 rounded-full ${t === 'blue' ? 'bg-blue-500' :
                                    t === 'purple' ? 'bg-purple-500' :
                                        t === 'green' ? 'bg-emerald-500' :
                                            t === 'orange' ? 'bg-orange-500' :
                                                t === 'rose' ? 'bg-rose-500' :
                                                    t === 'grey' ? 'bg-neutral-500' :
                                                        'bg-zinc-600 border border-zinc-500'
                                }`} />
                            <span className={`text-sm tracking-wide ${currentTheme.text} capitalize`}>{t}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
