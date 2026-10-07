import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Plus,
  Play,
} from 'lucide-react';
import ReelPlayer from './ReelPlayer';

export default function ReelPhone({ onCollaborate }) {
  return (
    <div className="relative mx-auto flex w-full max-w-[325px] items-center justify-center sm:max-w-[340px] md:max-w-[355px] lg:max-w-[365px]">
      {/* ============================================================ */}
      {/* BACKGROUND CREATOR MESH GLOW & RADIAL WAVES                  */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 -z-20 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(168,85,247,0.22),transparent_62%)]"
      />

      {/* BACKGROUND ORBIT ARCS & WAVES */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-15 flex items-center justify-center opacity-70"
      >
        <div className="h-[460px] w-[460px] sm:h-[500px] sm:w-[500px] rounded-full border border-purple-400/20 shadow-[0_0_40px_rgba(168,85,247,0.12)]" />
        <div className="absolute h-[600px] w-[600px] sm:h-[640px] sm:w-[640px] rounded-full border border-dashed border-pink-400/20" />
      </div>

      {/* ============================================================ */}
      {/* DECORATIVE HAND-DRAWN DOODLES                                */}
      {/* ============================================================ */}

      {/* 1. TOP-CENTER ORANGE HAND-DRAWN STAR */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/3 -translate-x-1/2 z-10"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 text-amber-500 fill-none stroke-current stroke-2 animate-pulse">
          <path d="M16 2L18.5 12.5L29 15L18.5 17.5L16 28L13.5 17.5L3 15L13.5 12.5Z" />
        </svg>
      </div>

      {/* 2. HAND-DRAWN PURPLE SPARKLE (Bottom) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/4 z-10 text-purple-500"
      >
        <span className="text-xl font-bold">✦</span>
      </div>

      {/* 3. RED SQUIGGLY LINE (Bottom-Right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -right-16 z-10 hidden sm:block text-rose-500 opacity-80"
      >
        <svg viewBox="0 0 70 20" className="h-5 w-16 fill-none stroke-rose-500 stroke-2">
          <path d="M2 10 Q 12 2, 22 10 T 42 10 T 62 10" />
        </svg>
      </div>

      {/* 4. HAND-DRAWN TEXT: "Real Creators Real Impact" WITH CURVED ARROW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 sm:-left-28 top-[36%] z-30 hidden sm:flex flex-col items-center rotate-[-12deg]"
      >
        <span className="font-handwritten text-lg font-bold text-stone-700/80 dark:text-stone-300 leading-tight">
          Real Creators<br />Real Impact
        </span>
        {/* Curved arrow pointing to the phone */}
        <svg viewBox="0 0 60 40" className="h-8 w-12 text-stone-700/70 dark:text-stone-300 fill-none stroke-current stroke-[1.8] stroke-linecap-round mt-1">
          <path d="M8 8 Q 38 4, 48 24" />
          <path d="M40 22 L 48 24 L 46 16" />
        </svg>
      </div>

      {/* 5. HAND-DRAWN TEXT: "Discover Collaborate Grow" */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 sm:-right-20 top-[26%] z-30 hidden sm:flex flex-col items-center rotate-[8deg]"
      >
        <span className="font-handwritten text-[17px] font-bold text-stone-700/80 dark:text-stone-300 leading-tight text-center">
          Discover<br />Collaborate<br />Grow
        </span>
      </div>

      {/* ============================================================ */}
      {/* FLOATING CARD 1: TOP-LEFT "CAMPAIGN VELOCITY"                */}
      {/* ============================================================ */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: -15, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="pointer-events-none absolute -top-4 -left-12 z-35 flex flex-col rounded-2xl border border-stone-200/90 bg-white/95 p-3.5 shadow-[0_20px_45px_-12px_rgba(28,25,23,0.18)] sm:-left-20 dark:border-white/15 dark:bg-stone-900/95"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white shadow-sm mb-2">
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
          Campaign Velocity
        </div>
        <div className="text-xl font-extrabold text-stone-950 dark:text-white leading-tight">
          +4.8x
        </div>
        <div className="text-[10px] font-medium text-stone-500 dark:text-slate-400">
          Avg. ROAS
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* FLOATING CARD 2: BOTTOM-LEFT "VERIFIED 10K+ CREATORS"        */}
      {/* ============================================================ */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: -15, y: 15 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="pointer-events-none absolute -bottom-5 -left-10 z-35 flex flex-col rounded-2xl border border-stone-200/90 bg-white/95 p-3.5 shadow-[0_20px_45px_-12px_rgba(28,25,23,0.18)] sm:-left-18 dark:border-white/15 dark:bg-stone-900/95"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-xs">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            VERIFIED
          </span>
        </div>
        <div className="text-base font-extrabold text-stone-950 dark:text-white leading-tight mb-2">
          10K+ Creators
        </div>

        {/* 3 Overlapping mini avatars + plus icon */}
        <div className="flex items-center -space-x-1.5">
          <img
            src="/creators/ananya.jpg"
            alt="Ananya"
            width={24}
            height={24}
            decoding="async"
            className="h-6 w-6 rounded-full border-2 border-white object-cover dark:border-stone-900 shadow-xs"
          />
          <img
            src="/creators/ishaan.jpg"
            alt="Ishaan"
            width={24}
            height={24}
            decoding="async"
            className="h-6 w-6 rounded-full border-2 border-white object-cover dark:border-stone-900 shadow-xs"
          />
          <img
            src="/creators/meera.jpg"
            alt="Meera"
            width={24}
            height={24}
            decoding="async"
            className="h-6 w-6 rounded-full border-2 border-white object-cover dark:border-stone-900 shadow-xs"
          />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-stone-100 text-[10px] font-bold text-stone-600 dark:border-stone-900 dark:bg-stone-800 dark:text-stone-300">
            +
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* FLOATING CARD 3: BOTTOM-RIGHT "BRANDS SEE 3x HIGHER"         */}
      {/* ============================================================ */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: 15, y: 15 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="pointer-events-none absolute -right-8 -bottom-3 z-35 flex items-center gap-3 rounded-2xl border border-stone-200/90 bg-white/95 p-3 shadow-[0_20px_45px_-12px_rgba(28,25,23,0.18)] sm:-right-14 dark:border-white/15 dark:bg-stone-900/95"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white shadow-sm">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
            BRANDS SEE
          </div>
          <div className="text-sm font-extrabold text-stone-950 dark:text-white leading-tight">
            3x Higher
          </div>
          <div className="text-[10px] text-stone-500 dark:text-slate-400 font-medium">
            Engagement Rate
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* FLOATING 3D INSTAGRAM GLYPH (Top-Right Accent)               */}
      {/* ============================================================ */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="pointer-events-none absolute -top-3 -right-6 z-35 flex h-11 w-11 rotate-[8deg] items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-2.5 text-white shadow-[0_12px_28px_-6px_rgba(225,48,108,0.5)] sm:-right-12"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 stroke-white stroke-[2.2] fill-none stroke-linecap-round stroke-linejoin-round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
        </svg>
      </motion.div>

      {/* ============================================================ */}
      {/* FLOATING 3D PLAY GEM (Right-Side)                            */}
      {/* ============================================================ */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="pointer-events-none absolute top-[44%] -right-7 z-35 flex h-10 w-10 rotate-[14deg] items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-pink-500 p-2 text-white shadow-[0_12px_28px_-6px_rgba(217,70,239,0.5)] sm:-right-10"
      >
        <Play className="h-5 w-5 fill-white ml-0.5" />
      </motion.div>

      {/* ============================================================ */}
      {/* MAIN CENTER SMARTPHONE CHASSIS                               */}
      {/* ============================================================ */}
      <div className="w-full">
        {/* TITANIUM METALLIC OUTER FRAME */}
        <div className="relative rounded-[3rem] bg-gradient-to-b from-stone-300 via-stone-500 to-stone-800 p-[2.5px] shadow-[0_36px_85px_-24px_rgba(28,25,23,0.48),0_18px_36px_-12px_rgba(168,85,247,0.25)] dark:from-zinc-500 dark:via-zinc-700 dark:to-zinc-950">
          {/* HARDWARE BUTTONS */}
          <span
            aria-hidden="true"
            className="absolute top-24 -left-[2.5px] h-7 w-[2.5px] rounded-l-xs bg-stone-400 dark:bg-zinc-600"
          />
          <span
            aria-hidden="true"
            className="absolute top-36 -left-[2.5px] h-11 w-[2.5px] rounded-l-xs bg-stone-400 dark:bg-zinc-600"
          />
          <span
            aria-hidden="true"
            className="absolute top-52 -left-[2.5px] h-11 w-[2.5px] rounded-l-xs bg-stone-400 dark:bg-zinc-600"
          />
          <span
            aria-hidden="true"
            className="absolute top-40 -right-[2.5px] h-16 w-[2.5px] rounded-r-xs bg-stone-400 dark:bg-zinc-600"
          />

          {/* INNER OBSIDIAN BEZEL */}
          <div className="rounded-[2.85rem] bg-stone-950 p-[8px]">
            {/* DISPLAY SURFACE */}
            <div className="relative aspect-[9/18.8] w-full overflow-hidden rounded-[2.4rem] bg-black shadow-inner">
              {/* REEL PLAYER INTERACTIVE FEED */}
              <ReelPlayer onCollaborate={onCollaborate} />

              {/* DYNAMIC ISLAND NOTCH */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-2.5 left-1/2 z-35 flex h-[23px] w-[98px] -translate-x-1/2 items-center justify-between rounded-full bg-black px-2.5 ring-1 ring-white/15 shadow-sm"
              >
                {/* Camera lens glint */}
                <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-stone-900 ring-1 ring-stone-800">
                  <div className="h-1 w-1 rounded-full bg-indigo-950" />
                </div>
                {/* Sensor pill & micro live indicator */}
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] font-mono tracking-wider text-white/85 font-bold">
                    LIVE
                  </span>
                </div>
              </div>

              {/* SCREEN SPECULAR GLASS GLARE REFLECTION */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 rounded-[2.4rem] bg-gradient-to-tr from-white/0 via-white/5 to-transparent"
              />

              {/* APPLE-STYLE HOME INDICATOR BAR */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1.5 left-1/2 z-35 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
