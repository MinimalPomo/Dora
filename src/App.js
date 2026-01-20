import React, { useState, useEffect } from 'react';
import { 
  Play, Lock, Clock, ShieldCheck, ChevronRight, 
  Volume2, Maximize, Settings, X, Timer, 
  Unlock, Layout, Compass, User
} from 'lucide-react';

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAdWatching, setIsAdWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeVideo, setActiveVideo] = useState(null);

  const ACCESS_KEY = 'minimal_vault_session';
  const AD_URL = 'https://www.highperformanceformat.com/example-ad-link'; // ADSTERRA LINK HERE

  const videos = [
    { id: '1', title: 'Morning in Tokyo', duration: '04:20', driveId: '1_vU0yJm8yZ1vWz_example1', author: 'Sato' },
    { id: '2', title: 'The Coastal Run', duration: '02:15', driveId: '1_vU0yJm8yZ1vWz_example2', author: 'Elena' },
    { id: '3', title: 'Architecture Study', duration: '10:00', driveId: '1_vU0yJm8yZ1vWz_example3', author: 'Marcus' },
    { id: '4', title: 'Night Drive', duration: '05:45', driveId: '1_vU0yJm8yZ1vWz_example4', author: 'Kimi' },
  ];

  useEffect(() => {
    const expiry = localStorage.getItem(ACCESS_KEY);
    if (expiry && Date.now() < parseInt(expiry)) {
      setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isAdWatching && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isAdWatching, timeLeft]);

  const handleStartAd = () => {
    setIsAdWatching(true);
    window.open(AD_URL, '_blank');
  };

  const completeUnlock = () => {
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(ACCESS_KEY, expiry.toString());
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="bg-white rounded-[40px] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-8">
              <Play className="w-5 h-5 text-white fill-current" />
            </div>
            
            <h1 className="text-3xl font-semibold tracking-tight mb-3">Watch to Unlock</h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Our library is exclusive. Watch one ad to gain full access for the next 24 hours.
            </p>

            {!isAdWatching ? (
              <button
                onClick={handleStartAd}
                className="w-full py-4 bg-black text-white font-medium rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group"
              >
                Access Library <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-400">Verifying session...</span>
                  <span className="text-lg font-semibold tabular-nums">{timeLeft}s</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-1000 ease-linear"
                    style={{ width: `${((30 - timeLeft) / 30) * 100}%` }}
                  />
                </div>
                {timeLeft === 0 && (
                  <button
                    onClick={completeUnlock}
                    className="w-full py-4 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 transition-all animate-in zoom-in-95"
                  >
                    Enter Collection
                  </button>
                )}
              </div>
            )}
            
            <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Ad-Supported</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Clock className="w-4 h-4" />
                <span>24h Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans">
      {/* Sleek Navigation */}
      <nav className="px-8 h-20 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-current" />
            </div>
            VideoHost
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="text-black">All Videos</a>
            <a href="#" className="hover:text-black transition-colors">Categories</a>
            <a href="#" className="hover:text-black transition-colors">Trending</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => {localStorage.removeItem(ACCESS_KEY); window.location.reload();}} className="p-2 text-gray-400 hover:text-black transition-colors">
              <User className="w-5 h-5" />
           </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Curated Originals</h1>
            <p className="text-gray-500">Hand-picked visual experiences for your 24h session.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-xs font-semibold text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            LIVE SESSION ACTIVE
          </div>
        </div>

        {/* The Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((vid) => (
            <div 
              key={vid.id} 
              className="group cursor-pointer"
              onClick={() => setActiveVideo(vid)}
            >
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 mb-4 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/5 group-hover:-translate-y-1">
                <img 
                  src={`https://images.unsplash.com/photo-1492691523567-30730375ad57?auto=format&fit=crop&w=800&q=80&sig=${vid.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={vid.title}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Play className="w-6 h-6 text-black fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-full text-[10px] font-bold">
                    {vid.duration}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-zinc-900">{vid.title}</h3>
                  <p className="text-sm text-zinc-400">By {vid.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modern Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div className="w-full max-w-6xl relative">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 p-2 text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl border border-gray-100">
              <iframe 
                src={`https://drive.google.com/file/d/${activeVideo.driveId}/preview`} 
                className="w-full h-full"
                allow="autoplay"
                frameBorder="0"
              />
            </div>
            <div className="mt-8 flex justify-between items-center">
               <h2 className="text-2xl font-bold">{activeVideo.title}</h2>
               <div className="flex gap-4 text-gray-400">
                 <Volume2 className="w-5 h-5" />
                 <Maximize className="w-5 h-5" />
                 <Settings className="w-5 h-5" />
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

