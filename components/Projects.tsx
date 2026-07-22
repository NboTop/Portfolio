import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, Box, X, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeRepo) {
      setIsLoading(true);
      fetch(`https://raw.githubusercontent.com/${activeRepo}/main/README.md`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch README');
          return res.text();
        })
        .then(text => setReadmeContent(text))
        .catch(err => setReadmeContent('> Error loading README. Ensure the repository has a `README.md` in the `main` branch.'))
        .finally(() => setIsLoading(false));
    } else {
      setReadmeContent('');
    }
  }, [activeRepo]);

  const closeModal = () => setActiveRepo(null);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-brutal-bg border-b border-white/5 px-6 md:px-12 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-black text-accent uppercase tracking-tight mb-16 border-b border-white/10 pb-4 inline-block w-full">
          Featured Works
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* PROJECT 1: Salt & Prepper */}
          <div 
            className={`group relative rounded-2xl bg-white/[0.02] border border-white/10 transition-all duration-300 hover:border-accent/25 hover:shadow-soft-hover hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full overflow-hidden opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '0.1s' }}
          >
            
            {/* Visual */}
            <div className="h-56 bg-white/[0.03] border-b border-white/10 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/[0.08] transition-colors"></div>
              <Box size={80} className="text-accent opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute bottom-3 right-3 text-[10px] bg-black/60 backdrop-blur text-accent px-3 py-1 rounded-full font-bold border border-white/10">
                QUIZ PLATFORM
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-black text-white uppercase leading-none group-hover:text-accent transition-colors">
                  Salt & Prepper
                </h3>
                <span className="text-xs font-bold text-brutal-gray border border-white/10 rounded-full px-3 py-1">2025</span>
              </div>
              
              <p className="text-brutal-gray text-sm font-mono mb-6 leading-relaxed max-w-xl">
                Role-based quiz platform built solo — admins create and publish quizzes,
                users attempt them and track scores. Designed the schema, built the API,
                wrote the frontend.
              </p>

              <div className="space-y-6 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Flask', 'SQLite', 'Jinja2', 'Bootstrap'].map(tech => (
                    <span key={tech} className="text-[10px] font-bold text-accent/90 border border-accent/20 rounded-full px-3 py-1 uppercase hover:bg-accent hover:text-brutal-bg transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                  <a href="https://github.com/NboTop/salt-and-prepper" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm font-bold text-white hover:bg-white hover:text-black transition-colors group/link">
                    <Github size={16} /> CODE <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                  </a>
                  <a href="https://salt-and-prepper-e9th.onrender.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-accent/30 text-sm font-bold text-accent hover:bg-accent hover:text-brutal-bg transition-colors">
                    LIVE <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* PROJECT 2: FIFA WC 2026 */}
          <div 
            onClick={() => setActiveRepo('NboTop/fifa-wc-2026')}
            className={`group relative rounded-2xl bg-white/[0.02] border border-white/10 transition-all duration-300 hover:border-accent/25 hover:shadow-soft-hover hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full overflow-hidden opacity-0 cursor-pointer ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            
            {/* Visual */}
            <div className="h-56 bg-black border-b border-white/10 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none mix-blend-overlay"></div>
              <img 
                src="/wc-intelligence.png" 
                alt="WC Intelligence Dashboard" 
                className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Box size={80} className="text-accent opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500 hidden absolute" />
              <div className="absolute bottom-3 right-3 z-20 text-[10px] bg-black/80 backdrop-blur text-accent px-3 py-1 rounded-full font-bold border border-white/10">
                PREDICTIVE ANALYTICS
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-black text-white uppercase leading-none group-hover:text-accent transition-colors">
                  WC Intelligence
                </h3>
                <span className="text-xs font-bold text-brutal-gray border border-white/10 rounded-full px-3 py-1">2026</span>
              </div>
              
              <p className="text-brutal-gray text-sm font-mono mb-6 leading-relaxed max-w-xl">
                Data-driven platform forecasting FIFA World Cup 2026 outcomes.
                Built with a Python ML backend and a responsive Vue.js frontend.
                Engineered for high performance and real-time data processing.
              </p>

              <div className="space-y-6 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {['Vue', 'Python', 'ML', 'Vercel'].map(tech => (
                    <span key={tech} className="text-[10px] font-bold text-accent/90 border border-accent/20 rounded-full px-3 py-1 uppercase hover:bg-accent hover:text-brutal-bg transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                  <a href="https://github.com/NboTop/fifa-wc-2026" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm font-bold text-white hover:bg-white hover:text-black transition-colors group/link">
                    <Github size={16} /> CODE <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                  </a>
                  <a href="https://worldcupintelligence.vercel.app" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-accent/30 text-sm font-bold text-accent hover:bg-accent hover:text-brutal-bg transition-colors">
                    LIVE <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Markdown Modal */}
      {activeRepo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-[#111111] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-white/[0.02]">
              <h3 className="text-white font-bold text-lg flex items-center gap-3">
                <Github size={20} className="text-accent" /> 
                {activeRepo}
              </h3>
              <button 
                onClick={closeModal}
                className="text-white/50 hover:text-accent transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-grow custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-48 text-accent/50 gap-4">
                  <Loader2 size={32} className="animate-spin" />
                  <span className="font-mono text-sm">Fetching README.md...</span>
                </div>
              ) : (
                <div className="markdown-body prose prose-invert prose-p:text-brutal-gray prose-headings:text-white prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md max-w-none">
                  <Markdown>{readmeContent}</Markdown>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
