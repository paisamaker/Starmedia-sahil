import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Heart,
  MessageCircle,
  Music,
  Pause,
  Play,
  Share2,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
} from 'lucide-react';
import { reelsData } from '../data/reels';

export default function ReelPlayer({ reels = reelsData, onCollaborate }) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const fillRefs = useRef([]);
  const userPausedRef = useRef(false);
  const soundOnRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [likedMap, setLikedMap] = useState({});
  const [savedMap, setSavedMap] = useState({});
  const [showShareToast, setShowShareToast] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [heartBurst, setHeartBurst] = useState(false);

  const count = reels.length;
  const currentReel = reels[currentIndex];

  // Navigate to target index with explicit vertical slide direction
  const goTo = useCallback(
    (newIndex) => {
      userPausedRef.current = false;
      setIsPaused(false);
      setIsVideoReady(false);
      setShowSwipeHint(false);
      setCurrentIndex((newIndex + count) % count);
    },
    [count]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  const syncSound = useCallback((video, enabled) => {
    if (!video) return;
    video.muted = !enabled;
    video.volume = 1;
    video.defaultMuted = !enabled;
  }, []);

  useEffect(() => {
    fillRefs.current.forEach((bar, index) => {
      if (!bar) return;
      bar.style.transform = `scaleX(${index < currentIndex ? 1 : 0})`;
    });
  }, [currentIndex]);

  useEffect(() => {
    const next = reels[(currentIndex + 1) % reels.length];
    if (!next?.video) return undefined;
    const preload = document.createElement('video');
    preload.preload = 'auto';
    preload.muted = true;
    preload.playsInline = true;
    preload.src = next.video;
    preload.load();
    return () => {
      preload.pause();
      preload.removeAttribute('src');
      preload.load();
    };
  }, [currentIndex, reels]);

  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!video) return undefined;

    const reel = reels[currentIndex];
    if (!reel) return undefined;
    let cancelled = false;
    syncSound(video, soundOnRef.current);
    video.pause();
    video.src = reel.video;

    const start = () => {
      if (cancelled || userPausedRef.current) return;
      syncSound(video, soundOnRef.current);
      try {
        video.currentTime = 0;
      } catch {
        /* metadata can arrive a moment later; playback still starts together */
      }
      video.play().catch(() => {
        if (cancelled) return;
        // If browser blocks unmuted autoplay without user gesture,
        // start playback muted and seamlessly unmute upon first user interaction
        syncSound(video, false);
        video.play().catch(() => {});

        const unmuteOnUserGesture = () => {
          if (!userPausedRef.current && soundOnRef.current && videoRef.current) {
            syncSound(videoRef.current, true);
          }
        };
        window.addEventListener('pointerdown', unmuteOnUserGesture, { once: true });
        window.addEventListener('keydown', unmuteOnUserGesture, { once: true });
        window.addEventListener('touchstart', unmuteOnUserGesture, { once: true });
      });
    };

    video.addEventListener('loadeddata', start, { once: true });
    video.load();

    const observer = root
      ? new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) {
            video.pause();
            return;
          }
          if (!userPausedRef.current) video.play().catch(() => {});
        }, { threshold: 0.35 })
      : null;
    if (root && observer) observer.observe(root);

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', start);
      observer?.disconnect();
    };
  }, [currentIndex, reels, syncSound]);

  // Dismiss swipe hint automatically after 4 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 4200);
    return () => clearTimeout(t);
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      setIsPaused(false);
      video.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      setIsPaused(true);
      video.pause();
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const next = !soundOnRef.current;
    soundOnRef.current = next;
    setSoundOn(next);
    const video = videoRef.current;
    if (!video) return;
    syncSound(video, next);
    if (next && video.paused && !userPausedRef.current) {
      video.play().catch(() => {});
    }
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    const id = currentReel.id;
    const isLiked = !likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: isLiked }));
    if (isLiked) {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 800);
    }
  };

  const toggleSave = (e) => {
    e.stopPropagation();
    const id = currentReel.id;
    setSavedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2200);
    }
  };

  if (!currentReel) return null;

  return (
    <div
      ref={rootRef}
      onClick={() => {
        if (soundOnRef.current) return;
        soundOnRef.current = true;
        setSoundOn(true);
        const video = videoRef.current;
        if (!video) return;
        syncSound(video, true);
        if (!userPausedRef.current) video.play().catch(() => {});
      }}
      className="relative h-full w-full select-none overflow-hidden bg-stone-950 font-sans text-white"
    >
      <div className="absolute inset-0 h-full w-full">
          <img
            src={currentReel.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <video
            ref={videoRef}
            poster={currentReel.poster}
            playsInline
            preload="auto"
            muted={!soundOn}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={() => setIsVideoReady(true)}
            onPlaying={() => setIsVideoReady(true)}
            onTimeUpdate={(event) => {
              const vid = event.currentTarget;
              const bar = fillRefs.current[currentIndex];
              if (!bar || !vid.duration || !Number.isFinite(vid.duration)) return;
              bar.style.transform = `scaleX(${vid.currentTime / vid.duration})`;
            }}
            onEnded={() => {
              if (!userPausedRef.current) goNext();
            }}
            onError={() => setIsVideoReady(false)}
          />

          {/* CINEMATIC VIGNETTE OVERLAY FOR EDITORIAL CONTRAST */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/85"
          />

          {/* HEART BURST ON DOUBLE TAP OR LIKE */}
          <AnimatePresence>
            {heartBurst && (
              <motion.div
                initial={{ scale: 0, opacity: 0.9, y: 0 }}
                animate={{ scale: 1.4, opacity: 1, y: -20 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center z-30"
              >
                <div className="rounded-full bg-rose-500/30 p-6 backdrop-blur-sm">
                  <Heart className="h-16 w-16 fill-rose-500 text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>

      {/* PAUSE OVERLAY INDICATOR */}
      {isPaused && (
        <div
          onClick={togglePlay}
          className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-black/25 backdrop-blur-[1px] cursor-pointer"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md ring-1 ring-white/20 transition-transform hover:scale-110">
            <Play className="h-5 w-5 fill-white ml-0.5" />
          </div>
        </div>
      )}

      {/* TOP HEADER CONTROLS */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-25 flex flex-col px-3 pt-9 pb-3">
        {/* REEL PROGRESS BARS (Multi-story indicator) */}
        <div className="pointer-events-auto mb-2 flex gap-1" role="tablist" aria-label="Reel progress">
          {reels.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Jump to reel ${index + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                goTo(index, index > currentIndex ? 1 : -1);
              }}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/30 backdrop-blur-xs transition-colors hover:bg-white/50"
            >
              <span
                ref={(node) => {
                  fillRefs.current[index] = node;
                }}
                className="block h-full w-full origin-left bg-white"
              />
            </button>
          ))}
        </div>

        {/* TOP STATUS BAR */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-0.5 text-[9px] font-semibold tracking-wider text-white backdrop-blur-md ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE REEL
            </span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-md">
              {currentReel.category}
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={soundOn ? 'Mute' : 'Unmute reel audio'}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white/90 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
            >
              {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPaused ? 'Play' : 'Pause'}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white/90 backdrop-blur-md transition-colors hover:bg-black/70 hover:text-white"
            >
              {isPaused ? <Play className="h-3.5 w-3.5 fill-white ml-0.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* LEFT NAVIGATION CHEVRONS */}
      <div className="pointer-events-auto absolute left-2.5 top-1/2 z-25 flex -translate-y-1/2 flex-col gap-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous reel"
          title="Previous reel"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white/85 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/75 hover:text-white active:scale-95"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next reel"
          title="Next reel"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white/85 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/75 hover:text-white active:scale-95"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* SWIPE HINT OVERLAY (Visual cue for vertical scrolling) */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute bottom-24 left-1/2 z-25 -translate-x-1/2 flex flex-col items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/15"
          >
            <ChevronUp className="h-3 w-3 animate-bounce text-violet-300" />
            <span className="text-[10px] font-medium tracking-wide text-white/90">
              Swipe or scroll
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CONTENT + ACTION RAIL */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-25 flex items-end justify-between gap-2 px-3 pb-4 pt-12">
        {/* CREATOR INFO & CAPTION */}
        <div className="pointer-events-auto min-w-0 flex-1 pr-1">
          {/* Creator Profile Header */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-8 w-8 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-md">
                <img
                  src={currentReel.avatar}
                  alt={currentReel.creator}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-1 ring-black">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="truncate text-xs font-bold text-white drop-shadow-sm">
                  {currentReel.creator}
                </span>
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 fill-sky-400 text-white" />
              </div>
              <div className="truncate text-[10px] text-white/75 font-mono">
                {currentReel.username} · {currentReel.followers}
              </div>
            </div>
          </div>

          {/* Collaborate CTA Pill */}
          <div className="mt-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCollaborate?.(currentReel);
              }}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-stone-950 shadow-md transition-all hover:bg-stone-100 hover:shadow-lg active:scale-95"
            >
              <Sparkles className="h-3 w-3 text-violet-600" />
              Collaborate
            </button>
            <span className="rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-mono text-emerald-400 backdrop-blur-xs">
              {currentReel.engagementRate} Eng
            </span>
          </div>

          {/* Caption */}
          <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-white/95 drop-shadow-sm">
            {currentReel.caption}
          </p>

          {/* Music Audio Ticker with Animated Equalizer */}
          <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-white/80">
            <Music className="h-3 w-3 shrink-0 text-violet-300" />
            <span className="truncate font-mono">{currentReel.soundTitle}</span>
            <div className="ml-1 flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-violet-400 rounded-full animate-eq-1" />
              <span className="w-0.5 bg-pink-400 rounded-full animate-eq-2" />
              <span className="w-0.5 bg-cyan-400 rounded-full animate-eq-3" />
            </div>
          </div>
        </div>

        {/* RIGHT VERTICAL ACTION RAIL */}
        <div className="pointer-events-auto flex flex-col items-center gap-2.5 pb-0.5">
          {/* Like Button */}
          <button
            type="button"
            onClick={toggleLike}
            aria-label={likedMap[currentReel.id] ? 'Liked' : 'Like'}
            className="group flex flex-col items-center gap-0.5 transition-transform active:scale-90"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                likedMap[currentReel.id]
                  ? 'bg-rose-500/25 ring-1 ring-rose-500/50'
                  : 'bg-black/45 group-hover:bg-black/65'
              }`}
            >
              <Heart
                className={`h-4 w-4 transition-all ${
                  likedMap[currentReel.id]
                    ? 'fill-rose-500 text-rose-500 scale-110'
                    : 'text-white group-hover:scale-110'
                }`}
              />
            </span>
            <span className="text-[9px] font-medium text-white/90 font-mono">
              {likedMap[currentReel.id] ? 'Liked' : currentReel.likes}
            </span>
          </button>

          {/* Comments Button */}
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="Comments"
            className="group flex flex-col items-center gap-0.5 transition-transform active:scale-90"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/45 backdrop-blur-md transition-colors group-hover:bg-black/65">
              <MessageCircle className="h-4 w-4 text-white group-hover:scale-110" />
            </span>
            <span className="text-[9px] font-medium text-white/90 font-mono">
              {currentReel.comments}
            </span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share reel"
            className="group flex flex-col items-center gap-0.5 transition-transform active:scale-90"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/45 backdrop-blur-md transition-colors group-hover:bg-black/65">
              <Share2 className="h-4 w-4 text-white group-hover:scale-110" />
            </span>
            <span className="text-[9px] font-medium text-white/90 font-mono">
              {currentReel.shares}
            </span>
          </button>

          {/* Bookmark / Save Button */}
          <button
            type="button"
            onClick={toggleSave}
            aria-label={savedMap[currentReel.id] ? 'Saved' : 'Save'}
            className="group flex flex-col items-center gap-0.5 transition-transform active:scale-90"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                savedMap[currentReel.id]
                  ? 'bg-amber-500/25 ring-1 ring-amber-500/50'
                  : 'bg-black/45 group-hover:bg-black/65'
              }`}
            >
              <Bookmark
                className={`h-4 w-4 transition-all ${
                  savedMap[currentReel.id]
                    ? 'fill-amber-400 text-amber-400 scale-110'
                    : 'text-white group-hover:scale-110'
                }`}
              />
            </span>
            <span className="text-[9px] font-medium text-white/90">Save</span>
          </button>
        </div>
      </div>

      {/* SHARE TOAST */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="pointer-events-none absolute bottom-16 left-1/2 z-35 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-stone-900/90 px-3 py-1.5 text-[10px] font-medium text-white shadow-xl backdrop-blur-md ring-1 ring-white/20"
          >
            <Check className="h-3 w-3 text-emerald-400" />
            Link copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
