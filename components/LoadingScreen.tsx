import React, { useEffect, useState, useRef } from 'react';
import { Check, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState<'typing' | 'logging' | 'positioning' | 'complete'>('typing');
  const [targetStyle, setTargetStyle] = useState<React.CSSProperties>({});
  
  const textRef = useRef<HTMLDivElement>(null);
  const command = "neel@dev:~/portfolio $ ./init_profile.sh";
  
  // 1. Typing Sequence
  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setText(command.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setStep('logging');
      }
    }, 40); // Standard typing speed

    return () => clearInterval(typeInterval);
  }, []);

  // 2. Logging Sequence
  useEffect(() => {
    if (step === 'logging') {
        const logMessages = [
            "Loading skills...",
            "Initializing projects...",
            "Ready to connect"
        ];
        
        // Show logs one by one with a delay
        let delay = 0;
        logMessages.forEach((msg, index) => {
            delay += 600; // 600ms between each log
            setTimeout(() => {
                setLogs(prev => [...prev, msg]);
                
                // If this is the last log, start the exit sequence after a brief pause
                if (index === logMessages.length - 1) {
                    setTimeout(() => {
                        calculateExitPosition();
                    }, 1000);
                }
            }, delay);
        });
    }
  }, [step]);

  const calculateExitPosition = () => {
    // Find the target element in the Hero section
    const targetEl = document.getElementById('hero-terminal-text');
    const sourceEl = textRef.current;

    if (targetEl && sourceEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const sourceRect = sourceEl.getBoundingClientRect();

        const deltaX = targetRect.left - sourceRect.left;
        const deltaY = targetRect.top - sourceRect.top;

        // Apply styles to move the text exactly to the Hero position
        setTargetStyle({
            transform: `translate(${deltaX}px, ${deltaY}px)`,
            fontSize: '0.875rem', // Match text-sm (14px)
            color: 'rgba(255, 0, 255, 0.6)', // Match text-magenta/60
            transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)'
        });
    } else {
        // Fallback if element not found
        setTargetStyle({
            opacity: 0,
            transition: 'opacity 0.5s ease'
        });
    }

    setStep('positioning');

    // Wait for transition to finish then unmount
    setTimeout(onComplete, 1100);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center font-mono transition-colors duration-1000 ${step === 'positioning' ? 'bg-transparent pointer-events-none' : 'bg-brutal-bg'}`}
    >
       {/* 
          Main Text Container
       */}
       <div className="relative">
         {/* Command Line */}
         <div 
            ref={textRef}
            className="flex items-center font-bold text-magenta mb-6 whitespace-nowrap text-lg md:text-xl"
            style={step === 'positioning' ? targetStyle : {}}
         >
           <Terminal size={16} className="inline mr-2" />
           <span>{text}<span className={`animate-pulse ${step === 'positioning' ? 'hidden' : ''}`}>_</span></span>
         </div>

         {/* Logs - Fade out and slide down on exit */}
         <div 
            className={`space-y-2 pl-2 absolute top-full left-0 w-full transition-all duration-500 ${step === 'positioning' ? 'opacity-0 translate-y-4' : 'opacity-100'}`}
         >
           {logs.map((log, index) => (
             <div 
               key={index} 
               className="flex items-center gap-3 text-sm md:text-base text-brutal-gray animate-fade-in-up"
               style={{ animationDelay: '0ms' }} // Immediate render when added to state
             >
               <Check size={14} className="text-green-500" />
               <span className={index === 2 ? "text-white font-bold" : ""}>{log}</span>
             </div>
           ))}
         </div>
       </div>

       {/* Footer Progress */}
       <div className={`absolute bottom-10 text-[10px] text-zinc-800 uppercase tracking-widest transition-opacity duration-300 ${step === 'positioning' ? 'opacity-0' : 'opacity-100'}`}>
         System Integrity Verified
       </div>
    </div>
  );
};

export default LoadingScreen;