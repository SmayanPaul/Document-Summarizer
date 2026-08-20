import React from 'react';

/**
 * KeyPoints Component
 * Classified intelligence format KEY INSIGHTS & MAIN TAKEAWAY panels.
 */
export default function KeyPoints({ keyPoints = [], takeaways = '' }) {
  if (!keyPoints || keyPoints.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* KEY INSIGHTS */}
      <div className="bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] p-6 space-y-4 font-mono transition-colors duration-150">
        <div className="border-b border-[#d0d0d0] dark:border-[#202020] pb-3 flex items-center justify-between">
          <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[#111111] dark:text-[#f5f5f5]">
            KEY INSIGHTS
          </h3>
          <span className="text-[11px] text-[#666666] dark:text-[#7a7a7a]">
            [{keyPoints.length} ITEMS EXTRACTED]
          </span>
        </div>

        <div className="divide-y divide-[#d0d0d0] dark:divide-[#202020]">
          {keyPoints.map((point, index) => {
            const num = String(index + 1).padStart(2, '0');
            return (
              <div key={index} className="py-3.5 first:pt-0 last:pb-0 flex items-start space-x-4">
                <span className="font-display font-bold text-base sm:text-lg text-[#fc6e1c] dark:text-[#ff6b2c] flex-shrink-0 leading-none pt-0.5">
                  {num}
                </span>
                <p className="text-xs sm:text-sm text-[#111111] dark:text-[#f5f5f5] leading-relaxed">
                  {point}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN TAKEAWAY */}
      {takeaways && (
        <div className="bg-[#f6f6f6] dark:bg-[#0f0f0f] border border-[#d0d0d0] dark:border-[#202020] border-l-2 border-l-[#fc6e1c] dark:border-l-[#ff6b2c] p-6 space-y-2 font-mono transition-colors duration-150">
          <h4 className="font-display font-bold text-xs uppercase tracking-widest text-[#fc6e1c] dark:text-[#ff6b2c]">
            MAIN TAKEAWAY
          </h4>
          <p className="text-xs sm:text-sm text-[#111111] dark:text-[#f5f5f5] leading-relaxed">
            {takeaways}
          </p>
        </div>
      )}
    </div>
  );
}
