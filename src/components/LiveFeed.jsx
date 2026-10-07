import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Pause, Play, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { promotionsData } from '../data/promotions';

const ease = [0.22, 1, 0.36, 1];

export default function LiveFeed({ onSelectReel }) {
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const soundOnRef = useRef(false);
  const userPausedRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const promo = promotionsData[index];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const watcher = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { rootMargin: '280px' });
    watcher.observe(root);
    return () => watcher.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!video || !promo || !inView) return undefined;

    let cancelled = false;
    userPausedRef.current = false;
    setPaused(false);
    video.muted = !soundOnRef.current;
    video.volume = 1;
    video.pause();
    video.src = promo.video;
    if (barRef.current) barRef.current.style.transform = 'scaleX(0)';

    const onTime = () => {
      const bar = barRef.current;
      if (!bar || !video.duration) return;
      bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
    };

    const start = () => {
      if (cancelled || userPausedRef.current) return;
      video.muted = !soundOnRef.current;
      canAdvance = true;
      try {
        video.currentTime = 0;
      } catch {
        /* playback still starts with the picture */
      }
      video.play().catch(() => {
        if (cancelled) return;
        video.muted = true;
        soundOnRef.current = false;
        setSoundOn(false);
        video.play().catch(() => {});
      });
    };

    let canAdvance = false;
    const onEnded = () => {
      if (cancelled || userPausedRef.current || !canAdvance) return;
      canAdvance = false;
      setIndex((current) => (current + 1) % promotionsData.length);
    };

    video.addEventListener('loadeddata', start, { once: true });
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', onEnded);
    video.load();

    const observer = root
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) {
              video.pause();
              return;
            }
            if (!userPausedRef.current) video.play().catch(() => {});
          },
          { threshold: 0.35 }
        )
      : null;
    if (root && observer) observer.observe(root);

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', start);
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnded);
      observer?.disconnect();
    };
  }, [index, promo, inView]);

  const selectReel = (next) => {
    if (next === index) return;
    setIndex(next);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      setPaused(false);
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      setPaused(true);
      video.pause();
    }
  };

  const toggleSound = () => {
    const next = !soundOnRef.current;
    soundOnRef.current = next;
    setSoundOn(next);
    const video = videoRef.current;
    if (!video) return;
    video.muted = !next;
    video.volume = 1;
    if (next && video.paused && !userPausedRef.current) video.play().catch(() => {});
  };

  return (
    <section
      id="discover"
      className="flex min-h-[calc(100dvh-5.5rem)] flex-col bg-[#F7F6F3] py-5 sm:py-6 text-stone-950 lg:h-[calc(100dvh-5.5rem)] lg:overflow-hidden"
    >
      <div className="flex w-full flex-1 flex-col px-5 sm:px-8 lg:min-h-0 lg:px-12 xl:px-16 2xl:px-20">
        <motion.div
          className="mb-4 flex shrink-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-500">
              Brand promotions
            </p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              What&apos;s moving{' '}
              <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                right now
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-stone-500 sm:text-right">
            Three brand films on the left. The card changes to the next brand when the film ends.
          </p>
        </motion.div>

        <div className="grid min-h-0 flex-1 items-stretch gap-5 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] xl:grid-cols-[minmax(360px,460px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(400px,500px)_minmax(0,1fr)] xl:gap-8">
          <div
            ref={rootRef}
            className="relative h-[min(62vh,540px)] overflow-hidden rounded-3xl bg-stone-900 shadow-[0_16px_40px_rgba(28,25,23,0.12)] lg:h-full"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={promo.poster}
              playsInline
              muted={!soundOn}
              preload="metadata"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4">
              <p className="text-sm font-semibold text-white">{promo.brand}</p>
              <p className="text-xs text-white/75">
                {promo.byline} · {promo.category}
              </p>
            </div>
            <div
              ref={barRef}
              className="absolute inset-x-0 bottom-0 z-10 h-1 origin-left bg-pink-500"
              style={{ transform: 'scaleX(0)' }}
            />
            <div className="absolute right-3 top-3 z-10 flex gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-sm transition hover:bg-white"
                aria-label={paused ? 'Play reel' : 'Pause reel'}
              >
                {paused ? <Play className="ml-0.5 h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={toggleSound}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-900 shadow-sm transition hover:bg-white"
                aria-label={soundOn ? 'Mute reel' : 'Unmute reel'}
              >
                {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <article className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white p-5 shadow-[0_15px_45px_rgba(28,25,23,0.06)] sm:p-6 xl:p-7">
            {/* Subtle aesthetic background ambient blur */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink-100/40" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-100/30" />

            <AnimatePresence mode="wait">
              <motion.div
                key={promo.id}
                className="relative z-10 flex h-full flex-col"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
              >
                <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-pink-500">
                      Promotional brand
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                      {promo.brand}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {promo.byline}
                      <span className="mx-1.5 text-stone-300">·</span>
                      {promo.category}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-semibold text-pink-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                    {index + 1} / {promotionsData.length}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-stone-600">{promo.detail}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-pink-500">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      What the film promotes
                    </p>
                    <p className="mt-2 text-sm font-semibold text-stone-950">{promo.offer}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-pink-500">
                      Ad placement
                    </p>
                    <p className="mt-2 text-sm font-semibold text-stone-950">{promo.format}</p>
                    <p className="mt-1 text-xs leading-relaxed text-stone-500">
                      {promo.placement}. {promo.objective}.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {promo.highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-stone-200 px-2.5 py-1 text-[11px] font-medium text-stone-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3 border-t border-stone-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectReel?.(promo)}
                    className="group inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
                  >
                    Start a similar campaign
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <div className="flex gap-2" role="tablist" aria-label="Choose a brand promotion">
                    {promotionsData.map((item, itemIndex) => {
                      const active = itemIndex === index;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => selectReel(itemIndex)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                            active
                              ? 'bg-pink-500 text-white'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {item.shortName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </article>
        </div>
      </div>
    </section>
  );
}
