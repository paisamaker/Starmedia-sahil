import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [role, setRole] = useState('brand'); // 'brand' or 'creator'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel-glow rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <UserCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Authenticated Successfully</h3>
            <p className="text-xs text-slate-400">Loading your live campaign telemetry...</p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-[1px] mx-auto mb-3">
                <div className="w-full h-full bg-[#070A12] rounded-[11px] flex items-center justify-center font-bold text-white text-base">
                  ★
                </div>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Star Media Portal
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Access your real-time campaign dashboards & creator analytics
              </p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/40 border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => setRole('brand')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  role === 'brand'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Brand Partner
              </button>
              <button
                type="button"
                onClick={() => setRole('creator')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  role === 'creator'
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Creator Roster
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder={role === 'brand' ? 'brand@company.com' : 'creator@domain.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 rounded-xl text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 rounded-xl text-sm text-white placeholder-slate-500 border border-white/10 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded bg-black/40 border-white/10 accent-indigo-500" />
                  <span>Remember session</span>
                </label>
                <button type="button" className="text-indigo-400 hover:underline">Forgot key?</button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
              >
                <span>Authenticate Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted 256-bit Enterprise Auth</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
