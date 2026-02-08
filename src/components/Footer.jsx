import React, { useState } from 'react';
import { Linkedin, Mail, Copy, Check } from 'lucide-react';

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
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Contact Section */}
                <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium ${currentTheme.textMuted}`}>Developed by</span>
                    <a
                        href="https://www.linkedin.com/in/shambhu-jagtap/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-1.5 text-xs font-semibold ${currentTheme.textSecondary} ${currentTheme.accentHover} transition-colors`}
                    >
                        Shambhu Jagtap
                        <Linkedin className="w-3.5 h-3.5" />
                    </a>
                </div>

                {/* Feedback Section */}
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-3">
                        <a
                            href={`mailto:${email}?subject=RSVP Reader - Feedback/Bug`}
                            className={`flex items-center gap-1.5 text-xs font-semibold ${currentTheme.textSecondary} ${currentTheme.accentHover} transition-colors group`}
                        >
                            {email}
                            <Mail className="w-3 h-3" />
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className={`p-1 rounded-md hover:bg-white/5 transition-colors relative group`}
                            title="Copy email"
                        >
                            {copied ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                                <Copy className={`w-3 h-3 ${currentTheme.textMuted} group-hover:text-white transition-colors`} />
                            )}
                            {copied && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-[10px] text-white rounded shadow-lg animate-bounce">
                                    Copied!
                                </span>
                            )}
                        </button>
                    </div>
                    <div className={`text-[10px] ${currentTheme.textMuted} opacity-60`}>
                        Report a bug or request a feature
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
