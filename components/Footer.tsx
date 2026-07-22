import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('neel.voidlogic@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-brutal-bg border-t border-white/10 py-12 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-full px-6 py-3">
        <span className="text-sm font-mono text-white">neel.voidlogic@gmail.com</span>
        <button 
          onClick={handleCopy}
          className="text-accent hover:text-white transition-colors flex items-center justify-center bg-accent/10 p-2 rounded-full hover:bg-accent hover:text-brutal-bg"
          title="Copy email to clipboard"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs md:text-sm font-mono text-brutal-gray uppercase tracking-widest">
          NEEL — © 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
