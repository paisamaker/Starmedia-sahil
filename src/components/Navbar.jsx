import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, User, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'discover', label: 'Discover' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'creators', label: 'Creators' },
  { id: 'brands', label: 'Brands' },
  { id: 'work', label: 'Work' },
  { id: 'insights', label: 'Insights' },
];

export default function Navbar({ activeRoute, setActiveRoute, onOpenCampaignModal, onOpenLoginModal }) {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nodes = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);
    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        const [bestId, bestRatio] = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0] || [];
        if (bestId && bestRatio > 0) setActiveRoute(bestId);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.2, 0.45] }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [setActiveRoute]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (id) => {
    setActiveRoute(id);
    setIsMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'border-b border-stone-200/80 bg-[#F6F4F0]/85 py-3 shadow-[0_8px_30px_-24px_rgba(28,25,23,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#070A12]/80'
            : 'border-b border-transparent bg-transparent py-5'
        }`}
      >
        <div className="flex w-full items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 xl:px-16">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 sm:gap-3.5 text-left group"
          >
            <img
              src="/star-media-logo-transparent.png"
              alt="STAR MEDIA"
              width={44}
              height={44}
              decoding="async"
              fetchPriority="high"
              className="h-11 w-11 sm:h-13 sm:w-13 object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-sans text-xl sm:text-2xl font-black tracking-wide text-stone-950 dark:text-white">
                STAR MEDIA
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.24em] text-red-600 mt-1">
                INFLUENCER
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3.5 py-2 text-sm sm:text-[15px] transition-colors ${
                    isActive
                      ? 'font-bold text-stone-950 dark:text-white'
                      : 'font-semibold text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId={reduced ? undefined : 'nav-active'}
                      className="absolute inset-x-3 -bottom-0.5 h-[2.5px] rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-rose-500"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="rounded-full border border-stone-200/90 p-2 text-stone-700 hover:bg-stone-100 hover:text-stone-950 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onOpenLoginModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold text-stone-700 hover:text-stone-950 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              <User className="h-4 w-4" />
              Login
            </button>
            <button
              type="button"
              onClick={onOpenCampaignModal}
              className="inline-flex items-center gap-1.5 rounded-full bg-stone-950 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100"
            >
              Start a Campaign
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="rounded-full border border-stone-200 p-2 text-stone-700 dark:border-white/10 dark:text-white"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="rounded-xl border border-stone-200 p-2 text-stone-800 dark:border-white/10 dark:text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-[#F6F4F0] px-6 pt-24 pb-8 lg:hidden dark:bg-[#070A12]"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.id);
                  }}
                  className={`border-b border-stone-200 py-3.5 text-left text-lg font-medium dark:border-white/10 ${
                    activeRoute === link.id ? 'text-stone-950 dark:text-white' : 'text-stone-500 dark:text-slate-400'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto space-y-3 pt-8">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCampaignModal();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-5 py-3.5 text-sm font-semibold text-white"
              >
                Start a Campaign
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 dark:border-white/15 dark:text-white"
              >
                <User className="h-4 w-4" />
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
