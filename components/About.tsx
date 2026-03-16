import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-brutal-bg border-b border-zinc-800 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Column: Visual / "Image" */}
        <div className="lg:col-span-5 border-r border-zinc-800 bg-zinc-900/50 p-12 flex flex-col justify-between relative overflow-hidden group">
           {/* Animated Background */}
           <div className="absolute inset-0 z-0">
              <TechAnimation />
           </div>
           
           <div className="absolute inset-0 opacity-20 pointer-events-none z-10" 
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #FF00FF 1px, transparent 0)', backgroundSize: '24px 24px' }}>
           </div>
           
           <div className="relative z-10 pointer-events-none">
             <div className="text-6xl font-black text-transparent stroke-text opacity-40 group-hover:opacity-60 transition-opacity">
               NEEL
             </div>
           </div>

           <div className="relative z-10 mt-auto pointer-events-none">
             <div className="w-full h-px bg-magenta mb-4"></div>
             <div className="font-mono text-xs text-magenta mb-2">CURRENT STATUS</div>
             <div className="text-2xl font-bold text-white">BUILDING.</div>
           </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7 p-12 lg:p-20 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-magenta uppercase tracking-tighter mb-8 border-t-4 border-magenta pt-6 inline-block w-full">
            ABOUT
          </h2>
          
          <div className="space-y-6 text-brutal-gray font-mono text-lg leading-relaxed max-w-2xl">
            <p>
              <strong className="text-white">I don't just code. I architect. I optimize. I ship.</strong>
            </p>
            <p>
              Three years deep in full-stack development, making things that work beautifully. Fluent in Python, JavaScript, React.
            </p>
            <p>
              Comfortable with Python, JavaScript, React—and making design decisions that matter.
            </p>
          </div>

          {/* Stats Cards (Integrated Below) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <StatCard value="150+" label="DSA Problems" />
            <StatCard value="~30%" label="Efficiency Boost" />
            <StatCard value="3 YR" label="Experience" />
          </div>
        </div>

      </div>
    </section>
  );
};

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="border-2 border-zinc-800 bg-brutal-bg p-6 hover:border-magenta hover:shadow-brutal-sm transition-all group cursor-default">
    <div className="text-3xl font-black text-white group-hover:text-magenta transition-colors mb-2">{value}</div>
    <div className="text-xs text-brutal-gray uppercase tracking-widest">{label}</div>
  </div>
);

const TechAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // CLEANUP: Ensure no duplicate canvases exist
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Setup
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    // Safety check for zero dimensions
    if (width === 0 || height === 0) return;
    
    const scene = new THREE.Scene();
    // Use slightly lighter dark to blend
    scene.background = new THREE.Color(0x111111); 

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Objects
    const group = new THREE.Group();
    scene.add(group);

    // 1. Icosahedron (Wireframe)
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x333333, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3 
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // 2. Inner Cube (Accent)
    const innerGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const innerMat = new THREE.MeshBasicMaterial({ 
      color: 0xFF00FF, 
      wireframe: true 
    });
    const cube = new THREE.Mesh(innerGeo, innerMat);
    group.add(cube);

    // 3. Particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 100;
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xFF00FF,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.002;

      cube.rotation.x -= 0.005;
      cube.rotation.y -= 0.005;

      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full opacity-60" />;
};

export default About;