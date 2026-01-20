import React, { useState, useEffect, useCallback } from 'react';
import { 
  Play, Lock, Clock, ShieldCheck, ChevronRight, 
  Maximize, Settings, X, User, ExternalLink, Timer, 
  CheckCircle, AlertCircle, Eye, Share2
} from 'lucide-react';

/**
 * CONFIGURATION
 * Replace AD_URL with your Adsterra Direct Link.
 * Update the videos array with your YouTube IDs.
 */
const AD_URL = 'https://www.highperformanceformat.com/your-adsterra-link';
const ACCESS_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Hours

const INITIAL_VIDEOS = [
  { id: '1', title: 'Minimalist Architecture', author: 'Studio Alpha', ytId: 'mMoquUvhr5E', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000' },
  { id: '2', title: 'The Silent Coast', author: 'Eco Vision', ytId: 'VIDEO_ID_2', thumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1000' },
  { id: '3', title: 'Urban Flow 4K', author: 'City Ghost', ytId: 'VIDEO_ID_3', thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000' },
  { id: '4', title: 'Neon Pulse', author: 'Cyber Vision', ytId: 'VIDEO_ID_4', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000' },
];

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAdWatching, setIsAdWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isTabFocused, setIsTabFocused] = useState(true);

  // Persistence Logic
  useEffect(() => {
    const expiry = localStorage.getItem('site_access_expiry');
    if (expiry && Date.now() < parseInt(expiry)) {
      setIsUnlocked(true);
    }

    const handleVisibility = () => setIsTabFocused(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Ad Timer Logic with Tab Focus Check
  useEffect(() => {
    let timer;
    if (isAdWatching && timeLeft > 0 && isTabFocused) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAdWatching, timeLeft, isTabFocused]);

  const handleStartUnlock = () => {
    setIsAdWatching(true);
    // Open Adsterra Popunder
    window.open(AD_URL, '_blank');
  };

  const handleFinalUnlock = () => {
    const expiry = Date.now() + ACCESS_EXPIRY_MS;
    localStorage.setItem('site_access_expiry', expiry.toString());
    setIsUnlocked(true);
  };

  const logout = () => {
    localStorage.removeItem('site_access_expiry');
    window.location.reload();
  };

  // --- RENDERING VIEWS ---

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 selection:bg-black selection:text-white">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="bg-white rounded-[40px] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
            {/* Branding */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-bold tracking-tighter text-xl">HOST.</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">Premium Access</h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
              Watch a 30-second sponsored ad to unlock the full library. Once unlocked, your session will be active for 24 hours.
            </p>

            {!isAdWatching ? (
              <button
                onClick={handleStartUnlock}
                className="w-full py-4 bg-black text-white font-semibold rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-black/10 active:scale-95"
              >
                Access Archives <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Verifying session</span>
                    <span className="text-xs font-medium text-zinc-600">Please do not close the ad tab</span>
                  </div>
                  <div className="text-2xl font-bold tabular-nums text-zinc-900">{timeLeft}s</div>
                </div>

                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                    style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
                  />
                </div>

                {!isTabFocused && timeLeft > 0 && (
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700 text-xs animate-pulse">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Timer paused. Return to this tab to continue.
                  </div>
                )}

                {timeLeft === 0 && (
                  <button
                    onClick={handleFinalUnlock}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 animate-in zoom-in-95"
                  >
                    Confirm Unlock
                  </button>
                )}
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-around opacity-40">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">Verified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">24H Valid</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      {/* Sleek Navigation */}
      <nav className="h-20 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 font-black tracking-tighter text-xl italic cursor-pointer">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-current" />
            </div>
            VAULT.
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <a href="#" className="text-black underline underline-offset-8 decoration-2">Discover</a>
            <a href="#" className="hover:text-black transition-colors">Playlists</a>
            <a href="#" className="hover:text-black transition-colors">Premium</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={logout} className="p-3 text-zinc-400 hover:text-black transition-colors rounded-full hover:bg-gray-50">
              <User className="w-5 h-5" />
           </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Session Authenticated
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-zinc-900">Curated <br/>Visuals.</h1>
          </div>
          <p className="max-w-xs text-zinc-400 text-sm font-medium leading-relaxed">
            Welcome back. You have full access to our unlisted collection for the next 24 hours.
          </p>
        </header>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {INITIAL_VIDEOS.map((vid) => (
            <div 
              key={vid.id} 
              className="group cursor-pointer space-y-5"
              onClick={() => setActiveVideo(vid)}
            >
              <div className="relative aspect-video rounded-[32px] overflow-hidden bg-gray-100 transition-all duration-700 group-hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
                <img 
                  src={vid.thumbnail} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={vid.title}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Play className="w-6 h-6 text-black fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between px-2">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-zinc-900 group-hover:text-blue-600 transition-colors">{vid.title}</h3>
                  <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-[11px]">{vid.author}</p>
                </div>
                <div className="p-2 border border-gray-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                   <ExternalLink className="w-4 h-4 text-zinc-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Video Modal (YouTube Optimized) */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-500">
          <div className="w-full max-w-6xl relative animate-in zoom-in-95 duration-500">
            <div className="absolute -top-14 right-0 flex items-center gap-6">
              <span className="text-[10px] font-bold text-zinc-400 tracking-[0.3em] uppercase">Now Streaming</span>
              <button 
                onClick={() => setActiveVideo(null)}
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black rounded-[40px] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] border border-white/10">
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo.ytId}?autoplay=1&rel=0&modestbranding=1`} 
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                frameBorder="0"
              />
            </div>

            <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{activeVideo.title}</h2>
                <div className="flex gap-4 mt-2">
                   <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">HD 4K Unlocked</span>
                   <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Member Archive</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-2xl transition-all text-sm font-bold">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl transition-all text-sm font-bold">
                  <Maximize className="w-4 h-4" /> Fullscreen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

