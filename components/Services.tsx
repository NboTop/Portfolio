import React from 'react';
import { Anchor, Zap, ShieldCheck, Cpu, Globe, Braces } from 'lucide-react';

const services = [
  {
    icon: <Braces size={28} />,
    title: "System Architecture",
    description: "Building castles, not sandcastles. I design scalable distributed systems that handle growth without breaking a sweat."
  },
  {
    icon: <Zap size={28} />,
    title: "High Performance Code",
    description: "I write metal close logic. If it takes more than 100ms, it's too slow. I optimize until the hardware complains."
  },
  {
    icon: <Globe size={28} />,
    title: "Full Stack Warfare",
    description: "From database normalization to pixel perfect CSS. I dominate the entire stack, ensuring cohesion from bit to pixel."
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure by Design",
    description: "I assume the internet is hostile. Security isn't an addon; it's baked into every function signature."
  },
  {
    icon: <Cpu size={28} />,
    title: "Hardware Integration",
    description: "Bridging the gap between software and silicon. I make code talk to sensors, motors, and microcontrollers."
  },
  {
    icon: <Anchor size={28} />,
    title: "Reliability Engineering",
    description: "99.9% uptime isn't a goal; it's the baseline. I build fault-tolerant systems that self-heal while you sleep."
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-32 bg-midnight-dark overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-xs font-mono tracking-widest uppercase text-text-secondary">Capabilities</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            I don't just participate.<br/>
            <span className="text-accent">I elevate.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Writing code is easy. Solving expensive problems is hard. 
            Here is how I provide value beyond just "making it work".
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 rounded-xl bg-surface border border-white/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-accent transform rotate-12 scale-150 origin-top-right">
                {service.icon}
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(0,128,255,0.4)]">
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;