import React from 'react';
import { Code2, Cpu, Database, Hexagon, Layers } from 'lucide-react';

const BackgroundEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 1. Base Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-[#131b24] to-midnight z-0"></div>

      {/* 2. Animated Blobs - Deep and Subtle */}
      {/* Top Left Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
      
      {/* Bottom Right Blob */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-2000"></div>

      {/* Center Blob (Very faint) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-slate-800/10 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
      
      {/* 3. Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1]"></div>
      <div 
        className="absolute inset-0 opacity-[0.03] z-[1]" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* 4. Floating Tech Elements */}
      {/* We use specific Tailwind animations defined in index.html for floating effect */}
      
      {/* Element 1: Code Bracket */}
      <div className="absolute top-[15%] right-[15%] text-slate-700/30 animate-float">
        <Code2 size={64} strokeWidth={1} />
      </div>

      {/* Element 2: CPU Chip */}
      <div className="absolute bottom-[20%] left-[10%] text-slate-700/20 animate-float-delayed">
        <Cpu size={80} strokeWidth={1} />
      </div>

      {/* Element 3: Database/Geometric */}
      <div className="absolute top-[30%] left-[20%] text-slate-700/10 animate-float duration-[10s]">
        <Database size={48} strokeWidth={1} />
      </div>

      {/* Element 4: Hexagon */}
      <div className="absolute bottom-[30%] right-[25%] text-slate-700/20 animate-pulse-slow">
        <Hexagon size={120} strokeWidth={0.5} />
      </div>
      
       {/* Element 5: Layers */}
       <div className="absolute top-[10%] left-[45%] text-slate-800/30 animate-float duration-[12s]">
        <Layers size={40} strokeWidth={1} />
      </div>

      {/* 5. Vignette for focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-midnight/80 z-[2]"></div>
    </div>
  );
};

export default BackgroundEffects;