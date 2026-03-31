import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeJSFiberSpool() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Create a "Spool" geometry (Cylinder with rounded caps)
    const group = new THREE.Group();
    scene.add(group);

    const cylinderGeom = new THREE.CylinderGeometry(1, 1, 2.5, 32, 1, true);
    const fiberMat = new THREE.MeshStandardMaterial({ 
      color: 0xD4AF37, 
      roughness: 0.8, 
      metalness: 0.2,
      wireframe: false 
    });
    const cylinder = new THREE.Mesh(cylinderGeom, fiberMat);
    group.add(cylinder);

    // Caps
    const capGeom = new THREE.CylinderGeometry(1.1, 1.1, 0.1, 32);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3 });
    const topCap = new THREE.Mesh(capGeom, capMat);
    topCap.position.y = 1.3;
    group.add(topCap);
    const bottomCap = new THREE.Mesh(capGeom, capMat);
    bottomCap.position.y = -1.3;
    group.add(bottomCap);

    // Fiber "texture" lines
    const lineCount = 100;
    const lineGeom = new THREE.BufferGeometry();
    const linePos = new Float32Array(lineCount * 2 * 3);
    for (let i = 0; i < lineCount; i++) {
        const i6 = i * 6;
        const angle = (i / lineCount) * Math.PI * 2;
        const x = Math.cos(angle);
        const z = Math.sin(angle);
        const h = (Math.random() - 0.5) * 2.4;
        linePos[i6] = x * 1.01;
        linePos[i6+1] = h;
        linePos[i6+2] = z * 1.01;
        linePos[i6+3] = x * 1.01;
        linePos[i6+4] = h + 1.2;
        linePos[i6+5] = Math.sin(angle + 0.5) * 1.01;
    }
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xFFD700, transparent: true, opacity: 0.3 });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    group.add(lines);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const direct = new THREE.DirectionalLight(0xffffff, 1);
    direct.position.set(5, 5, 5);
    scene.add(direct);

    let raf: number;
    const animate = () => {
      group.rotation.y += 0.01;
      group.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[300px]" />;
}
