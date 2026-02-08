import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Upload, Minus, Plus } from 'lucide-react';

export default function RSVPReader() {
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [fileName, setFileName] = useState('');
  const [theme, setTheme] = useState('blue');
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const intervalRef = useRef(null);

  const themes = {
    blue: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900',
      border: 'border-slate-800',
      text: 'text-slate-50',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-500',
      accent: 'text-blue-400',
      accentHover: 'hover:text-blue-300',
      button: 'bg-slate-800 hover:bg-slate-700',
      buttonIcon: 'text-blue-400',
      primary: 'bg-blue-700 hover:bg-blue-600',
      primaryShadow: 'shadow-black/50',
      progressBg: 'bg-slate-800',
      progressFill: 'bg-blue-600',
      progressGlow: 'shadow-blue-900/50',
      arrow: 'border-t-blue-500',
    },
    purple: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900',
      border: 'border-slate-800',
      text: 'text-slate-50',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-500',
      accent: 'text-purple-400',
      accentHover: 'hover:text-purple-300',
      button: 'bg-slate-800 hover:bg-slate-700',
      buttonIcon: 'text-purple-400',
      primary: 'bg-purple-700 hover:bg-purple-600',
      primaryShadow: 'shadow-black/50',
      progressBg: 'bg-slate-800',
      progressFill: 'bg-purple-600',
      progressGlow: 'shadow-purple-900/50',
      arrow: 'border-t-purple-500',
    },
    green: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900',
      border: 'border-slate-800',
      text: 'text-slate-50',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-500',
      accent: 'text-emerald-400',
      accentHover: 'hover:text-emerald-300',
      button: 'bg-slate-800 hover:bg-slate-700',
      buttonIcon: 'text-emerald-400',
      primary: 'bg-emerald-700 hover:bg-emerald-600',
      primaryShadow: 'shadow-black/50',
      progressBg: 'bg-slate-800',
      progressFill: 'bg-emerald-600',
      progressGlow: 'shadow-emerald-900/50',
      arrow: 'border-t-emerald-500',
    },
    orange: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900',
      border: 'border-slate-800',
      text: 'text-slate-50',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-500',
      accent: 'text-orange-400',
      accentHover: 'hover:text-orange-300',
      button: 'bg-slate-800 hover:bg-slate-700',
      buttonIcon: 'text-orange-400',
      primary: 'bg-orange-700 hover:bg-orange-600',
      primaryShadow: 'shadow-black/50',
      progressBg: 'bg-slate-800',
      progressFill: 'bg-orange-600',
      progressGlow: 'shadow-orange-900/50',
      arrow: 'border-t-orange-500',
    },
    rose: {
      bg: 'bg-slate-950',
      card: 'bg-slate-900',
      border: 'border-slate-800',
      text: 'text-slate-50',
      textSecondary: 'text-slate-200',
      textMuted: 'text-slate-500',
      accent: 'text-rose-400',
      accentHover: 'hover:text-rose-300',
      button: 'bg-slate-800 hover:bg-slate-700',
      buttonIcon: 'text-rose-400',
      primary: 'bg-rose-700 hover:bg-rose-600',
      primaryShadow: 'shadow-black/50',
      progressBg: 'bg-slate-800',
      progressFill: 'bg-rose-600',
      progressGlow: 'shadow-rose-900/50',
      arrow: 'border-t-rose-500',
    },
    grey: {
      bg: 'bg-neutral-900',
      card: 'bg-neutral-800',
      border: 'border-neutral-700',
      text: 'text-neutral-100',
      textSecondary: 'text-neutral-200',
      textMuted: 'text-neutral-500',
      accent: 'text-neutral-400',
      accentHover: 'hover:text-neutral-300',
      button: 'bg-neutral-700 hover:bg-neutral-600',
      buttonIcon: 'text-neutral-300',
      primary: 'bg-neutral-600 hover:bg-neutral-500',
      primaryShadow: 'shadow-neutral-900/50',
      progressBg: 'bg-neutral-700',
      progressFill: 'bg-neutral-500',
      progressGlow: 'shadow-neutral-500/50',
      arrow: 'border-t-neutral-400',
    },
    black: {
      bg: 'bg-black',
      card: 'bg-zinc-950',
      border: 'border-zinc-900',
      text: 'text-zinc-100',
      textSecondary: 'text-zinc-200',
      textMuted: 'text-zinc-600',
      accent: 'text-zinc-400',
      accentHover: 'hover:text-zinc-300',
      button: 'bg-zinc-900 hover:bg-zinc-800',
      buttonIcon: 'text-zinc-400',
      primary: 'bg-zinc-700 hover:bg-zinc-600',
      primaryShadow: 'shadow-black/50',
      progressBg: 'bg-zinc-900',
      progressFill: 'bg-zinc-600',
      progressGlow: 'shadow-zinc-600/50',
      arrow: 'border-t-zinc-500',
    },
  };

  const currentTheme = themes[theme];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setText(content);
        const wordArray = content.split(/\s+/).filter(word => word.length > 0);
        setWords(wordArray);
        setCurrentIndex(0);
        setIsPlaying(false);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (isPlaying && currentIndex < words.length) {
      const interval = 60000 / wpm;
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, wpm, currentIndex, words.length]);

  const togglePlay = () => {
    if (words.length === 0) return;
    setIsPlaying(!isPlaying);
  };

  const goBack = () => {
    setCurrentIndex(prev => Math.max(0, prev - 10));
    setIsPlaying(false);
  };

  const resetReading = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const adjustWpm = (delta) => {
    setWpm(prev => Math.max(100, Math.min(1000, prev + delta)));
  };

  const handleProgressChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setCurrentIndex(newIndex);
    setIsPlaying(false);
  };

  const progress = words.length > 0 ? (currentIndex / words.length) * 100 : 0;

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsThemeOpen(false);
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} flex flex-col p-8`}>
      {/* Theme Selector - Top Right */}
      <div className="w-full max-w-3xl mx-auto mb-6 flex justify-end">
        <div className="relative">
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className={`${currentTheme.card} border ${currentTheme.border} rounded-lg px-4 py-2 flex items-center gap-2 ${currentTheme.text} hover:opacity-80 transition-all`}
          >
            <div className={`w-3 h-3 rounded-full ${
              theme === 'blue' ? 'bg-blue-500' : 
              theme === 'purple' ? 'bg-purple-500' : 
              theme === 'green' ? 'bg-emerald-500' : 
              theme === 'orange' ? 'bg-orange-500' : 
              theme === 'rose' ? 'bg-rose-500' :
              theme === 'grey' ? 'bg-neutral-500' :
              'bg-zinc-500'
            }`} />
            <span className="text-sm capitalize">{theme}</span>
            <svg className={`w-4 h-4 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isThemeOpen && (
            <div className={`absolute right-0 mt-2 w-40 ${currentTheme.card} border ${currentTheme.border} rounded-lg shadow-xl overflow-hidden z-10`}>
              <button
                onClick={() => handleThemeSelect('blue')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${theme === 'blue' ? 'bg-white/5' : ''}`}
              >
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span className={`text-sm ${currentTheme.text}`}>Blue</span>
              </button>
              <button
                onClick={() => handleThemeSelect('purple')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${theme === 'purple' ? 'bg-white/5' : ''}`}
              >
                <div className="w-4 h-4 rounded-full bg-purple-500" />
                <span className={`text-sm ${currentTheme.text}`}>Purple</span>
              </button>
              <button
                onClick={() => handleThemeSelect('green')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${theme === 'green' ? 'bg-white/5' : ''}`}
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500" />
                <span className={`text-sm ${currentTheme.text}`}>Green</span>
              </button>
              <button
                onClick={() => handleThemeSelect('orange')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${theme === 'orange' ? 'bg-white/5' : ''}`}
              >
                <div className="w-4 h-4 rounded-full bg-orange-500" />
                <span className={`text-sm ${currentTheme.text}`}>Orange</span>
              </button>
              <button
                onClick={() => handleThemeSelect('rose')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${theme === 'rose' ? 'bg-white/5' : ''}`}
              >
                <div className="w-4 h-4 rounded-full bg-rose-500" />
                <span className={`text-sm ${currentTheme.text}`}>Rose</span>
              </button>
              <button
                onClick={() => handleThemeSelect('grey')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${theme === 'grey' ? 'bg-white/5' : ''}`}
              >
                <div className="w-4 h-4 rounded-full bg-neutral-500" />
                <span className={`text-sm ${currentTheme.text}`}>Grey</span>
              </button>
              <button
                onClick={() => handleThemeSelect('black')}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors ${theme === 'black' ? 'bg-white/5' : ''}`}
              >
                <div className="w-4 h-4 rounded-full bg-zinc-600 border border-zinc-500" />
                <span className={`text-sm ${currentTheme.text}`}>Black</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto flex-1 flex items-center">
        <div className="w-full space-y-6">
          {/* File Info / Upload - Big when empty, small when file loaded */}
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

          {/* Word Display - Only show when file is loaded */}
          {fileName && (
            <>
              <div className={`${currentTheme.card} rounded-2xl shadow-2xl p-16 flex items-center justify-center min-h-[300px] border ${currentTheme.border}`}>
                <div className={`text-6xl font-light ${currentTheme.text} text-center break-words max-w-full`}>
                  {words[currentIndex] || ''}
                </div>
              </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustWpm(-50)}
                className={`p-2 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={words.length === 0}
              >
                <Minus className={`w-4 h-4 ${currentTheme.buttonIcon}`} />
              </button>
              <div className="text-center min-w-[90px]">
                <div className={`text-xl font-light ${currentTheme.text}`}>{wpm}</div>
                <div className={`text-xs ${currentTheme.accent}`}>WPM</div>
              </div>
              <button
                onClick={() => adjustWpm(50)}
                className={`p-2 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={words.length === 0}
              >
                <Plus className={`w-4 h-4 ${currentTheme.buttonIcon}`} />
              </button>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <button
                onClick={goBack}
                className={`p-3 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                title="Go back 10 words"
                disabled={words.length === 0}
              >
                <RotateCcw className={`w-5 h-5 ${currentTheme.buttonIcon}`} />
              </button>
              <button
                onClick={togglePlay}
                className={`p-4 rounded-lg ${currentTheme.primary} transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${currentTheme.primaryShadow}`}
                disabled={words.length === 0}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
              <button
                onClick={resetReading}
                className={`p-3 rounded-lg ${currentTheme.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                title="Reset to beginning"
                disabled={words.length === 0}
              >
                <RotateCcw className={`w-5 h-5 ${currentTheme.buttonIcon} rotate-180`} />
              </button>
            </div>
          </div>

          {/* Progress Bar - Simplified */}
          {words.length > 0 && (
            <div className={`${currentTheme.card} rounded-xl shadow-lg p-4 border ${currentTheme.border}`}>
              <div className="relative">
                {/* Arrow marker */}
                <div 
                  className={`absolute top-0 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent ${currentTheme.arrow} transition-all duration-300 pointer-events-none`}
                  style={{ 
                    left: `calc(${progress}% - 6px)`,
                    transform: 'translateY(-2px)'
                  }}
                />
                <div className="flex items-center gap-3 mb-3 mt-3">
                  <div className={`flex-1 h-1.5 ${currentTheme.progressBg} rounded-full overflow-hidden`}>
                    <div
                      className={`h-full ${currentTheme.progressFill} transition-all duration-300 shadow-lg ${currentTheme.progressGlow}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={`text-sm ${currentTheme.accent} font-medium min-w-[50px] text-right`}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={words.length - 1}
                  value={currentIndex}
                  onChange={handleProgressChange}
                  className="w-full h-6 bg-transparent appearance-none cursor-pointer absolute top-0 left-0 opacity-0"
                />
              </div>
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
