import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{ width: '40px', height: '40px' }}
      className="flex items-center justify-center border border-[#d0d0d0] dark:border-[#202020] bg-[#f6f6f6] dark:bg-[#0f0f0f] text-[#666666] dark:text-[#7a7a7a] hover:text-[#fc6e1c] dark:hover:text-[#ff6b2c] hover:border-[#fc6e1c] dark:hover:border-[#ff6b2c] transition-colors duration-150 rounded-none focus:outline-none"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-[#ff6b2c]" />
      ) : (
        <Moon className="w-4 h-4 text-[#fc6e1c]" />
      )}
    </button>
  );
}
