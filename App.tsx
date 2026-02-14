import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cat from './components/Cat';
import FloatingHearts from './components/FloatingHearts';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [catAction, setCatAction] = useState<'idle' | 'happy' | 'mischievous'>('idle');

  // --- PRELOAD IMAGES ---
  // This ensures the "Happy" cat image shows instantly upon clicking "Yes"
  useEffect(() => {
    const images = ["/cat-sprite-Photoroom.png", "/image-Photoroom.png"];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'balonbeolovealicumeo') {
      setIsAuthenticated(true);
    } else {
      setShowError(true);
      setPassword('');
      // Reset error state after shake animation
      setTimeout(() => setShowError(false), 500);
    }
  };

  const moveNoButton = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 100;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    setNoButtonPos({ x, y });
    setCatAction('mischievous');
    
    const timer = setTimeout(() => setCatAction('idle'), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleYesClick = () => {
    setIsAccepted(true);
    setCatAction('happy');
  };

  // --- PASSWORD SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#fff0f3] overflow-hidden px-3 sm:px-4 lg:px-6 select-none">
        <FloatingHearts density={10} isPartyMode={false} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            // Shake animation on wrong password
            x: showError ? [0, -10, 10, -10, 10, 0] : 0 
          }}
          transition={{ duration: 0.4 }}
          className="z-10 bg-white/70 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl md:rounded-[40px] shadow-2xl border-2 border-white flex flex-col items-center gap-4 sm:gap-5 md:gap-6 max-w-xs sm:max-w-sm md:max-w-md w-full text-center"
        >
          {/* UPDATED: LOCK ICON TO ORANGE CAT */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-orange-200 shadow-inner">
            <span className="text-5xl sm:text-6xl md:text-7xl">🐈</span> 
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#d64561]">Côn Méo Côn?</h1>
            <p className="text-sm sm:text-base md:text-lg text-pink-500 font-medium italic">Enter the secret code to continue...</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-3 sm:gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-2xl text-center text-base sm:text-lg md:text-xl font-semibold shadow-inner border-2 border-pink-100 bg-white/50 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all placeholder:text-pink-200 text-pink-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#ff85a2] text-white py-3 sm:py-4 rounded-lg sm:rounded-2xl text-base sm:text-lg md:text-xl font-bold shadow-lg hover:bg-[#ff7091] transition-colors"
            >
              Enter Heart ❤️
            </motion.button>
          </form>
        </motion.div>

        {/* ORANGE CAT ERROR MODAL */}
        <AnimatePresence>
          {showError && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 50 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-xs w-full shadow-2xl text-center border-b-8 border-orange-400"
              >
                <div className="text-6xl sm:text-7xl md:text-8xl mb-4">😾</div>
                <h2 className="text-xl sm:text-2xl font-black text-orange-600 mb-2">WRONG CODE!</h2>
                <p className="text-sm sm:text-base text-gray-600 font-medium mb-6 italic">
                  Ba lợn bếo will be sad... try again!
                </p>
                <button 
                  onClick={() => setShowError(false)}
                  className="bg-orange-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
                >
                  My bad! 😿
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- MAIN VALENTINE SCREEN ---
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#fff0f3] overflow-hidden px-3 sm:px-4 lg:px-6 select-none">
      {!isAccepted && <FloatingHearts density={25} isPartyMode={false} />}

      <div className="z-10 text-center flex flex-col items-center gap-2 sm:gap-3 md:gap-4 max-w-4xl w-full px-2 sm:px-4">
        <div className="relative min-h-[180px] sm:min-h-[240px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] flex items-center justify-center w-full">
          <Cat action={catAction} />
        </div>

        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6 mt-4"
            >
              <div className="space-y-4">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#d64561] drop-shadow-sm leading-tight px-2">
                  Happy Valentine’s Day, <br/>côn méo côn! 💖
                </h1>
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pink-600 font-extrabold italic bg-white/40 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-2xl md:rounded-full backdrop-blur-sm border-2 border-white/50 shadow-sm mx-2">
                  Will côn méo côn be ba lợn bếo's Valentine?
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 relative w-full h-48">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYesClick}
                  className="bg-[#ff85a2] text-white px-6 xs:px-8 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 rounded-full text-lg xs:text-2xl sm:text-2xl md:text-3xl font-black shadow-xl hover:shadow-pink-300 transition-all z-30 whitespace-nowrap"
                >
                  Yes! 💕
                </motion.button>

                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="bg-white/80 text-gray-400 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm xs:text-base sm:text-lg md:text-xl font-semibold shadow-md border-2 border-dashed border-pink-200 cursor-default transition-colors hover:bg-white"
                >
                  No 🙈
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="yay"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 mt-4"
            >
              <h1 className="text-6xl md:text-8xl font-black text-[#d64561] drop-shadow-lg">
                Yay! 😽
              </h1>
              <p 
  className="text-3xl md:text-5xl text-pink-600 font-black animate-pulse"
  style={{ fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", sans-serif' }}
>
  BA IU CÔN 💗
</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-orange-600 font-black text-xl bg-white/70 px-8 py-3 rounded-full backdrop-blur-md shadow-inner border border-white"
              >
                Happy Valentine’s Day, my love! 
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;