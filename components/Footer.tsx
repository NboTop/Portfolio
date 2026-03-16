import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brutal-bg border-t-2 border-magenta py-12 text-center">
      <div className="container mx-auto px-6">
        <p className="text-xs md:text-sm font-mono text-brutal-gray uppercase tracking-widest">
           PRECISION PROMPTED & HAND-OPTIMIZED. © 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;