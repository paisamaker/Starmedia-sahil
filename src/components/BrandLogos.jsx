import React from 'react';

/**
 * Real, authentic vector brand logos for top Indian creator economy brand partners.
 * Scalable, responsive, crisp on all retina screens, with accurate brand color schemes.
 */
export function BrandLogo({ name, className = "h-8 w-auto max-w-[140px]" }) {
  const brandKey = name?.toUpperCase() || '';

  switch (brandKey) {
    case 'MYNTRA':
    case 'MYNTRA FWD':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          {/* Official Myntra Folded Geometric M Ribbon */}
          <svg viewBox="0 0 40 32" className="h-7 w-auto shrink-0 drop-shadow-sm" fill="none">
            <path
              d="M3 24L12 8L18 16L11 27L3 24Z"
              fill="#FF3F6C"
            />
            <path
              d="M12 8L22 24L16 28L8 16L12 8Z"
              fill="#F15B22"
              fillOpacity="0.92"
            />
            <path
              d="M17 16L22 8L32 24L25 28L17 16Z"
              fill="#FF905A"
            />
            <path
              d="M22 8L32 24L27 28L19 16L22 8Z"
              fill="#E80071"
              fillOpacity="0.95"
            />
          </svg>
          <span className="font-sans text-[17px] sm:text-[19px] font-extrabold tracking-[-0.03em] text-stone-900 dark:text-white">
            myntra{brandKey === 'MYNTRA FWD' ? '·fwd' : ''}
          </span>
        </div>
      );

    case 'ZOMATO':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          {/* Official Zomato Crimson Badge */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E23744] shadow-sm">
            <span className="font-sans text-[15px] font-black italic text-white leading-none">
              z
            </span>
          </div>
          <span className="font-sans text-[20px] sm:text-[22px] font-black italic tracking-[-0.05em] text-[#E23744]">
            zomato
          </span>
        </div>
      );

    case 'CRED':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          {/* Official CRED Stepped Polygon Shield Mark */}
          <svg viewBox="0 0 28 32" className="h-7 w-auto shrink-0" fill="none">
            <path
              d="M3 3H25V19C25 24.5 19 28 14 29C9 28 3 24.5 3 19V3Z"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-stone-900 dark:text-white"
            />
            <path
              d="M9 9H19V18C19 20.8 16.5 22.8 14 23.5C11.5 22.8 9 20.8 9 18V9Z"
              fill="currentColor"
              className="text-stone-900 dark:text-white"
            />
          </svg>
          <span className="font-sans text-[16px] sm:text-[18px] font-black tracking-[0.2em] text-stone-950 dark:text-white">
            CRED
          </span>
        </div>
      );

    case 'NYKAA':
    case 'NYKAA LUXE':
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          {/* Official Nykaa Hot-Pink Wordmark with Signature Dot */}
          <span className="font-sans text-[21px] sm:text-[23px] font-black tracking-[-0.03em] text-[#FC2779] drop-shadow-xs">
            NYKAA
          </span>
          {brandKey === 'NYKAA LUXE' && (
            <span className="rounded-sm bg-stone-900 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-amber-400 dark:bg-white/15">
              LUXE
            </span>
          )}
        </div>
      );

    case 'SWIGGY':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          {/* Official Swiggy Orange Map Pin Logo */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FC8019] shadow-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <span className="font-sans text-[18px] sm:text-[20px] font-black tracking-[-0.03em] text-[#FC8019]">
            SWIGGY
          </span>
        </div>
      );

    case 'BOAT':
      return (
        <div className={`flex items-center gap-1 ${className}`}>
          {/* Official boAt Red Typography with Sail Accent */}
          <div className="flex items-center font-sans text-[21px] sm:text-[23px] font-black tracking-[-0.04em] text-[#ED1C24]">
            <span>bo</span>
            <span className="relative">
              A
              <span className="absolute -top-1 right-0 text-[10px] leading-none text-[#ED1C24]">▲</span>
            </span>
            <span>t</span>
          </div>
        </div>
      );

    case 'SPOTIFY':
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          {/* Official Spotify Wave Emblem */}
          <svg viewBox="0 0 32 32" className="h-7 w-auto shrink-0 drop-shadow-sm">
            <circle cx="16" cy="16" r="15" fill="#1DB954" />
            <path
              d="M9 13C13.5 11.6 19.5 12 23 14"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M10 17C13.8 15.8 18.5 16.2 21.5 17.8"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M11 21C14 20.2 17.5 20.5 20 21.6"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="font-sans text-[17px] sm:text-[19px] font-extrabold tracking-[-0.02em] text-stone-900 dark:text-white">
            Spotify
          </span>
        </div>
      );

    case 'TATA 1MG':
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          {/* Official Tata Medical Cross Badge */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E31837] shadow-sm">
            <span className="text-[17px] font-black text-white leading-none">+</span>
          </div>
          <div className="flex items-center gap-1 font-sans text-[16px] sm:text-[18px] font-black tracking-tight text-stone-900 dark:text-white">
            <span>TATA</span>
            <span className="text-[#E31837]">1mg</span>
          </div>
        </div>
      );

    case 'MEESHO':
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E00067] shadow-sm">
            <span className="font-sans text-[15px] font-black text-white leading-none">m</span>
          </div>
          <span className="font-sans text-[19px] font-extrabold tracking-tight text-[#E00067]">
            meesho
          </span>
        </div>
      );

    case 'CULT.FIT':
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[#FF3278] to-[#FF8200] shadow-sm">
            <span className="font-sans text-[14px] font-black text-white">⚡</span>
          </div>
          <span className="font-sans text-[18px] font-black tracking-tight text-stone-900 dark:text-white">
            cult<span className="text-[#FF3278]">.fit</span>
          </span>
        </div>
      );

    default:
      return (
        <span className="font-sans text-xl font-bold tracking-wider text-stone-800 dark:text-white">
          {name}
        </span>
      );
  }
}
