import React, { useState } from 'react';

/**
 * SummaryCard Component
 * Executive Summary Panel formatted as a classified intelligence report.
 */
export default function SummaryCard({ summary, lengthMode }) {
  const [copied, setCopied] = useState(false);

  if (!summary) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] p-6 space-y-4 font-mono transition-colors duration-150">
      <div className="flex items-center justify-between border-b border-[#d0d0d0] dark:border-[#202020] pb-3">
        <div className="flex items-center space-x-3">
          <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[#111111] dark:text-[#f5f5f5]">
            EXECUTIVE SUMMARY
          </h3>
          <span className="text-[10px] font-mono text-[#fc6e1c] dark:text-[#ff6b2c] border border-[#fc6e1c]/40 dark:border-[#ff6b2c]/40 px-2 py-0.5 uppercase bg-[#fc6e1c]/10 dark:bg-[#ff6b2c]/10">
            {lengthMode} MODE
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1 text-[11px] font-mono uppercase text-[#666666] dark:text-[#7a7a7a] hover:text-[#fc6e1c] dark:hover:text-[#ff6b2c] border border-[#d0d0d0] dark:border-[#202020] hover:border-[#fc6e1c] dark:hover:border-[#ff6b2c] bg-[#e4e4e4] dark:bg-[#080808] transition-colors"
        >
          {copied ? <span className="text-[#fc6e1c] dark:text-[#ff6b2c] font-bold">COPIED</span> : '[ COPY REPORT ]'}
        </button>
      </div>

      <div className="p-4 bg-[#e4e4e4] dark:bg-[#080808] border border-[#d0d0d0] dark:border-[#202020] text-[#111111] dark:text-[#f5f5f5] text-xs sm:text-sm leading-relaxed">
        {summary}
      </div>

      <div className="pt-2 border-t border-[#d0d0d0] dark:border-[#202020] flex items-center justify-between text-[11px] text-[#666666] dark:text-[#7a7a7a]">
        <span>WORD COUNT: <strong className="text-[#111111] dark:text-[#f5f5f5]">{wordCount}</strong></span>
        <span>READ TIME: <strong className="text-[#111111] dark:text-[#f5f5f5]">{readTimeMinutes} MIN</strong></span>
      </div>
    </div>
  );
}
