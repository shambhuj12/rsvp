import React from 'react';
import { Upload, FileText } from 'lucide-react';

const FileUpload = ({ fileName, currentTheme, handleFileUpload, loadSample, compact = true }) => {
    if (fileName) {
        return (
            <div className="flex items-center gap-3">
                <span className={`text-sm ${currentTheme.textSecondary} max-w-[150px] truncate`}>{fileName}</span>
                <label className={`text-xs ${currentTheme.accent} ${currentTheme.accentHover} cursor-pointer flex items-center gap-1.5 font-bold px-2.5 py-1.5 rounded bg-white/5 border ${currentTheme.border} hover:bg-white/10 hover:scale-105 active:scale-95 transition-all`}>
                    <Upload className="w-3 h-3" />
                    CHANGE
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

    return (
        <div className="flex items-center gap-3">
            <button
                onClick={loadSample}
                className={`text-sm ${currentTheme.textMuted} hover:${currentTheme.text} hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 transition-all font-bold px-3 py-2 rounded-xl hover:bg-white/5`}
            >
                <FileText className="w-4 h-4" />
                USE SAMPLE
            </button>
            <div className={`h-6 w-[1px] ${currentTheme.border}`}></div>
            <label className={`text-sm ${currentTheme.accent} hover:scale-105 active:scale-95 hover:shadow-lg cursor-pointer flex items-center gap-2.5 transition-all font-black bg-white/5 px-4 py-2 rounded-xl border-2 border-dashed ${currentTheme.border} hover:border-white/20`}>
                <Upload className="w-4 h-4 stroke-[3]" />
                UPLOAD TEXT FILE
                <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>
        </div>
    );
};

export default FileUpload;
