import React, { useState, useEffect } from 'react';
import { ArrowDownRight, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

const ROLES = [
  'Full Stack Engineer',
  'AI/ML Researcher',
  'Computer Engineering Student'
];

const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20; // max 10px shift
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentRole = ROLES[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting && currentText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setCurrentText(currentRole.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    };

    const timeout = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

  const [greeting, setGreeting] = useState('HELLO');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('GOOD MORNING');
    else if (hour >= 12 && hour < 18) setGreeting('GOOD AFTERNOON');
    else setGreeting('GOOD EVENING');
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col justify-center border-b border-white/5 p-6 md:p-12 overflow-hidden scroll-mt-20 group"
    >
      
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.07] z-[1] transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`
        }}
      ></div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto w-full transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Terminal Header Decoration */}
        <motion.div variants={itemVariants} className="mb-4 flex items-center text-accent/50 font-mono text-sm h-6">
          <div id="hero-terminal-text" className="flex items-center">
            <Terminal size={16} className="inline mr-2" />
            <span className="inline-block leading-none">neel@dev:~/portfolio $ ./init_profile.sh</span>
          </div>
        </motion.div>

        {/* Dynamic Greeting */}
        <motion.div variants={itemVariants} className="mb-2">
           <span className="text-white font-mono text-xl md:text-2xl uppercase tracking-widest">{greeting}, I'M NEEL.</span>
        </motion.div>

        {/* Massive Heading */}
        <motion.h1 variants={itemVariants} className="text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tight text-accent mb-8 select-none">
          <span className="block">BUILD.</span>
          <span className="block">SHIP.</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 border-l border-white/15 pl-6 md:pl-8 ml-2 mt-12">
          
          {/* Subheading */}
          <motion.div variants={itemVariants} className="max-w-xl">
            <h2 className="text-white text-lg md:text-xl font-bold uppercase tracking-wide leading-relaxed mb-2 flex items-center h-8">
              <span>{currentText}</span>
              <span className="w-2 h-5 md:h-6 bg-accent ml-2 animate-pulse"></span>
            </h2>
            <p className="text-brutal-gray font-mono text-base md:text-lg">
              FULL-STACK ENGINEER. AI/ML BUILDER.<br/>
              SYSTEMS THAT ACTUALLY SHIP.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button 
            variants={itemVariants}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group/cta flex items-center gap-3 px-10 py-5 rounded-full border border-accent/30 text-accent font-bold uppercase tracking-widest hover:bg-accent hover:text-brutal-bg hover:border-accent hover:shadow-glow transition-all duration-300"
          >
            <span>See My Work</span>
            <ArrowDownRight size={20} className="group-hover/cta:rotate-[-45deg] transition-transform duration-300" />
          </motion.button>
        </div>
      </motion.div>
      
      {/* Marquee Footer for Hero — quieter, slower, no hard box */}
      <div className="absolute bottom-0 left-0 w-full h-12 border-t border-white/5 flex items-center overflow-hidden z-20">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-brutal-gray font-mono text-xs uppercase tracking-[0.2em]">
          {Array(6).fill(" // COMPUTER ENGINEERING STUDENT // FULL-STACK ENGINEER // AI/ML BUILDER // PYTHON · TYPESCRIPT · REACT // ").map((text, i) => (
            <span key={i} className="text-brutal-gray/40">{text}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
