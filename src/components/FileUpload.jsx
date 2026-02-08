import React from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ fileName, currentTheme, handleFileUpload }) => {
    return (
        <>
            {!fileName ? (
                <div className={`${currentTheme.card} rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center border ${currentTheme.border}`}>
                    <Upload className={`w-16 h-16 mb-4 ${currentTheme.accent}`} />
                    <h2 className={`text-2xl font-light ${currentTheme.text} mb-2`}>Upload a text file</h2>
                    <p className={`text-sm ${currentTheme.textMuted} mb-6`}>Select a .txt file to start speed reading</p>
                    <label className={`px-6 py-3 rounded-lg ${currentTheme.primary} ${currentTheme.text} cursor-pointer font-medium hover:opacity-90 transition-opacity flex items-center gap-2`}>
                        <Upload className="w-5 h-5" />
                        Choose File
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            ) : (
                <div className={`${currentTheme.card} rounded-xl shadow-lg p-4 flex items-center justify-between border ${currentTheme.border}`}>
                    <span className={`text-sm ${currentTheme.textSecondary} truncate`}>{fileName}</span>
                    <label className={`text-sm ${currentTheme.accent} ${currentTheme.accentHover} cursor-pointer flex items-center gap-2 font-medium`}>
                        <Upload className="w-4 h-4" />
                        Change
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            )}
        </>
    );
};

export default FileUpload;
