import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Lock, Clock, ShieldCheck, ChevronRight, 
  Maximize, X, User, Timer, AlertCircle, Info,
  Volume2, Share2, Download, Bookmark, MessageSquare,
  Sparkles, Zap, Smartphone, Globe
} from 'lucide-react';

/**
 * CONFIGURATION
 */
const AD_URL = 'https://www.highperformanceformat.com/your-adsterra-link';
const ACCESS_EXPIRY_MS = 24 * 60 * 60 * 1000; 

const INITIAL_VIDEOS = [
  { 
    id: '1', 
    title: "Nobita's New Dinosaur", 
    author: 'Doraemon Movie 40', 
    year: '2020',
    quality: '720P HD',
    videoUrl: 'https://github.com/MinimalPomo/Dora/releases/download/Test/Screenrecording_20251222_224934.mp4', 
    thumbnail: 'https://images.unsplash.com/photo-1612441338146-05682122393f?q=80&w=1000',
    description: "Nobita encounters two twin dinosaurs and embarks on a journey to the Cretaceous period to help them find their kind."
  },
  { 
    id: '2', 
    title: "Stand By Me 2", 
    author: 'Doraemon Special', 
    year: '2020',
    quality: '1080P',
    videoUrl: 'https://github.com/your-username/your-repo/releases/download/v1/movie2.mp4', 
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000',
    description: "Nobita travels to the future to see his wedding with Shizuka, but things don't go exactly as planned."
  }
];

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAdWatching, setIsAdWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isTabFocused, setIsTabFocused] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial boot
    const timer = setTimeout(() => setLoading(false), 800);
    
    const expiry = localStorage.getItem('site_access_expiry');
    if (expiry && Date.now() < parseInt(expiry)) {
      setIsUnlocked(true);
    }

    const handleVisibility = () => setIsTabFocused(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isAdWatching && timeLeft > 0 && isTabFocused) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isAdWatching, timeLeft, isTabFocused]);

  const handleStartUnlock = () => {
    setIsAdWatching(true);
    window.open(AD_URL, '_blank');
  };

  const handleFinalUnlock = () => {
    localStorage.setItem('site_access_expiry', (Date.now() + ACCESS_EXPIRY_MS).toString());
    setIsUnlocked(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-100 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60" />

        <div className="w-full max-w-lg relative">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[48px] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-white relative">
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <span className="block font-black tracking-tighter text-2xl leading-none">VAULT.</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Exclusive Cinema</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4 leading-tight">Private <br/>Streaming Access</h1>
            <p className="text-zinc-500 text-sm mb-12 leading-relaxed">
              Unlock our premium collection of unlisted titles. To keep the vault free for the community, we require a brief 30-second verification.
            </p>

            {!isAdWatching ? (
              <div className="space-y-4">
                <button 
                  onClick={handleStartUnlock} 
                  className="w-full py-5 bg-black text-white font-bold rounded-3xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 group active:scale-[0.98] shadow-2xl shadow-black/10"
                >
                  Start Verification <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-6 pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest"><ShieldCheck className="w-3 h-3 text-green-500" /> Secure</div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest"><Zap className="w-3 h-3 text-amber-500" /> Fast</div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest"><Globe className="w-3 h-3 text-blue-500" /> Global</div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Live Status</span>
                    <span className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                        {timeLeft > 0 ? "Analyzing Connection..." : "System Verified"}
                    </span>
                  </div>
                  <div className="text-4xl font-black tabular-nums text-zinc-900 tracking-tighter">{timeLeft}s</div>
                </div>

                <div className="relative h-3 w-full bg-zinc-100 rounded-full overflow-hidden p-1">
                  <div 
                    className="h-full bg-black rounded-full transition-all duration-1000 ease-linear" 
                    style={{ width: `${((30 - timeLeft) / 30) * 100}%` }} 
                  />
                </div>

                {!isTabFocused && timeLeft > 0 && (
                  <div className="p-4 bg-red-50 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3 border border-red-100 animate-pulse">
                    <AlertCircle className="w-4 h-4" /> Timer paused. Keep this tab visible.
                  </div>
                )}

                {timeLeft === 0 && (
                  <button 
                    onClick={handleFinalUnlock} 
                    className="w-full py-5 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/30 animate-in zoom-in-95"
                  >
                    GRANT ACCESS
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      {/* Dynamic Header */}
      <nav className="h-24 px-10 flex items-center justify-between sticky top-0 bg-white/60 backdrop-blur-2xl z-50 border-b border-gray-50/50">
        <div className="flex items-center gap-14">
          <div className="flex items-center gap-3 font-black tracking-tighter text-2xl italic">
            <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg"><Play className="w-5 h-5 text-white fill-current" /></div>
            VAULT.
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <a href="#" className="text-black border-b-2 border-black pb-1">Archive</a>
            <a href="#" className="hover:text-black transition-colors">Categories</a>
            <a href="#" className="hover:text-black transition-colors">Requests</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="hidden md:block text-right">
                <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Session Type</span>
                <span className="text-xs font-bold text-green-500 uppercase tracking-tighter">Premium Active</span>
            </div>
            <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400 hover:bg-black hover:text-white transition-all cursor-pointer">
                <User className="w-5 h-5" />
            </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-10 py-20">
        <header className="mb-20 space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-2xl">
             <Sparkles className="w-4 h-4 text-amber-500" />
             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">New Titles Added Daily</span>
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.9] text-zinc-900">Unlock the <br/>Unlisted.</h1>
        </header>

        {/* Improved Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
          {INITIAL_VIDEOS.map((vid) => (
            <div 
              key={vid.id} 
              className="group cursor-pointer" 
              onClick={() => setActiveVideo(vid)}
            >
              <div className="relative aspect-[16/10] rounded-[48px] overflow-hidden bg-zinc-100 transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_50px_80px_-20px_rgba(0,0,0,0.15)]">
                <img src={vid.thumbnail} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <div className="absolute top-6 left-6 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase">{vid.quality}</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[9px] font-bold text-white uppercase">{vid.year}</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                    <Play className="w-8 h-8 text-black fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-start px-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-2xl tracking-tight group-hover:text-blue-600 transition-colors">{vid.title}</h3>
                    <p className="text-sm font-medium text-zinc-400 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                        {vid.author} • {vid.year}
                    </p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="p-3 bg-zinc-50 rounded-2xl hover:bg-zinc-100"><Bookmark className="w-4 h-4" /></button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modern Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500">
          <div className="w-full max-w-7xl relative animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center"><Play className="w-4 h-4 text-white fill-current" /></div>
                    <div className="space-y-0.5">
                        <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900 leading-none">{activeVideo.title}</h4>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Now Playing in {activeVideo.quality}</span>
                    </div>
                </div>
                <button 
                  onClick={() => setActiveVideo(null)} 
                  className="w-12 h-12 bg-zinc-100 hover:bg-zinc-200 rounded-2xl flex items-center justify-center transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <div className="lg:col-span-3">
                    <div className="aspect-video bg-black rounded-[48px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] border border-gray-100">
                        <video key={activeVideo.id} controls autoPlay playsInline className="w-full h-full object-contain">
                            <source src={activeVideo.videoUrl} type="video/mp4" />
                            Stream failed.
                        </video>
                    </div>
                </div>
                
                <div className="hidden lg:flex flex-col justify-between py-6">
                    <div className="space-y-8">
                        <div>
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Director / Studio</span>
                            <p className="font-bold text-lg">{activeVideo.author}</p>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] block mb-2">Synopsis</span>
                            <p className="text-sm text-zinc-500 leading-relaxed font-medium">{activeVideo.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-4">
                            <button className="flex items-center gap-2 px-4 py-3 bg-zinc-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest"><MessageSquare className="w-4 h-4" /> Discussion</button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-zinc-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest"><Share2 className="w-4 h-4" /> Share</button>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-zinc-50 rounded-[32px] border border-zinc-100 space-y-4">
                        <div className="flex items-center gap-4 text-xs font-bold">
                            <Smartphone className="w-5 h-5 text-zinc-400" />
                            <span>Mobile Streaming Ready</span>
                        </div>
                        <button className="w-full py-4 bg-black text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all">
                           <Download className="w-4 h-4" /> Download Movie
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

    
