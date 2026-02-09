import React from 'react';

const Tooltip = ({ children, text, currentTheme, position = 'top' }) => {
    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    if (!text) return children;

    return (
        <div className="relative group/tooltip flex items-center justify-center">
            {children}
            <div className={`absolute ${positionClasses[position]} px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 ${currentTheme.bg} ${currentTheme.border} border shadow-xl backdrop-blur-md ${currentTheme.text} translate-y-1 group-hover/tooltip:translate-y-0`}>
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
