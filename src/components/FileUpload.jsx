import React from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ fileName, currentTheme, handleFileUpload, compact = false }) => {
    if (compact && fileName) {
        return (
            <div className="flex items-center gap-3">
                <span className={`text-sm ${currentTheme.textSecondary} max-w-[150px] truncate`}>{fileName}</span>
                <label className={`text-xs ${currentTheme.accent} ${currentTheme.accentHover} cursor-pointer flex items-center gap-1.5 font-medium px-2 py-1 rounded bg-white/5`}>
                    <Upload className="w-3 h-3" />
                    Change
                    <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
            </div>
        );
    }

    if (compact && !fileName) {
        return (
            <label className={`text-sm ${currentTheme.textSecondary} hover:${currentTheme.text} cursor-pointer flex items-center gap-2 transition-colors`}>
                <Upload className="w-4 h-4" />
                Upload Text
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>
        );
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={`${currentTheme.card} rounded-[4rem] shadow-2xl p-24 flex flex-col items-center justify-center border border-white/5 hover:border-white/10 transition-all group max-w-4xl w-full mx-12`}>
                <div className={`p-10 rounded-[2.5rem] bg-white/5 mb-10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}>
                    <Upload className={`w-24 h-24 ${currentTheme.accent}`} />
                </div>
                <h2 className={`text-6xl font-black tracking-tighter ${currentTheme.text} mb-4 text-center`}>
                    READY TO <span className={currentTheme.accent}>READ?</span>
                </h2>
                <p className={`text-xl ${currentTheme.textMuted} mb-12 text-center max-w-xl font-medium leading-relaxed opacity-80`}>
                    Unlock the power of speed reading. Upload any text file and experience a distraction-free, lightning-fast reading environment.
                </p>
                <label className={`px-16 py-8 rounded-[2rem] ${currentTheme.primary} ${currentTheme.text} cursor-pointer font-black text-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${currentTheme.primaryShadow}`}>
                    <Upload className="w-8 h-8 stroke-[3]" />
                    CHOOSE YOUR FILE
                    <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};

export default FileUpload;
