import React from 'react';

const Stack: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-brutal-bg border-b border-zinc-800 px-6 md:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-black text-magenta uppercase tracking-tighter mb-16 border-b-4 border-magenta pb-4 inline-block w-full">
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
            title="Frameworks" 
            items={[
              { name: 'React', icon: 'react' },
              { name: 'Next.js', icon: 'nextdotjs' },
              { name: 'Node.js', icon: 'nodedotjs' },
              { name: 'Express', icon: 'express' },
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
              { name: 'AWS', icon: 'amazonwebservices' },
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
  icon: string;
}

const SkillBox = ({ title, items }: { title: string, items: SkillItem[] }) => (
  // Updated container: stronger shadow, lift effect, and subtle background shift
  <div className="border-2 border-magenta bg-brutal-card p-8 transition-all duration-300 hover:shadow-[10px_10px_0px_#FF00FF] hover:-translate-y-1 hover:-translate-x-1 group relative overflow-hidden">
    
    {/* Decorative background accent on hover */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <h3 className="text-xl font-black text-white uppercase mb-8 border-b border-zinc-700 pb-2 group-hover:text-magenta transition-colors relative z-10">
      {title}
    </h3>
    
    <div className="grid grid-cols-2 gap-4 relative z-10">
      {items.map(item => (
        <div key={item.name} className="flex items-center gap-3 group/item cursor-default transition-transform duration-300 hover:translate-x-2">
          {/* Icon Box: Fills with magenta on hover */}
          <div className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover/item:border-magenta group-hover/item:bg-magenta transition-all duration-300 shadow-none group-hover/item:shadow-[2px_2px_0px_white]">
             <img 
               src={`https://cdn.simpleicons.org/${item.icon}/FF00FF`} 
               alt={item.name} 
               className="w-4 h-4 opacity-70 group-hover/item:opacity-100 group-hover/item:invert group-hover/item:brightness-0 transition-all"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none'; 
               }}
             />
          </div>
          <span className="text-xs font-bold font-mono text-zinc-400 group-hover/item:text-white transition-colors">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Stack;