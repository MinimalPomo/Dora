import React, { useState, useEffect } from 'react';
import { 
  Play, Lock, Clock, ShieldCheck, ChevronRight, 
  Maximize, Settings, X, User, ExternalLink, Timer, 
  CheckCircle, AlertCircle, Share2, Volume2
} from 'lucide-react';

/**
 * CONFIGURATION
 * Replace AD_URL with your Adsterra Direct Link.
 * Update the videos array with your Dropbox "Direct" links.
 */
const AD_URL = 'https://pl28528172.effectivegatecpm.com/db/af/fc/dbaffca38569d565af824e82611895bf.js';
const ACCESS_EXPIRY_MS = 24 * 60 * 60 * 1000; 

const INITIAL_VIDEOS = [
  { 
    id: '1', 
    title: 'Minimalist Architecture', 
    author: 'Studio Alpha', 
    // IMPORTANT: Dropbox links must end in raw=1 to work in a player
    videoUrl: 'https://www.dropbox.com/scl/fi/42x31v4nr3pkk89haao71/RAI-Doraemon-Movie-40-Nobita-s-New-Dinosaur-2020-Hindi_720P-HD.mp4?rlkey=vdy1k5ihvctwaud69rtp9774t&st=08hnf441&raw=1', 
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000' 
  },
  { 
    id: '2', 
    title: 'The Silent Coast', 
    author: 'Eco Vision', 
    videoUrl: 'https://www.dropbox.com/s/example_id_2/video.mp4?raw=1', 
    thumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1000' 
  }
];

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAdWatching, setIsAdWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isTabFocused, setIsTabFocused] = useState(true);

  useEffect(() => {
    const expiry = localStorage.getItem('site_access_expiry');
    if (expiry && Date.now() < parseInt(expiry)) {
      setIsUnlocked(true);
    }

    const handleVisibility = () => setIsTabFocused(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
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
    const expiry = Date.now() + ACCESS_EXPIRY_MS;
    localStorage.setItem('site_access_expiry', expiry.toString());
    setIsUnlocked(true);
  };

  const logout = () => {
    localStorage.removeItem('site_access_expiry');
    window.location.reload();
  };

  // --- VIEWS ---

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 selection:bg-black selection:text-white font-sans">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="bg-white rounded-[40px] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-bold tracking-tighter text-xl">HOST.</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">Premium Access</h1>
            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
              Watch the sponsored ad for 30 seconds to unlock the full library for 24 hours.
            </p>

            {!isAdWatching ? (
              <button
                onClick={handleStartUnlock}
                className="w-full py-4 bg-black text-white font-semibold rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                Access Archives <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-600">Verification in progress...</span>
                  <span className="text-2xl font-bold tabular-nums text-zinc-900">{timeLeft}s</span>
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
                    Timer paused. Return to this tab.
                  </div>
                )}

                {timeLeft === 0 && (
                  <button
                    onClick={handleFinalUnlock}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all animate-in zoom-in-95"
                  >
                    Confirm Unlock
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
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <nav className="h-20 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50 border-b border-gray-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 font-black tracking-tighter text-xl italic">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-current" />
            </div>
            VAULT.
          </div>
        </div>
        <button onClick={logout} className="p-3 text-zinc-400 hover:text-black">
          <User className="w-5 h-5" />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-zinc-900">Private <br/>Collection.</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {INITIAL_VIDEOS.map((vid) => (
            <div 
              key={vid.id} 
              className="group cursor-pointer space-y-5"
              onClick={() => setActiveVideo(vid)}
            >
              <div className="relative aspect-video rounded-[32px] overflow-hidden bg-gray-100 transition-all duration-700 group-hover:-translate-y-2">
                <img src={vid.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 text-black fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-zinc-900">{vid.title}</h3>
                <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest text-[10px]">{vid.author}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div className="w-full max-w-5xl relative">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute -top-14 right-0 p-2 text-zinc-500 hover:text-black transition-colors"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Native HTML5 Video Player for Dropbox Direct Links */}
            <div className="aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl">
              <video 
                key={activeVideo.videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full"
                controlsList="nodownload"
              >
                <source src={activeVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-8 flex justify-between items-center px-4">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{activeVideo.title}</h2>
              <div className="flex gap-4 text-zinc-400">
                <Volume2 className="w-5 h-5" />
                <Maximize className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

              
