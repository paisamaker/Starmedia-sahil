import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Shirt,
  Cpu,
  UtensilsCrossed,
  Plane,
  Dumbbell,
} from 'lucide-react';
import ReelPhone from './ReelPhone';
import Stats from './Stats';

const creatorCategories = [
  { name: 'Fashion & Luxury', icon: Shirt },
  { name: 'Tech & AI', icon: Cpu },
  { name: 'Food & Dining', icon: UtensilsCrossed },
  { name: 'Travel & Stay', icon: Plane },
  { name: 'Health & Fitness', icon: Dumbbell },
];

const previewCreators = [
  { name: 'Ananya Kapoor', img: '/creators/ananya.jpg' },
  { name: 'Ishaan Reddy', img: '/creators/ishaan.jpg' },
  { name: 'Meera Nair', img: '/creators/meera.jpg' },
  { name: 'Rhea Sen', img: '/images/creator_rhea.jpg' },
];

export default function Hero({ onStartCampaign, onExploreCreators, onSelectCreator }) {
  const reduced = useReducedMotion();
  const item = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#FAF9F6] pt-24 pb-12 sm:pt-28 sm:pb-14 text-stone-900 dark:bg-[#070A12] dark:text-white"
    >
      {/* ============================================================ */}
      {/* FAINT ARCHITECTURAL GRID BACKGROUND PATTERN                   */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
      />

      {/* AMBIENT GRADIENT AURAS */}
      <div
        aria-hidden="true"
        className="aura-drift pointer-events-none absolute -top-24 left-[-8%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.18)_0%,rgba(249,115,22,0.14)_45%,transparent_70%)]"
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:pl-8 lg:pr-8 xl:pl-10 xl:pr-12 max-w-[1680px] mx-auto">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.26fr)_minmax(330px,0.74fr)] lg:gap-6 xl:gap-10">
          {/* ============================================================ */}
          {/* LEFT COLUMN: HERO CONTENT MATCHING MOCKUP                    */}
          {/* ============================================================ */}
          <div className="min-w-0 lg:-ml-2 xl:-ml-4">
            {/* 1. TOP STATUS BADGE PILL */}
            <motion.div {...item} className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-stone-200/90 bg-white px-4 py-1.5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] dark:border-white/10 dark:bg-white/5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-slate-200">
                  INDIA'S #1 CREATOR CONNECTION PLATFORM
                </span>
                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-extrabold text-violet-700 dark:bg-violet-950/80 dark:text-violet-300">
                  10K+ Verified
                </span>
              </div>
            </motion.div>

            {/* 2. HEADLINE WITH DECORATIVE SPARK LINES */}
            <motion.div
              {...item}
              transition={{ ...item.transition, delay: reduced ? 0 : 0.08 }}
              className="relative mt-5"
            >
              <h1 className="font-editorial text-[clamp(3.1rem,6vw,6.4rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-stone-950 dark:text-white">
                <span className="inline-block relative">
                  Turn attention
                  {/* Two purple spark lines to the right of attention */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-1 -right-8 text-violet-500 font-sans text-2xl sm:text-3xl font-black rotate-[18deg] select-none"
                  >
                    //
                  </span>
                </span>
                <br />
                <span>
                  into{' '}
                  <span className="bg-gradient-to-r from-[#A855F7] via-[#EC4899] via-[#F97316] to-[#EAB308] bg-clip-text text-transparent font-extrabold">
                    influence.
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* 3. EDITORIAL DESCRIPTION */}
            <motion.p
              {...item}
              transition={{ ...item.transition, delay: reduced ? 0 : 0.16 }}
              className="mt-6 max-w-2xl text-[17px] leading-relaxed text-stone-600 sm:text-[19px] sm:leading-[1.65] dark:text-slate-300"
            >
              The premier influencer marketing platform connecting ambitious brands with verified creators. Match instantly, launch multi-channel campaigns, and turn real engagement into measurable ROI.
            </motion.p>

            {/* 4. TOP VERTICALS CHIPS */}
            <motion.div
              {...item}
              transition={{ ...item.transition, delay: reduced ? 0 : 0.2 }}
              className="mt-7 flex flex-wrap items-center gap-2.5"
            >
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-stone-400 dark:text-slate-500 mr-1">
                TOP VERTICALS:
              </span>
              {creatorCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={onExploreCreators}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white px-3.5 py-2 text-xs sm:text-[13px] font-bold text-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-violet-500/50 hover:text-violet-600 hover:shadow-sm active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-violet-400"
                  >
                    <Icon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* 5. CTA BUTTONS */}
            <motion.div
              {...item}
              transition={{ ...item.transition, delay: reduced ? 0 : 0.25 }}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <motion.button
                type="button"
                onClick={onStartCampaign}
                whileHover={reduced ? undefined : { y: -1 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F97316] px-8 py-4 text-base font-bold text-white shadow-[0_12px_28px_-12px_rgba(236,72,153,0.85)] hover:shadow-[0_16px_36px_-12px_rgba(236,72,153,0.95)]"
              >
                Start a Campaign
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={onExploreCreators}
                whileHover={reduced ? undefined : { y: -1 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-7 py-4 text-base font-bold text-stone-800 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:bg-stone-50 active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Explore Creators
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </motion.div>

            {/* 6. SOCIAL PROOF & CREATOR AVATARS STACK */}
            <motion.div
              {...item}
              transition={{ ...item.transition, delay: reduced ? 0 : 0.3 }}
              className="mt-7 flex flex-wrap items-center gap-3.5"
            >
              <div className="flex -space-x-2">
                {previewCreators.map((c) => (
                  <div
                    key={c.name}
                    className="relative h-9 w-9 rounded-full border-2 border-white overflow-hidden shadow-xs dark:border-stone-900"
                  >
                    <img src={c.img} alt={c.name} width={36} height={36} decoding="async" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="text-xs text-stone-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 font-extrabold text-stone-900 dark:text-white text-[13px]">
                  <div className="flex text-amber-400 text-xs tracking-tighter">★★★★★</div>
                  <span>4.9/5 Brand Satisfaction</span>
                </div>
                <div className="text-xs font-medium text-stone-500 dark:text-slate-400">
                  10,000+ verified creators ready for brand collaborations
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: SMARTPHONE WITH FLOATING CARDS                 */}
          {/* ============================================================ */}
          <motion.div
            className="min-w-0 flex justify-center lg:justify-end xl:pr-4"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ReelPhone
              onCollaborate={(reel) =>
                onSelectCreator?.({
                  name: reel.creator,
                  category: reel.category,
                })
              }
            />
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM STATS HORIZONTAL ROW                                  */}
        {/* ============================================================ */}
        <motion.div
          {...item}
          transition={{ ...item.transition, delay: reduced ? 0 : 0.35 }}
          className="mt-12 border-t border-stone-200/90 pt-8 dark:border-white/10"
        >
          <Stats />
        </motion.div>
      </div>
    </section>
  );
}
