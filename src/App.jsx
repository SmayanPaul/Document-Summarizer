import React from 'react';
import Home from './pages/Home';
import GridBackground from "./components/GridBackground";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#e4e4e4] dark:bg-[#080808] text-[#111111] dark:text-[#f5f5f5] flex flex-col justify-between selection:bg-[#fc6e1c] dark:selection:bg-[#ff6b2c] selection:text-white dark:selection:text-black font-mono transition-colors duration-150">
      {/* Background Grid */}



      <main className="relative z-10 flex-grow">
        <Home />
      </main>
      <footer className="relative z-10 border-t border-[#d0d0d0] dark:border-[#202020] py-4 text-center text-[10px] font-mono uppercase text-[#666666] dark:text-[#7a7a7a] bg-[#f6f6f6] dark:bg-[#0f0f0f] transition-colors duration-150">
        DOCUMENT INTELLIGENCE WORKSTATION &bull; INDUSTRIAL CONTROL INTERFACE
      </footer>
      <GridBackground />
    </div>
  );
}
