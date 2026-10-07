import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    let frame = 0;
    let x = -100;
    let y = -100;
    let hovered = false;

    const paint = () => {
      frame = 0;
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${hovered ? 1.6 : 1})`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      const nextHovered = Boolean(
        event.target.closest?.('a, button, input, select, textarea, [role="button"]')
      );
      if (nextHovered !== hovered) {
        hovered = nextHovered;
        ringRef.current?.classList.toggle('border-violet-500', hovered);
      }
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-7 w-7 rounded-full border border-stone-900/40 md:block dark:border-white/40"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-violet-600 md:block"
      />
    </>
  );
}
