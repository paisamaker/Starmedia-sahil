import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Globe, Cpu, ArrowRight } from 'lucide-react';

export default function CreatorNetwork({ onExplore }) {
  const canvasRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Nodes in the network
    const nodes = [
      { id: 'center', label: 'STAR MEDIA', x: width / 2, y: height / 2, radius: 24, color: '#a855f7', isCenter: true },
      { id: 'brands', label: 'Brands', x: width / 2 - 160, y: height / 2 - 80, radius: 14, color: '#38bdf8', vx: 0.3, vy: -0.2 },
      { id: 'creators', label: 'Creators', x: width / 2 + 170, y: height / 2 - 70, radius: 15, color: '#ec4899', vx: -0.2, vy: 0.3 },
      { id: 'campaigns', label: 'Campaigns', x: width / 2 - 130, y: height / 2 + 90, radius: 13, color: '#818cf8', vx: 0.25, vy: 0.2 },
      { id: 'audiences', label: 'Audiences', x: width / 2 + 140, y: height / 2 + 100, radius: 14, color: '#10b981', vx: -0.3, vy: -0.25 },
      { id: 'culture', label: 'Culture & Impact', x: width / 2, y: height / 2 - 130, radius: 12, color: '#fbbf24', vx: 0.1, vy: 0.2 },
    ];

    // Background floating micro-particles
    const particles = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2
    }));

    let mouse = { x: width / 2, y: height / 2 };
    let visible = false;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let angle = 0;

    const render = () => {
      if (!visible) {
        animationFrameId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      angle += 0.01;

      // Draw faint background particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha * 0.3})`;
        ctx.fill();
      });

      // Update non-center nodes
      const center = nodes[0];
      center.x = width / 2 + (mouse.x - width / 2) * 0.05;
      center.y = height / 2 + (mouse.y - height / 2) * 0.05;

      nodes.forEach((node, idx) => {
        if (!node.isCenter) {
          node.x += node.vx;
          node.y += node.vy;

          // Gentle bounding box bounce
          if (node.x < 50 || node.x > width - 50) node.vx *= -1;
          if (node.y < 40 || node.y > height - 40) node.vy *= -1;

          // Draw connection to center
          ctx.beginPath();
          ctx.moveTo(center.x, center.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(168, 85, 247, 0.25)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Connect to neighbor nodes
          const next = nodes[(idx % (nodes.length - 1)) + 1];
          if (next && !next.isCenter) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(next.x, next.y);
            ctx.strokeStyle = `rgba(255, 255, 255, 0.08)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Draw traveling light pulses along links
          const pulseOffset = (angle * 35 + idx * 40) % 100;
          const px = center.x + (node.x - center.x) * (pulseOffset / 100);
          const py = center.y + (node.y - center.y) * (pulseOffset / 100);
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        }

        // Draw Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node Inner Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Node Label
        ctx.font = node.isCenter ? 'bold 12px Plus Jakarta Sans' : '10px JetBrains Mono';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.radius + 15);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !animationFrameId) render();
    }, { threshold: 0.08 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#070A12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Statement */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-6">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>THE PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
            "We don't just connect brands with creators.
            <br />
            <span className="text-gradient-accent">We connect brands with culture."</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The next generation of industry leaders aren't built on billboard impressions or interruptive banner ads. They are forged through creator trust, community affinity, and cultural participation.
          </p>
        </div>

        {/* Visual Dynamic Network Canvas Container */}
        <div className="rounded-3xl glass-panel-glow border border-white/10 p-6 relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              TOPOLOGY: REALTIME ECOSYSTEM GRAPH
            </span>
            <span className="hidden sm:inline text-slate-500">
              Interactive • Move mouse to shift perspective
            </span>
          </div>

          <div className="w-full relative h-[420px] flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
          </div>

          {/* Node Flow Footer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center">
            <div className="p-2">
              <div className="text-xs font-mono text-cyan-400 font-bold">01 • BRAND BRIEF</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Objective & Audience</div>
            </div>
            <div className="p-2">
              <div className="text-xs font-mono text-pink-400 font-bold">02 • AI CREATOR MATCH</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Verified authenticity</div>
            </div>
            <div className="p-2">
              <div className="text-xs font-mono text-purple-400 font-bold">03 • NATIVE CONTENT</div>
              <div className="text-[11px] text-slate-400 mt-0.5">High-retention Reels</div>
            </div>
            <div className="p-2">
              <div className="text-xs font-mono text-emerald-400 font-bold">04 • MEASURED IMPACT</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Attributed conversions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
