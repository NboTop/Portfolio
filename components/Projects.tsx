import React from 'react';
import { useTheme } from './ThemeContext';

const Stack: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-brutal-bg border-b border-white/5 px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-black text-accent uppercase tracking-tight mb-16 border-b border-white/10 pb-4 inline-block w-full">
          Tech Arsenal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <SkillBox 
            title="Languages" 
            items={[
              { name: 'TypeScript', icon: 'typescript' },
              { name: 'JavaScript', icon: 'javascript' },
              { name: 'Python', icon: 'python' },
              { name: 'C++', icon: 'cplusplus' },
              { name: 'Solidity', icon: 'solidity' },
              { name: 'SQL', icon: 'postgresql' }
            ]} 
          />
          
          <SkillBox 
            title="Frameworks & Libs" 
            items={[
              { name: 'React', icon: 'react' },
              { name: 'Vue.js', icon: 'vuedotjs' },
              { name: 'Next.js', icon: 'nextdotjs' },
              { name: 'Node.js', icon: 'nodedotjs' },
              { name: 'Express', icon: 'express' },
              { name: 'Scikit-learn', icon: 'scikitlearn' },
              { name: 'Tailwind', icon: 'tailwindcss' },
              { name: 'Three.js', icon: 'threedotjs' },
              { name: 'Pandas', icon: 'pandas' }
            ]} 
          />
          
          <SkillBox 
            title="Tools & DevOps" 
            items={[
              { name: 'Docker', icon: 'docker' },
              { name: 'K8s', icon: 'kubernetes' },
              { name: 'AWS', deviconClass: 'devicon-amazonwebservices-plain-wordmark' },
              { name: 'MongoDB', icon: 'mongodb' },
              { name: 'Git', icon: 'git' },
              { name: 'Figma', icon: 'figma' }
            ]} 
          />

        </div>
      </div>
    </section>
  );
};

interface SkillItem {
  name: string;
  icon?: string;
  deviconClass?: string;
}

const SkillBox = ({ title, items }: { title: string, items: SkillItem[] }) => {
  const { theme } = useTheme();
  const iconColor = theme === 'noir' ? 'E8E4D9' : 'FF00FF';

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:border-accent/20 hover:shadow-soft hover:-translate-y-1 group relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h3 className="text-xl font-black text-white uppercase mb-8 border-b border-white/10 pb-2 group-hover:text-accent transition-colors relative z-10">
        {title}
      </h3>
      
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {items.map(item => (
          <div key={item.name} className="flex items-center gap-3 group/item cursor-default transition-transform duration-300 hover:translate-x-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/10 group-hover/item:border-accent/40 group-hover/item:bg-accent/10 transition-all duration-300">
              {item.deviconClass ? (
                <i className={`${item.deviconClass} text-accent text-sm opacity-70 group-hover/item:opacity-100 transition-all`} />
              ) : (
                <img 
                  src={`https://cdn.simpleicons.org/${item.icon}/${iconColor}`} 
                  alt={item.name} 
                  className="w-4 h-4 opacity-60 group-hover/item:opacity-100 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'; 
                  }}
                />
              )}
            </div>
            <span className="text-xs font-bold font-mono text-zinc-400 group-hover/item:text-white transition-colors">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;
