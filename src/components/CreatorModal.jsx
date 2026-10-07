import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';


export default function CreatorModal({ isOpen, onClose, selectedCreator }) {
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [niche, setNiche] = useState('Fashion');
  const [followerCount, setFollowerCount] = useState('50K - 200K');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Application Received!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Our talent team is verifying your audience metrics and engagement authenticity. You will receive an invitation to the Star Media creator portal on WhatsApp within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-[10px] font-mono uppercase text-pink-400 font-bold tracking-widest">
                Creator Roster Onboarding
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Join Star Media Roster
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Get matched with top tier brands (Myntra, Zomato, CRED, Nykaa). Guaranteed on-time payments and premium creative briefs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rhea Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 rounded-xl text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Primary Handle *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@yourhandle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/40 rounded-xl text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/40 rounded-xl text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Primary Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/40 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-pink-500"
                  >
                    <option value="Fashion">Fashion & Luxury</option>
                    <option value="Beauty">Beauty & Skincare</option>
                    <option value="Tech">Technology & Gadgets</option>
                    <option value="Gaming">Gaming & Esports</option>
                    <option value="Fitness">Fitness & Wellness</option>
                    <option value="Travel">Travel & Hospitality</option>
                    <option value="Food">Food & Lifestyle</option>
                    <option value="Finance">Finance & Investing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Follower Base
                  </label>
                  <select
                    value={followerCount}
                    onChange={(e) => setFollowerCount(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/40 rounded-xl text-sm text-white border border-white/10 focus:outline-none focus:border-pink-500"
                  >
                    <option value="10K - 50K">10K - 50K (Micro)</option>
                    <option value="50K - 200K">50K - 200K (Mid-Tier)</option>
                    <option value="200K - 1M">200K - 1M (Macro)</option>
                    <option value="1M+">1M+ (Mega / Celebrity)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Creator Application</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero agency commission deducted from creator rates</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
