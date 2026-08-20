import React from 'react';

/**
 * LoadingSpinner Component
 * Industrial terminal scanning status indicator.
 */
export default function LoadingSpinner({ message = 'PROCESSING...', progress = null }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] space-y-3 font-mono transition-colors duration-150">
      <div className="flex items-center space-x-2 text-[#fc6e1c] dark:text-[#ff6b2c]">
        <span className="inline-block w-2.5 h-2.5 bg-[#fc6e1c] dark:bg-[#ff6b2c] animate-ping"></span>
        <span className="font-display font-bold text-xs uppercase tracking-widest text-[#111111] dark:text-[#f5f5f5]">
          {message}
        </span>
      </div>

      {progress !== null && (
        <div className="w-full max-w-sm space-y-1.5 pt-2">
          <div className="w-full bg-[#e4e4e4] dark:bg-[#080808] border border-[#d0d0d0] dark:border-[#202020] h-2 p-0.5">
            <div
              className="bg-[#fc6e1c] dark:bg-[#ff6b2c] h-full transition-all duration-150"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#666666] dark:text-[#7a7a7a]">
            <span>TELEMETRY SCANNING</span>
            <span className="text-[#fc6e1c] dark:text-[#ff6b2c] font-bold">{progress}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
