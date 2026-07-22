import React from 'react';
import { useTheme } from './ThemeContext';

interface NavbarProps {
  onNavigate: (view: 'home' | 'contact') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  
  const handleScroll = (id: string) => {
    onNavigate('home');
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
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
    <nav className="sticky top-0 z-50 bg-brutal-bg/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        <div 
          onClick={() => handleScroll('home')} 
          className="text-xl font-black text-accent uppercase tracking-tight cursor-pointer select-none hover:text-white transition-colors"
        >
          NEEL
        </div>

        <div className="flex items-center gap-8">
           <div className="hidden md:flex gap-8 text-sm font-bold text-brutal-gray uppercase tracking-wider">
             <button onClick={() => handleScroll('about')} className="hover:text-accent transition-colors cursor-pointer">About</button>
             <button onClick={() => handleScroll('projects')} className="hover:text-accent transition-colors cursor-pointer">Projects</button>
             <button onClick={() => handleScroll('skills')} className="hover:text-accent transition-colors cursor-pointer">Skills</button>
           </div>
           
           <div className="flex gap-4 items-center">
             <button
               onClick={toggleTheme}
               className="text-xs font-mono font-bold text-brutal-gray hover:text-accent transition-colors cursor-pointer flex items-center gap-2"
             >
               {theme === 'noir' ? '[NOIR]' : '[BRUTAL]'}
             </button>

             <button 
               onClick={() => onNavigate('contact')}
               className="px-5 py-2 rounded-full border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-brutal-bg hover:border-accent transition-all duration-300 cursor-pointer"
             >
               Contact
             </button>
           </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
