import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { brandPartners } from '../data/brands';
import { BrandLogo } from './BrandLogos';
import { ChevronLeft, ChevronRight, Train, Sparkles } from 'lucide-react';

const AUTO_INTERVAL_MS = 2000; // Auto changes every 2 seconds
const CARS_PER_SET = 4;

export default function TrustedBrands() {
  const reduced = useReducedMotion();
  const [activeTrack, setActiveTrack] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalTracks = Math.ceil(brandPartners.length / CARS_PER_SET);

  const getTrackBrands = useCallback(
    (trackIndex) => {
      const start = trackIndex * CARS_PER_SET;
      return brandPartners.slice(start, start + CARS_PER_SET);
    },
    []
  );

  const nextTrack = useCallback(() => {
    setDirection(1);
    setProgress(0);
    setActiveTrack((prev) => (prev + 1) % totalTracks);
  }, [totalTracks]);

  const prevTrack = useCallback(() => {
    setDirection(-1);
    setProgress(0);
    setActiveTrack((prev) => (prev - 1 + totalTracks) % totalTracks);
  }, [totalTracks]);

  const jumpToTrack = (index) => {
    setDirection(index >= activeTrack ? 1 : -1);
    setProgress(0);
    setActiveTrack(index);
  };

  // 2-Second Auto Change Timer with Visual Progress
  useEffect(() => {
    if (isHovered) return;

    const startTime = performance.now();
    let frameId;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const currentPct = Math.min(100, (elapsed / AUTO_INTERVAL_MS) * 100);
      setProgress(currentPct);

      if (elapsed < AUTO_INTERVAL_MS) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    const timer = setTimeout(() => {
      nextTrack();
    }, AUTO_INTERVAL_MS);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [activeTrack, isHovered, nextTrack]);

  // Train Transition Variants (authentically slides like a high-speed express train)
  const trainVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.6,
      scale: 0.99,
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 25, mass: 0.8 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.4,
      scale: 0.99,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 25, mass: 0.8 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const currentBrands = getTrackBrands(activeTrack);

  return (
    <motion.section
      id="brands"
      className="relative w-full overflow-hidden border-y border-stone-200/80 bg-[#FFFcf8] py-12 text-stone-900 sm:py-16 dark:border-white/10 dark:bg-[#0B1020] dark:text-white"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[80%] rounded-full bg-gradient-to-r from-violet-600/10 via-pink-500/10 to-amber-500/10"
      />

      {/* FULL SCREEN CONTAINER (Edge-to-edge layout) */}
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-12">
        {/* HEADER & TRAIN STATION METADATA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 w-full">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm">
              <Train className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-stone-600 dark:text-slate-300">
                Trusted by market leaders
              </p>
            </div>
          </div>

          {/* STATION TRACK INDICATORS & CONTROLS */}
          <div className="flex items-center gap-3.5">
            <span className="text-[11px] font-mono tracking-wider text-stone-500 dark:text-slate-400 uppercase flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Express Track {activeTrack + 1} of {totalTracks}
            </span>

            {/* Track selector pills */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalTracks }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => jumpToTrack(i)}
                  aria-label={`Jump to train track ${i + 1}`}
                  className={`h-2.5 transition-all duration-300 rounded-full ${
                    i === activeTrack
                      ? 'w-7 bg-stone-900 dark:bg-white'
                      : 'w-2.5 bg-stone-300 hover:bg-stone-400 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Manual Train Navigation Arrows */}
            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={prevTrack}
                aria-label="Previous brands"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs hover:bg-stone-50 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextTrack}
                aria-label="Next brands"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-xs hover:bg-stone-50 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* FULL SCREEN TRAIN TRACK CAROUSEL CONTAINER                   */}
        {/* ============================================================ */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100/70 p-2.5 sm:p-3 shadow-sm dark:border-white/10 dark:bg-stone-900/60">
          <div className="relative min-h-[140px] sm:min-h-[155px] overflow-hidden rounded-xl">
            <AnimatePresence custom={direction} initial={false} mode="popLayout">
              <motion.div
                key={activeTrack}
                custom={direction}
                variants={reduced ? undefined : trainVariants}
                initial={reduced ? { opacity: 0 } : 'enter'}
                animate={reduced ? { opacity: 1 } : 'center'}
                exit={reduced ? { opacity: 0 } : 'exit'}
                className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3.5"
              >
                {currentBrands.map((brand, idx) => (
                  <div
                    key={brand.name}
                    className="group relative flex flex-col items-center justify-center rounded-xl border border-stone-200/90 bg-white px-5 py-7 sm:py-8 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-stone-950/80"
                  >
                    {/* Train Carriage Number Badge */}
                    <div className="absolute top-2.5 left-3 flex items-center gap-1 text-[10px] font-mono text-stone-400 dark:text-slate-500">
                      <span>CAR 0{idx + 1}</span>
                    </div>

                    {/* Campaign Drop Tag */}
                    <div className="absolute top-2.5 right-3 hidden sm:flex items-center gap-1 text-[10px] font-mono font-medium text-violet-600 dark:text-violet-400">
                      <Sparkles className="h-3 w-3" />
                      <span>{brand.tag}</span>
                    </div>

                    {/* REAL VECTOR LOGO (Enlarged for full-screen impact) */}
                    <div className="my-2.5 flex h-10 sm:h-11 items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <BrandLogo name={brand.name} className="h-8 sm:h-9 w-auto max-w-[170px]" />
                    </div>

                    {/* SECTOR LABEL */}
                    <span className="mt-1.5 block text-center text-xs sm:text-[13px] font-medium text-stone-600 transition-colors group-hover:text-stone-950 dark:text-slate-400 dark:group-hover:text-white">
                      {brand.sector}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ============================================================ */}
          {/* TRAIN TRACK WITH ACTIVE 2-SECOND PROGRESS HEADLIGHT          */}
          {/* ============================================================ */}
          <div className="mt-3 px-1 pb-1">
            {/* Railroad Track Visual: Twin rails with sleepers */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-white/10">
              {/* Active train travel progress */}
              <motion.div
                className="h-full bg-gradient-to-r from-violet-600 via-pink-500 to-amber-500 shadow-sm"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {isHovered ? 'Paused on hover' : 'Next departure in 2.0s'}
              </span>
              <span className="font-semibold tracking-wider">STAR MEDIA BRAND NETWORK</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
