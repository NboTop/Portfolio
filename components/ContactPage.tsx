import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, Phone, MapPin, Copy, Check, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import * as THREE from 'three';

interface ContactPageProps {
  onBack: () => void;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const FORMSUBMIT_AJAX_URL = 'https://formsubmit.co/ajax/neel.voidlogic@gmail.com';

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Pure Black
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true 
    });
    
    // Initial Size
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // We render at half resolution for style/performance, CSS scales it up
      renderer.setSize(width / 2, height / 2, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    updateSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Fluid Glass Geometry
    const geometry = new THREE.TorusKnotGeometry(2.1, 0.7, 128, 32);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 1, 
      thickness: 3,
      ior: 1.15, 
      clearcoat: 1,
      attenuationColor: new THREE.Color(0xE6E3D8),
      attenuationDistance: 1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(2, -2, -3);
    scene.add(mesh);

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xE6E3D8, 4);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.003;
      mesh.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      updateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const submitFormPayload = async (useFormData: boolean) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: 'New message from portfolio website!',
        _template: 'box',
        _captcha: 'false',
      };

      let response: Response;

      if (useFormData) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        response = await fetch(FORMSUBMIT_AJAX_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
          signal: controller.signal,
        });
      } else {
        response = await fetch(FORMSUBMIT_AJAX_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      }

      const data = await response.json().catch(() => null);
      const isSuccess = response.ok && data && (data.success === true || data.success === 'true');

      if (!isSuccess) {
        const serverMsg = data && typeof data.message === 'string' ? data.message : `Request failed (${response.status})`;
        const error = new Error(serverMsg) as Error & { retryable?: boolean };
        error.retryable = response.status >= 500 || response.status === 429 || !data;
        throw error;
      }

      return data;
    } catch (err) {
      if (err instanceof Error && (err.name === 'AbortError' || err.name === 'TypeError')) {
        const retryableErr = err as Error & { retryable?: boolean };
        retryableErr.retryable = true;
      }
      throw err;
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out your name, email, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const maxAttempts = 3;
    let lastError: unknown = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        // Use JSON on first attempt, fallback to FormData on retry (avoids CORS preflight issues)
        const useFormData = attempt > 0;
        await submitFormPayload(useFormData);
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        return;
      } catch (err) {
        lastError = err;
        const isRetryable = err instanceof Error && (err as Error & { retryable?: boolean }).retryable !== false;
        if (attempt < maxAttempts - 1 && isRetryable) {
          await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
          continue;
        }
        break;
      }
    }

    setStatus('error');
    setErrorMessage(
      lastError instanceof Error && lastError.message && lastError.name !== 'AbortError'
        ? lastError.message
        : 'Could not send message right now. Please try again or email directly.'
    );
  };

  const mailtoFallbackHref = `mailto:neel.voidlogic@gmail.com?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${name.trim() || 'Visitor'}`
  )}&body=${encodeURIComponent(message.trim())}`;

  return (
    <div className="min-h-screen bg-void text-cream font-mono flex flex-col selection:bg-cream selection:text-void">
      
      {/* Header */}
      <header className="px-4 py-4 sm:p-6 border-b border-cream bg-void z-20 flex justify-between items-center sticky top-0">
        <button onClick={onBack} className="flex items-center gap-2 text-sm uppercase font-bold hover:bg-cream hover:text-void px-3 sm:px-4 py-2 border border-transparent hover:border-void transition-colors cursor-pointer">
          <ArrowLeft size={16} /> Return
        </button>
        <div className="font-display font-black tracking-tighter text-xl">NEEL</div>
      </header>

      {/* Main Grid Layout - 4 Columns */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-cream gap-[1px] border-b border-cream">
        
        {/* Title Cell (Span 2 on md+) */}
        <div className="bg-void p-6 sm:p-8 md:p-10 xl:p-12 md:col-span-2 lg:col-span-2 flex items-center min-w-0 overflow-hidden">
          <div className="w-full [container-type:inline-size]">
            <h1 className="font-display text-[clamp(2rem,14.5cqw,7.5rem)] leading-[0.92] tracking-tight text-cream uppercase">
              Let's<br />Connect
            </h1>
          </div>
        </div>

        {/* Contact Form (Span 2 on md+) */}
        <div className="bg-void p-6 sm:p-8 md:p-10 xl:p-12 md:col-span-2 lg:col-span-2 min-w-0 flex flex-col justify-center">
           <div className="text-xs uppercase opacity-50 font-bold tracking-widest mb-6 sm:mb-8">Send a Message</div>

           {status === 'success' ? (
             <div className="border border-cream/30 p-6 sm:p-8 flex flex-col gap-4 items-start">
               <div className="flex items-center gap-3 text-cream">
                 <CheckCircle2 size={24} />
                 <span className="font-display text-xl sm:text-2xl uppercase tracking-tight">Message Sent</span>
               </div>
               <p className="text-sm text-cream/70 leading-relaxed">
                 Thanks for reaching out. Your message has been delivered and I'll get back to you shortly.
               </p>
               <button
                 type="button"
                 onClick={() => setStatus('idle')}
                 className="mt-2 px-6 py-3 bg-cream text-void text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
               >
                 Send Another Message
               </button>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name" 
                    required 
                    disabled={status === 'submitting'}
                    className="w-full min-w-0 bg-transparent border-b border-white/20 focus:border-cream py-3 outline-none transition-colors text-cream placeholder:text-white/30 disabled:opacity-50"
                  />
                  <input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email" 
                    required 
                    disabled={status === 'submitting'}
                    className="w-full min-w-0 bg-transparent border-b border-white/20 focus:border-cream py-3 outline-none transition-colors text-cream placeholder:text-white/30 disabled:opacity-50"
                  />
                </div>
                <textarea 
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we collaborate?" 
                  rows={4}
                  required
                  disabled={status === 'submitting'}
                  className="w-full min-w-0 bg-transparent border-b border-white/20 focus:border-cream py-3 outline-none transition-colors text-cream placeholder:text-white/30 resize-none disabled:opacity-50"
                />

                {status === 'error' && errorMessage && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-red-400/40 bg-red-950/30 px-4 py-3 text-xs text-red-200">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={mailtoFallbackHref}
                      className="underline font-bold uppercase tracking-wider text-cream shrink-0 hover:text-white"
                    >
                      Email Directly
                    </a>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="self-start mt-2 px-8 py-3 bg-cream text-void font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
             </form>
           )}
        </div>

        {/* Info Cards */}
        <ContactCard 
          label="EMAIL" 
          value="neel.voidlogic@gmail.com" 
          sub="Preferred Channel" 
          href="mailto:neel.voidlogic@gmail.com" 
          icon={<Mail size={24} />}
          copyValue="neel.voidlogic@gmail.com"
        />
        <ContactCard 
          label="PHONE" 
          value="+91 820 019 0878" 
          sub="WhatsApp Available" 
          href="https://wa.me/+918200190878"
          icon={<Phone size={24} />}
        />
        <ContactCard 
          label="LOCATION" 
          value="INDIA / REMOTE" 
          sub="Global Availability" 
          icon={<MapPin size={24} />}
        />
        
        {/* Socials Cell */}
        <div className="bg-void p-6 sm:p-8 flex flex-col justify-between group hover:bg-cream hover:text-void transition-colors duration-300 min-w-0">
           <div className="text-xs uppercase opacity-50 font-bold tracking-widest">Socials</div>
           <div className="space-y-4 mt-8 w-full">
              <SocialLink href="https://linkedin.com/in/neelmenghani" label="LINKEDIN" />
              <SocialLink href="https://github.com/nbotop" label="GITHUB" />
              <SocialLink href="https://x.com/neelhumai" label="X" />
           </div>
        </div>

        {/* Footer / Credits Cell */}
        <div className="bg-void p-6 sm:p-8 md:col-span-2 lg:col-span-2 flex flex-col justify-between relative overflow-hidden min-h-[260px] md:min-h-[300px] min-w-0">
           <div className="text-xs uppercase opacity-50 font-bold tracking-widest flex justify-between z-10 relative">
              <span>Status: Available</span>
              <span>© 2026</span>
           </div>
           
           <div className="mt-auto relative z-10">
              <div className="font-display text-2xl md:text-3xl max-w-md">"Leveraging the Attention Economy."</div>
              <div className="text-xs mt-4 opacity-50">Designed by Neel // Precision Prompting</div>
           </div>

           {/* WebGL Canvas Container */}
           <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] pointer-events-none z-0 mix-blend-screen opacity-60">
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
           </div>
        </div>

        {/* Filler */}
        <div className="bg-void lg:col-span-2 hidden lg:block"></div>

      </div>
    </div>
  );
};

const ContactCard = ({ label, value, sub, href, icon, copyValue }: { label: string, value: string, sub: string, href?: string, icon: React.ReactNode, copyValue?: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    if (copyValue) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a 
      href={href} 
      className={`relative bg-void p-6 sm:p-8 flex flex-col justify-between min-h-[180px] sm:min-h-[220px] md:min-h-[250px] min-w-0 group hover:bg-cream hover:text-void transition-colors duration-300 ${!href && !copyValue ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={!href && copyValue ? handleCopy : undefined}
    >
      <div className="flex justify-between items-start gap-2">
        <span className="text-xs uppercase font-bold tracking-widest opacity-50 group-hover:opacity-100">{label}</span>
        <div className="opacity-50 group-hover:opacity-100 flex items-center gap-2 shrink-0">
          {copyValue && (
            <button
              type="button"
              onClick={handleCopy}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 hover:bg-void hover:text-cream rounded-full cursor-pointer"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          )}
          {icon}
        </div>
      </div>
      
      <div className="min-w-0 mt-6">
        <div className="font-bold text-base sm:text-lg xl:text-xl [overflow-wrap:anywhere] mb-2">{value}</div>
        <div className="text-xs opacity-50 font-mono">{sub}</div>
      </div>
    </a>
  );
};

const SocialLink = ({ href, label }: { href: string, label: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-zinc-800 pb-3 group/link hover:border-void w-full">
     <span className="font-bold tracking-wide">{label}</span>
     <ArrowUpRight size={16} className="opacity-100 md:opacity-0 md:group-hover/link:opacity-100 transition-opacity" />
  </a>
);

export default ContactPage;
