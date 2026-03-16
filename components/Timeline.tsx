import React from 'react';
import { Briefcase, GraduationCap, Code, Trophy, Calendar } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education' | 'project' | 'award';
}

const timelineData: TimelineItem[] = [
  {
    year: "2023",
    title: "Tribal Art Platform",
    role: "Full Stack Lead",
    company: "Project",
    description: "Built a scalable e-commerce platform handling real-time inventory management for indigenous artisans.",
    achievements: [
      "React + Node.js backend with MongoDB aggregations",
      "40% faster page load through SSR optimization",
      "Implemented real-time bidding system using WebSockets"
    ],
    type: "project"
  }
];

const Timeline: React.FC = () => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'work': return <Briefcase size={18} />;
      case 'education': return <GraduationCap size={18} />;
      case 'award': return <Trophy size={18} />;
      default: return <Code size={18} />;
    }
  };

  return (
    <section id="journey" className="relative py-32 bg-midnight overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <Calendar size={14} className="text-accent" />
            <span className="text-xs font-mono tracking-widest uppercase text-text-secondary">My Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            The path so <span className="text-accent">far.</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>
                  
                  {/* Dot on Line */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center z-10 -translate-x-1/2 group-hover:border-accent group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                    <div className="text-text-secondary group-hover:text-accent transition-colors">
                      {getIcon(item.type)}
                    </div>
                  </div>

                  {/* Spacer for Desktop Layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="relative p-6 md:p-8 rounded-xl bg-surface border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                      
                      {/* Date Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-mono text-accent mb-4 ${isEven ? 'md:ml-auto' : ''}`}>
                        {item.year}
                      </div>

                      <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      
                      <div className={`text-sm text-text-secondary font-mono mb-4 flex items-center gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        <span className="text-text-primary">{item.role}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span>{item.company}</span>
                      </div>

                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <ul className={`space-y-2 ${isEven ? 'flex flex-col md:items-end' : ''}`}>
                        {item.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                             {!isEven && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0"></span>}
                             <span>{achievement}</span>
                             {isEven && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0 md:order-last md:ml-2 md:mr-0"></span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;