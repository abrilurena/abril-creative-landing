"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import "./globals.css";

function MainStar() {
  const glowTex = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,245,210,1)");
    g.addColorStop(0.2, "rgba(255,220,140,0.65)");
    g.addColorStop(0.55, "rgba(255,200,110,0.18)");
    g.addColorStop(1, "rgba(255,200,110,0)");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // textura para "estrella con puntas" en 2D
  const starTex = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(size / 2, size / 2);

    const spikes = 8;
    const outer = 90;
    const inner = 35;

    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (Math.PI * i) / spikes;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();

    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, outer);
    grad.addColorStop(0, "rgba(255,255,240,1)");
    grad.addColorStop(0.5, "rgba(255,220,150,0.95)");
    grad.addColorStop(1, "rgba(255,200,110,0.0)");

    ctx.fillStyle = grad;
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <group position={[0.2, 0.4, -6]}>
      {/* glow atrás (suave) */}
      <sprite scale={[4.0, 4.0, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.75}
        />
      </sprite>

      {/* estrella con puntas enfrente */}
      <sprite scale={[2.2, 2.2, 1]}>
        <spriteMaterial
          map={starTex}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.95}
        />
      </sprite>
    </group>
  );
}

export default function Home() {
  return (
    <main className="hero">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true }}
        onCreated={({ gl }) => gl.setClearColor("#050612")}
      >
        <Stars radius={80} depth={40} count={1200} factor={2.2} saturation={0} fade speed={0.25} />
        <MainStar />
      </Canvas>

      <div className="overlay">
        <h1>Hi, I’m Abril.</h1>
        <p>Creative developer • Motion • 3D • Experiments</p>

        <div className="scroll">
          <span className="spark">✦</span>
          <span>Scroll down</span>
          <span className="arrow">↓</span>
        </div>
      </div>
    </main>
  );
}