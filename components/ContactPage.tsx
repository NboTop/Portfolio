import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import * as THREE from 'three';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <div className="min-h-screen bg-void text-cream font-mono flex flex-col selection:bg-cream selection:text-void">
      
      {/* Header */}
      <header className="p-6 border-b border-cream bg-void z-20 flex justify-between items-center sticky top-0">
        <button onClick={onBack} className="flex items-center gap-2 text-sm uppercase font-bold hover:bg-cream hover:text-void px-4 py-2 border border-transparent hover:border-void transition-colors">
          <ArrowLeft size={16} /> Return
        </button>
        <div className="font-display font-black tracking-tighter text-xl">NEEL</div>
      </header>

      {/* Main Grid Layout - 4 Columns */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-cream gap-[1px] border-b border-cream">
        
        {/* Title Cell (Span 2) */}
        <div className="bg-void p-8 md:p-12 lg:col-span-2 border-b border-cream flex items-center">
           <h1 className="font-display text-[clamp(4rem,10vw,8rem)] leading-[0.8] text-cream uppercase">
             Let's<br/>Connect
           </h1>
        </div>

        {/* Empty / Decorative Cells */}
        <div className="bg-void hidden lg:block"></div>
        <div className="bg-void hidden lg:block"></div>

        {/* Info Cards */}
        <ContactCard 
          label="EMAIL" 
          value="neel.voidlogic@gmail.com" 
          sub="Preferred Channel" 
          href="mailto:neel.voidlogic@gmail.com" 
          icon={<Mail size={24} />}
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
        <div className="bg-void p-8 flex flex-col justify-between group hover:bg-cream hover:text-void transition-colors duration-300">
           <div className="text-xs uppercase opacity-50 font-bold tracking-widest">Socials</div>
           <div className="space-y-4 mt-8 w-full">
              <SocialLink href="https://www.linkedin.com/in/neelmenghani" label="LINKEDIN" />
              <SocialLink href="https://github.com/nbotop" label="GITHUB" />
              <SocialLink href="https://x.com/neelhumai" label="X" />
           </div>
        </div>

        {/* Footer / Credits Cell */}
        <div className="bg-void p-8 lg:col-span-2 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
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

const ContactCard = ({ label, value, sub, href, icon }: { label: string, value: string, sub: string, href?: string, icon: React.ReactNode }) => (
  <a 
    href={href} 
    className={`bg-void p-8 flex flex-col justify-between min-h-[250px] group hover:bg-cream hover:text-void transition-colors duration-300 ${!href ? 'cursor-default' : 'cursor-pointer'}`}
  >
    <div className="flex justify-between items-start">
       <span className="text-xs uppercase font-bold tracking-widest opacity-50 group-hover:opacity-100">{label}</span>
       <div className="opacity-50 group-hover:opacity-100">{icon}</div>
    </div>
    
    <div>
       <div className="font-bold text-lg md:text-xl break-words mb-2">{value}</div>
       <div className="text-xs opacity-50 font-mono">{sub}</div>
    </div>
  </a>
);

const SocialLink = ({ href, label }: { href: string, label: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-zinc-800 pb-3 group/link hover:border-void w-full">
     <span className="font-bold tracking-wide">{label}</span>
     <ArrowUpRight size={16} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
  </a>
);

export default ContactPage;
