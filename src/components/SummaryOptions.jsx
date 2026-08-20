import React from 'react';
import { useTheme } from '../context/ThemeContext';

const OPTIONS = [
  { id: 'short', label: '[ SHORT ]' },
  { id: 'medium', label: '[ MEDIUM ]' },
  { id: 'long', label: '[ DETAILED ]' }
];

/**
 * SummaryOptions Component
 * Industrial segmented controls and primary RUN ANALYSIS action button.
 */
export default function SummaryOptions({
  selectedMode,
  onSelectMode,
  onGenerate,
  disabled,
  hasContent
}) {
  const { theme } = useTheme();

  return (
    <div className="bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] p-5 space-y-5 transition-colors duration-150">
      <div>
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#666666] dark:text-[#7a7a7a] mb-3">
          ANALYSIS MODE:
        </div>

        {/* Industrial Segmented Controls */}
        <div className="grid grid-cols-3 gap-2">
          {OPTIONS.map((opt) => {
            const isSelected = selectedMode === (opt.id === 'long' ? 'long' : opt.id);
            const accentColor = theme === 'dark' ? '#ff6b2c' : '#fc6e1c';
            const selectedBg = accentColor;
            const selectedText = theme === 'dark' ? '#000000' : '#ffffff';
            const inactiveText = theme === 'dark' ? '#7a7a7a' : '#666666';
            const inactiveBorder = theme === 'dark' ? '#202020' : '#d0d0d0';

            return (
              <button
                key={opt.id}
                type="button"
                disabled={disabled}
                onClick={() => onSelectMode(opt.id === 'long' ? 'long' : opt.id)}
                style={
                  isSelected
                    ? { background: selectedBg, color: selectedText, borderColor: selectedBg, fontWeight: '700' }
                    : { background: 'transparent', color: inactiveText, borderColor: inactiveBorder }
                }
                className={`py-2.5 px-2 text-xs font-mono tracking-wider border transition-colors duration-150 rounded-none ${
                  disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#fc6e1c] dark:hover:border-[#ff6b2c]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2 border-t border-[#d0d0d0] dark:border-[#202020]">
        <button
          type="button"
          disabled={disabled || !hasContent}
          onClick={onGenerate}
          className={`w-full py-3 px-4 text-xs font-mono font-bold tracking-widest uppercase border transition-all duration-150 rounded-none ${
            disabled || !hasContent
              ? 'border-[#d0d0d0] dark:border-[#202020] bg-transparent text-[#666666] dark:text-[#7a7a7a] cursor-not-allowed opacity-50'
              : 'border-[#fc6e1c] dark:border-[#ff6b2c] bg-transparent text-[#fc6e1c] dark:text-[#ff6b2c] hover:bg-[#fc6e1c] dark:hover:bg-[#ff6b2c] hover:text-white dark:hover:text-black cursor-pointer'
          }`}
        >
          {disabled ? 'ANALYZING DOCUMENT...' : 'RUN ANALYSIS →'}
        </button>
      </div>
    </div>
  );
}
