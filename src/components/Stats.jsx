import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Users, Building2, Send, BarChart2 } from 'lucide-react';

const stats = [
  {
    id: 'creators',
    target: 10,
    format: (value) => `${value}K+`,
    label: 'Verified Creators',
    subtext: 'Across IG & YouTube',
    icon: Users,
    iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-950/80 dark:text-violet-300',
  },
  {
    id: 'brands',
    target: 500,
    format: (value) => `${value}+`,
    label: 'Brand Partners',
    subtext: 'Startups to Fortune 500',
    icon: Building2,
    iconBg: 'bg-pink-100 text-pink-600 dark:bg-pink-950/80 dark:text-pink-300',
  },
  {
    id: 'campaigns',
    target: 2000,
    format: (value) => `${value.toLocaleString('en-IN')}+`,
    label: 'Campaigns Executed',
    subtext: 'Multi-channel campaigns',
    icon: Send,
    iconBg: 'bg-sky-100 text-sky-600 dark:bg-sky-950/80 dark:text-sky-300',
  },
  {
    id: 'reach',
    target: 50,
    format: (value) => `${value}M+`,
    label: 'Total Audience Reach',
    subtext: 'Across all platforms',
    icon: BarChart2,
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950/80 dark:text-amber-300',
  },
];

function useCountUp(target, active) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return undefined;
    }
    if (!active) return undefined;

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, target]);

  return value;
}

function StatItem({ stat, active }) {
  const value = useCountUp(stat.target, active);
  const Icon = stat.icon;

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stat.iconBg} shadow-2xs`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xl sm:text-2xl font-black leading-none tracking-tight text-stone-950 dark:text-white font-sans">
          {stat.format(value)}
        </div>
        <div className="mt-1 truncate text-xs font-bold text-stone-800 dark:text-slate-200">
          {stat.label}
        </div>
        <div className="truncate text-[10px] font-medium text-stone-500 dark:text-slate-400">
          {stat.subtext}
        </div>
      </div>
    </div>
  );
}

export default function Stats({ className = '' }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-4 lg:gap-6">
        {stats.map((stat) => (
          <StatItem key={stat.id} stat={stat} active={active} />
        ))}
      </div>
    </div>
  );
}
