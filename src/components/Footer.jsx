import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';

const Footer = ({ currentTheme }) => {
    const [copied, setCopied] = useState(false);
    const email = "shambhujagtapcoc@gmail.com";

    const copyToClipboard = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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

                {/* Feedback Section */}
                <div className="flex items-center gap-3">
                    <div className={`text-xs font-semibold ${currentTheme.textSecondary}`}>
                        {email}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className={`p-1.5 rounded-md hover:bg-white/5 transition-colors relative group`}
                        title="Copy email"
                    >
                        {copied ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                            <Copy className={`w-3 h-3 ${currentTheme.textMuted} group-hover:text-white transition-colors`} />
                        )}
                        {copied && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-[10px] text-white rounded shadow-lg animate-bounce whitespace-nowrap">
                                Copied!
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
