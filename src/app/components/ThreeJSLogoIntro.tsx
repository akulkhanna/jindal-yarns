import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface Props {
  logoUrl: string;
  onReady: () => void;
  onComplete: () => void;
}

export function ThreeJSLogoIntro({ logoUrl, onReady, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    } catch (e) {
      console.warn('WebGL not supported, skipping cinematic intro.', e);
      onReady();
      onComplete();
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // --- Asset Sampling ---
    const sampleLogo = (img: HTMLImageElement) => {
      const size = 128;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      const points = [];
      for (let y = 0; y < size; y += 2) {
        for (let x = 0; x < size; x += 2) {
          const i = (y * size + x) * 4;
          if (data[i + 3] > 120) {
            points.push({
              x: (x / size - 0.5) * 4.5,
              y: -(y / size - 0.5) * 4.5,
              r: data[i] / 255,
              g: data[i+1] / 255,
              b: data[i+2] / 255
            });
          }
        }
      }
      return points;
    };

    const img = new Image();
    img.src = logoUrl;
    img.crossOrigin = 'anonymous'; // Important for canvas sampling on GH Pages
    img.onerror = (err) => {
      console.warn("Failed to load intro image, skipping cinematic intro.", err);
      onReady();
      onComplete();
    };
    img.onload = () => {
      let targets: { x: number, y: number, r: number, g: number, b: number }[] = [];
      try {
        targets = sampleLogo(img);
      } catch (err) {
        console.warn("Failed to sample intro image, skipping cinematic intro.", err);
        onReady();
        onComplete();
        return;
      }
      const count = targets.length;
      const geom = new THREE.BufferGeometry();
      const startPos = new Float32Array(count * 3);
      const endPos = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const progress = { value: 0 };

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const radius = 8 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        startPos[i3] = radius * Math.sin(phi) * Math.cos(theta);
        startPos[i3+1] = radius * Math.sin(phi) * Math.sin(theta);
        startPos[i3+2] = radius * Math.cos(phi) - 3;

        endPos[i3] = targets[i].x;
        endPos[i3+1] = targets[i].y;
        endPos[i3+2] = 0;

        const goldMix = 0.4 + Math.random() * 0.4;
        colors[i3] = targets[i].r * (1-goldMix) + 0.77 * goldMix;
        colors[i3+1] = targets[i].g * (1-goldMix) + 0.63 * goldMix;
        colors[i3+2] = targets[i].b * (1-goldMix) + 0.35 * goldMix;
        sizes[i] = 2 + Math.random() * 3;
      }

      geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(startPos), 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (250.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
          }
        `,
        transparent: true,
        vertexColors: true,
        depthWrite: false,
      });

      const points = new THREE.Points(geom, mat);
      scene.add(points);
      onReady();

      let raf: number;
      const clock = new THREE.Clock();

      const animate = () => {
        const t = clock.getElapsedTime();
        const p = progress.value;
        const currentPos = geom.attributes.position.array as Float32Array;
        
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const individualDelay = (i / count) * 0.2;
          const adjustedP = Math.max(0, Math.min(1, (p - individualDelay) / (1 - individualDelay)));
          const easedP = adjustedP * adjustedP * (3 - 2 * adjustedP);

          currentPos[i3] = startPos[i3] + (endPos[i3] - startPos[i3]) * easedP + Math.sin(t*0.5 + i)*0.01*(1-easedP);
          currentPos[i3+1] = startPos[i3+1] + (endPos[i3+1] - startPos[i3+1]) * easedP + Math.cos(t*0.3 + i)*0.01*(1-easedP);
          currentPos[i3+2] = startPos[i3+2] + (endPos[i3+2] - startPos[i3+2]) * easedP;
        }
        geom.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };

      animate();

      gsap.to(progress, {
        value: 1,
        duration: 3.5,
        delay: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(canvasRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              cancelAnimationFrame(raf);
              onComplete();
            }
          });
        }
      });
    };

    return () => {
      // Clean up
    };
  }, [logoUrl, onReady, onComplete]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />;
}
