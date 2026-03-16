import React from 'react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'contact') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  
  const handleScroll = (id: string) => {
    // If we are not on home view, navigate to home first
    onNavigate('home');
    
    // Slight delay to allow view change if needed, then scroll (cool laga)
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Height of navbar + buffer
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 bg-brutal-bg/95 backdrop-blur border-b border-magenta/20 py-4 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        <div 
          onClick={() => handleScroll('home')} 
          className="text-xl font-black text-magenta uppercase tracking-tighter cursor-pointer select-none hover:text-white transition-colors"
        >
          NEEL
        </div>

        <div className="flex items-center gap-8">
           <div className="hidden md:flex gap-8 text-sm font-bold text-brutal-gray uppercase tracking-wider">
             <button onClick={() => handleScroll('about')} className="hover:text-magenta transition-colors cursor-pointer">About</button>
             <button onClick={() => handleScroll('projects')} className="hover:text-magenta transition-colors cursor-pointer">Projects</button>
             <button onClick={() => handleScroll('skills')} className="hover:text-magenta transition-colors cursor-pointer">Skills</button>
           </div>
           
           <button 
             onClick={() => onNavigate('contact')}
             className="group relative px-5 py-2 overflow-hidden border-2 border-magenta text-magenta text-xs font-bold uppercase hover:text-black transition-colors cursor-pointer"
           >
             <div className="absolute inset-0 bg-magenta translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
             <span className="relative z-10">Contact</span>
           </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;