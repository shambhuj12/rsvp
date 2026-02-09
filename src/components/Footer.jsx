import React from 'react';
import { Github } from 'lucide-react';

const Footer = ({ currentTheme }) => {
    return (
        <footer className={`w-full py-4 px-8 border-t ${currentTheme.border} ${currentTheme.card} transition-all duration-300`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Contact Section */}
                <div className="flex flex-col items-center md:items-start gap-1">
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${currentTheme.textMuted} opacity-40`}>
                        Developed by
                    </span>
                    <a
                        href="https://www.linkedin.com/in/shambhu-jagtap/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-1.5 text-xs font-semibold ${currentTheme.textSecondary} ${currentTheme.accentHover} transition-colors`}
                    >
                        Shambhu Jagtap
                        <svg
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>

                {/* Collaboration Section */}
                <div className="flex items-center gap-3">
                    <span className={`text-xs ${currentTheme.textMuted}`}>
                        Want to contribute?
                    </span>
                    <a
                        href="https://github.com/shambhuj12/rsvp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-2 text-xs font-bold ${currentTheme.textSecondary} ${currentTheme.accentHover} bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-all border border-transparent ${currentTheme.accentHover.replace('text', 'border')}`}
                    >
                        <Github className="w-3.5 h-3.5" />
                        Collab & Add Features
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
