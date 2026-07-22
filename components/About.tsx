import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from './ThemeContext';

const About: React.FC = () => {
  const { theme } = useTheme();
  return (
    <section id="about" className="bg-brutal-bg border-b border-white/5 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Column: Visual */}
        <div className="lg:col-span-5 border-r border-white/5 bg-white/[0.02] p-12 flex flex-col relative overflow-hidden group">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <TechAnimation theme={theme} />
          </div>

          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none z-10"
            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'noir' ? '#E8E4D9' : '#FF00FF'} 1px, transparent 0)`, backgroundSize: '24px 24px' }}
          />

          <div className="relative z-10 mt-auto pointer-events-none">
             <div className="w-full h-px bg-white/10 mb-4"></div>
             <div className="font-mono text-xs text-accent mb-2">CURRENT STATUS</div>
             <div className="text-2xl font-bold text-white">BUILDING.</div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7 p-12 lg:p-20 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-accent uppercase tracking-tight mb-8 border-t border-white/10 pt-6 inline-block w-full">
            ABOUT
          </h2>

          <div className="space-y-6 text-brutal-gray font-mono text-lg leading-relaxed max-w-2xl">
            <p>
              <strong className="text-white">
                I write code that ships. Full-stack by nature — database to deployment.
              </strong>
            </p>
            <p>
              Currently focused on AI engineering: building tools that actually use
              models, not just call them. Python for the data side, TypeScript for
              everything a user sees.
            </p>
            <p>
              Three years in and still writing better code than last month.
            </p>
          </div>

          {/* Stats Cards */}
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

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-accent/30 hover:shadow-glow transition-all duration-300 group cursor-default">
    <div className="text-3xl font-black text-white group-hover:text-accent transition-colors mb-2">{value}</div>
    <div className="text-xs text-brutal-gray uppercase tracking-widest">{label}</div>
  </div>
);

const TechAnimation: React.FC<{ theme: string }> = ({ theme }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    let width = mountRef.current.clientWidth || 1;
    let height = mountRef.current.clientHeight || 1;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x333333,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const sphere = new THREE.Mesh(geometry, material);
    group.add(sphere);

    // Inner cube — colored by theme
    const innerGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const innerMat = new THREE.MeshBasicMaterial({ color: theme === 'noir' ? 0xe8e4d9 : 0xFF00FF, wireframe: true });
    const cube = new THREE.Mesh(innerGeo, innerMat);
    group.add(cube);

    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 100;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.03,
      color: theme === 'noir' ? 0xe8e4d9 : 0xFF00FF,
      transparent: true,
      opacity: 0.35,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

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

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const { width, height } = entries[0].contentRect;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(mountRef.current);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} className="w-full h-full opacity-50" />;
};

export default About;
