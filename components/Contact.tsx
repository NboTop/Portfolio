import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-32 bg-midnight overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* Left Column: Context */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 mb-6">
              <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-accent">Signal: Online</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Got an interesting problem?<br />
              <span className="text-accent">Let's talk.</span>
            </h2>
            
            <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-md">
              I'm available for opportunities that actually require engineering, not just framework assembly. 
              If you value clean code and performance, we'll get along.
            </p>

            <div className="space-y-6">
              <a href="mailto:neel@gmail.com" className="group flex items-center gap-4 p-4 rounded-xl glass-card transition-all duration-300 hover:scale-[1.02]">
                <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-midnight transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1">Direct Line</p>
                  <p className="text-text-primary font-medium group-hover:text-accent transition-colors">neel@gmail.com</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>

              <div className="flex gap-4">
                 <SocialBtn icon={<Github size={20} />} href="https://github.com/nbotop" label="GitHub" />
                 <SocialBtn icon={<Linkedin size={20} />} href="https://linkedin.com" label="LinkedIn" />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
             <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono uppercase text-text-secondary tracking-wider">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-midnight/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono uppercase text-text-secondary tracking-wider">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full bg-midnight/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300"
                      placeholder="jane@tech.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono uppercase text-text-secondary tracking-wider">Brief</label>
                  <textarea 
                    id="message" 
                    required
                    rows={4}
                    className="w-full bg-midnight/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-300 resize-none"
                    placeholder="We have a scalability issue..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus !== 'idle'}
                  className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${
                    formStatus === 'success' 
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                      : 'bg-accent text-midnight hover:bg-accent-glow hover:shadow-[0_0_20px_rgba(32,180,198,0.4)]'
                  } ${formStatus === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {formStatus === 'idle' && (
                    <>Send <Send size={18} /></>
                  )}
                  {formStatus === 'sending' && (
                    <>Transmitting...</>
                  )}
                  {formStatus === 'success' && (
                    <>Sent <CheckCircle size={18} /></>
                  )}
                </button>
                
                <div className={`text-center transition-all duration-500 overflow-hidden ${formStatus === 'success' ? 'max-h-12 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                  <p className="text-xs font-mono text-accent">
                    Received. I'll take a look.
                  </p>
                </div>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialBtn = ({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl glass-card hover:bg-white/5 hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
    aria-label={label}
  >
    <div className="text-text-secondary group-hover:text-accent transition-colors">{icon}</div>
  </a>
);

export default Contact;