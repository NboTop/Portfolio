import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from './ThemeContext';

interface ConnectButtonProps {
  onNavigate: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ onNavigate }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const width = 98;
    const height = 98;

    const scene = new THREE.Scene();
    
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Always brutal magenta color for the 3D object
    const geometry = new THREE.TorusKnotGeometry(0.45, 0.15, 64, 8);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xFF00FF,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const speed = mountRef.current?.dataset.hover === 'true' ? 0.05 : 0.01;
      
      mesh.rotation.x += speed;
      mesh.rotation.y += speed;
      
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  // Keep theme styling in mind. The external classes depend on Tailwind, which handles its own color injection dynamically.
  return (
    <div 
      ref={mountRef}
      data-hover={isHovered}
      onClick={onNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed z-[100] cursor-pointer bg-black/60 backdrop-blur-md border border-[#FF00FF]/30 
                 w-[70px] h-[70px] md:w-[98px] md:h-[98px]
                 bottom-[20px] right-[20px] md:bottom-[30px] md:right-[30px]
                 transition-all duration-300 flex items-center justify-center overflow-hidden group
                 rounded-full hover:border-[#FF00FF]/80 hover:shadow-[0_0_32px_rgba(255,0,255,0.4)] hover:scale-105"
      title="CONNECT"
    >
      {/* Label */}
      <div className="absolute bottom-2 w-full text-center text-[8px] md:text-[10px] font-black text-[#FF00FF] uppercase tracking-widest z-10 pointer-events-none">
        CONNECT
      </div>
    </div>
  );
};

export default ConnectButton;
