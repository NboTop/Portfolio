import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ConnectButtonProps {
  onNavigate: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ onNavigate }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // CLEANUP- ensure we don't have duplicate canvases from doublemounts
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Dimensions
    const width = 98;
    const height = 98;

    // Scene Setup
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

    // Geometry- TorusKnot - Square, wireframe aesthetic
    const geometry = new THREE.TorusKnotGeometry(0.45, 0.15, 64, 8);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xFF00FF,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation Loop
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
      // Check if the renderer's DOM element is still a child before removing
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      data-hover={isHovered}
      onClick={onNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed z-[100] cursor-pointer bg-black border-2 border-magenta
                 w-[70px] h-[70px] md:w-[98px] md:h-[98px]
                 bottom-[20px] right-[20px] md:bottom-[30px] md:right-[30px]
                 transition-all duration-200 hover:shadow-brutal hover:-translate-y-1 hover:-translate-x-1 flex items-center justify-center overflow-hidden group"
      title="CONNECT"
    >
      {/* Label */}
      <div className="absolute bottom-1 w-full text-center text-[8px] md:text-[10px] font-black text-magenta uppercase tracking-widest z-10 bg-black/80 pointer-events-none">
        CONNECT
      </div>
    </div>
  );
};

export default ConnectButton;