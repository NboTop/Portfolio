import React from 'react';
import { ArrowDownRight, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center border-b-2 border-magenta p-6 md:p-12 overflow-hidden scroll-mt-20 group">
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 z-[1]"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Terminal Header Decoration */}
        <div className="mb-8 flex items-center text-magenta/60 font-mono text-sm h-6">
          <div id="hero-terminal-text" className="flex items-center">
            <Terminal size={16} className="inline mr-2" />
            <span className="inline-block leading-none">neel@dev:~/portfolio $ ./init_profile.sh</span>
          </div>
        </div>

        {/* Massive Heading */}
        <h1 className="text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tighter text-magenta mb-8 select-none">
          <span className="block">YEAH.</span>
          <span className="block">I CODE.</span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 border-l-4 border-brutal-text pl-6 md:pl-8 ml-2 mt-12">
          
          {/* Subheading */}
          <div className="max-w-xl">
            <h2 className="text-white text-lg md:text-xl font-bold uppercase tracking-wide leading-relaxed mb-2">
              Computer Engineering Student
            </h2>
            <p className="text-brutal-gray font-mono text-base md:text-lg">
              FULL-STACK. DSA ENTHUSIAST.<br/>
              BUILDING SYSTEMS THAT SCALE.
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-5 bg-transparent overflow-hidden border-2 border-magenta transition-all duration-300 hover:shadow-[8px_8px_0px_#FF00FF] hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-none"
          >
            {/* Hover Fill Background */}
            <div className="absolute inset-0 bg-magenta translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-3 text-magenta group-hover:text-black font-bold uppercase tracking-widest">
              <span>See My Work</span>
              <ArrowDownRight size={20} className="group-hover:rotate-[-45deg] transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
      
      {/* Marquee Footer for Hero */}
      <div className="absolute bottom-0 left-0 w-full h-12 border-t border-magenta bg-brutal-card flex items-center overflow-hidden z-20">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-brutal-gray font-mono text-xs uppercase tracking-[0.2em]">
          {Array(10).fill(" // Computer Engineering Fresher // Data Science & Machine Learning Enthusiast // Python & Pandas Skilled // ").map((text, i) => (
             <span key={i} className="text-magenta/50">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;