import React from 'react';
import { ArrowUpRight, Github, Box } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-brutal-bg border-b border-zinc-800 px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-black text-magenta uppercase tracking-tighter mb-16 border-b-4 border-magenta pb-4 inline-block w-full">
          Featured Works
        </h2>

        {/* 
           Using a layout that accommodates a single featured project effectively 
           while maintaining grid structure for future additions 
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* PROJECT 1: Tribal Treasures */}
          <div className="group relative bg-brutal-card border-2 border-magenta transition-all duration-300 hover:shadow-brutal hover:-translate-y-2 flex flex-col h-full lg:col-span-2 lg:flex-row lg:h-auto">
            
            {/* Visual Top (Desktop: Left) */}
            <div className="h-48 lg:h-auto lg:w-2/5 bg-zinc-900 border-b-2 lg:border-b-0 lg:border-r-2 border-magenta flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 bg-magenta/5 group-hover:bg-magenta/10 transition-colors"></div>
               {/* Abstract geometric representation */}
               <Box size={80} className="text-magenta opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
               <div className="absolute bottom-2 right-2 text-[10px] bg-black text-magenta px-2 py-1 font-bold border border-magenta">
                 AR + WEB3
               </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-3xl font-black text-white uppercase leading-none group-hover:text-magenta transition-colors">
                   Tribal Treasures
                 </h3>
                 <span className="text-xs font-bold text-brutal-gray border border-brutal-gray px-2 py-1">2025</span>
              </div>
              
              <p className="text-brutal-gray text-sm font-mono mb-6 leading-relaxed max-w-xl">
                A full-stack AR-enabled e-commerce marketplace celebrating Rathwa tribal art. 
                Features 60fps AR.js rendering, Polygon smart contracts for authenticity, and 
                gamified learning modules. Built at SMART Gujarat Hackathon 2025.
              </p>

              <div className="space-y-6 mt-auto">
                <div className="flex flex-wrap gap-2">
                   {['Next.js', 'Solidity', 'AR.js', 'Three.js', 'MongoDB', 'AWS S3'].map(tech => (
                     <span key={tech} className="text-[10px] font-bold text-magenta border border-magenta px-2 py-1 uppercase hover:bg-magenta hover:text-black transition-colors cursor-default">
                       {tech}
                     </span>
                   ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800 max-w-md">
                   <a href="https://github.com/NboTop/tribe" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-white text-sm font-bold text-white hover:bg-white hover:text-black transition-colors group/link">
                     <Github size={16} /> CODE <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                   </a>
                   <a href="#" className="group/btn relative flex items-center justify-center gap-2 px-4 py-2 overflow-hidden border-2 border-magenta text-sm font-bold text-magenta hover:text-black transition-colors">
                     <div className="absolute inset-0 bg-magenta translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                     <div className="relative z-10 flex items-center gap-2">
                        LIVE <ArrowUpRight size={16} />
                     </div>
                   </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Placeholder for "Coming Soon" or simple statement to fill grid if desired, 
              or we leave it single. A filler card looks good in brutalist layouts. */}
          <div className="border-2 border-zinc-800 p-8 flex flex-col justify-center items-center text-center opacity-50 hover:opacity-100 transition-opacity hover:border-brutal-gray border-dashed">
            <h3 className="text-xl font-bold text-brutal-gray uppercase mb-2">More in the lab</h3>
            <p className="text-xs font-mono text-zinc-500">
               // Working on new ML models<br/>
               // Optimization algorithms
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;