import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Car,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  PartyPopper,
  Monitor,
  Plane,
  Search,
  Shirt,
  Sparkles,
  Utensils,
  Wallet,
} from 'lucide-react';
import { categoriesList, creatorsData } from '../data/creators';
import CreatorCard from './CreatorCard';

const categoryIcons = {
  Fashion: Shirt,
  Beauty: Sparkles,
  Technology: Monitor,
  Gaming: Gamepad2,
  Fitness: Dumbbell,
  Travel: Plane,
  Food: Utensils,
  Finance: Wallet,
  Lifestyle: Sparkles,
  Comedy: PartyPopper,
  Automotive: Car,
  Education: GraduationCap,
};

export default function CreatorUniverse({ onSelectCreator }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef(null);

  const filteredCreators = creatorsData.filter((creator) => {
    const matchesCategory =
      activeCategory === 'All' || creator.category.toLowerCase() === activeCategory.toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      creator.name.toLowerCase().includes(query) ||
      creator.username.toLowerCase().includes(query) ||
      creator.location.toLowerCase().includes(query) ||
      creator.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(maxScroll > 10 && el.scrollLeft < maxScroll - 10);
    const progress = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory, searchQuery, updateScrollState]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [updateScrollState, filteredCreators.length]);

  const handleShift = (direction) => {
    const el = containerRef.current;
    if (!el) return;
    const cardEl = el.querySelector('[data-creator-card]');
    // Shift by 1 card width + gap (20px)
    const cardWidth = cardEl ? cardEl.getBoundingClientRect().width : 300;
    const shiftAmount = cardWidth + 20;

    el.scrollBy({
      left: direction === 'left' ? -shiftAmount : shiftAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="creators" className="relative flex h-[calc(100dvh-5.5rem)] min-h-[640px] flex-col overflow-hidden bg-[#EFEDE8] py-5 text-stone-900">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(251,207,232,0.35) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(221,214,254,0.4) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1600px] flex-col px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-2 max-w-3xl shrink-0 text-center">
          <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-500">
            <Sparkles className="h-3.5 w-3.5" />
            Discover • Connect • Collaborate
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-stone-950 sm:text-4xl">
            Every niche.{' '}
            <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              Every audience.
            </span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-stone-500 sm:text-base">
            Filter through 10,000+ hand-verified, brand-safe creators across 12 high-velocity cultural verticals.
          </p>
        </div>

        <div className="mb-3 flex shrink-0 items-center gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-center">
          {categoriesList.map((category) => {
            const Icon = categoryIcons[category];
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-sm'
                    : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900'
                }`}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                {category}
              </button>
            );
          })}
        </div>

        <div className="mb-3 flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by creator name, niche, or location..."
              className="w-full rounded-full border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-violet-300"
            />
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2 px-1 text-sm text-stone-500">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Showing verified creators only
            </span>
            <span className="inline-flex items-center gap-2 font-semibold text-stone-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              10K+ Authentic Creators
            </span>
          </div>
        </div>

        {/* Shift navigation bar & count */}
        <div className="mb-3 flex shrink-0 items-center justify-between px-1">
          <div className="flex items-center gap-2.5 text-sm text-stone-600">
            <span className="inline-flex items-center rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-700 border border-violet-200/60">
              {filteredCreators.length} Available
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-medium text-stone-500 hidden sm:inline">
              Single-row view (4 per screen) — Shift with arrows to view more
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleShift('left')}
              disabled={!canScrollLeft}
              aria-label="Shift creators left"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition-all hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => handleShift('right')}
              disabled={!canScrollRight}
              aria-label="Shift creators right"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition-all hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {filteredCreators.length > 0 ? (
          <div className="relative flex min-h-0 flex-1 flex-col group/carousel">
            {/* Floating Left Shift Button on carousel edge */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => handleShift('left')}
                aria-label="Shift left"
                className="absolute -left-3 sm:-left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200/80 bg-white/95 text-stone-800 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-violet-300 hover:bg-white active:scale-95"
              >
                <ChevronLeft className="h-5 w-5 text-stone-700" />
              </button>
            )}

            {/* Single Row Horizontal Track (Only 1 row ever, exactly 4 cards visible on desktop) */}
            <div
              ref={containerRef}
              onScroll={updateScrollState}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              className="flex min-h-0 flex-1 flex-nowrap items-stretch gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            >
              {filteredCreators.map((creator) => (
                <div
                  key={creator.id}
                  data-creator-card
                  className="h-full w-full shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
                >
                  <CreatorCard creator={creator} onSelect={onSelectCreator} />
                </div>
              ))}
            </div>

            {/* Floating Right Shift Button on carousel edge */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => handleShift('right')}
                aria-label="Shift right"
                className="absolute -right-3 sm:-right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200/80 bg-white/95 text-stone-800 shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-violet-300 hover:bg-white active:scale-95"
              >
                <ChevronRight className="h-5 w-5 text-stone-700" />
              </button>
            )}

            {/* Progress bar line indicator below the row */}
            <div className="relative z-10 mt-2 flex shrink-0 items-center justify-center bg-[#EFEDE8] py-1">
              <div className="h-1.5 w-44 overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${Math.max(15, scrollProgress)}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="rounded-2xl border border-stone-200 bg-white px-6 py-10 text-center text-sm text-stone-500">
            No creators match that search. Try another niche or name.
          </p>
        )}
      </div>
    </section>
  );
}
