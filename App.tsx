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

  // Preload both images for instant state switching
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
      setTimeout(() => setShowError(false), 500);
    }
  };

  const moveNoButton = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 50;
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

  const roundedFontStack = { fontFamily: 'ui-rounded, "SF Pro Rounded", "Arial Rounded MT Bold", sans-serif' };

  if (!isAuthenticated) {
    return (
      <div className="relative w-full h-screen flex flex-col items-center justify-start pt-[10vh] bg-[#fff0f3] overflow-y-auto overflow-x-hidden px-6 select-none">
        <FloatingHearts density={10} isPartyMode={false} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, x: showError ? [0, -10, 10, -10, 10, 0] : 0 }}
          className="z-10 bg-white/70 backdrop-blur-xl p-8 md:p-16 rounded-[40px] shadow-2xl border-2 border-white flex flex-col items-center gap-8 max-w-lg w-full text-center"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-100 rounded-full flex items-center justify-center border-4 border-orange-200 shadow-inner">
            <span className="text-6xl md:text-7xl">🐈</span> 
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-[#d64561]">Côn Méo Côn?</h1>
            <p className="text-pink-500 font-medium italic">Enter the secret code to continue...</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl text-center text-xl font-semibold shadow-inner border-2 border-pink-100 bg-white/50 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all text-pink-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#ff85a2] text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:bg-[#ff7091] transition-colors"
            >
              Enter Heart ❤️
            </motion.button>
          </form>
        </motion.div>

        <AnimatePresence>
          {showError && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}
                className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center border-b-8 border-orange-400"
              >
                <div className="text-8xl mb-4">😾</div>
                <h2 className="text-2xl font-black text-orange-600 mb-2 uppercase">Wrong Code!</h2>
                <p className="text-gray-600 mb-6 italic">Try again, ba lợn bếo is waiting!</p>
                <button 
                  onClick={() => setShowError(false)}
                  className="bg-orange-500 text-white px-10 py-3 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-colors"
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

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-start pt-[5vh] md:pt-[10vh] bg-[#fff0f3] overflow-y-auto overflow-x-hidden px-4 select-none pb-20">
      
      {!isAccepted && <FloatingHearts density={25} isPartyMode={false} />}

      <div className="z-10 text-center flex flex-col items-center w-full max-w-4xl">
        
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 flex items-center justify-center w-full mb-6">
          <Cat action={catAction} />
        </div>

        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="space-y-4">
                <h1 
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#d64561] leading-tight px-4"
                  style={roundedFontStack}
                >
                  Happy Valentine’s Day, <br className="hidden sm:block"/>côn méo côn! 💖
                </h1>
                <p 
                  className="text-lg sm:text-xl md:text-3xl text-pink-600 font-extrabold italic bg-white/40 px-8 py-3 rounded-2xl backdrop-blur-sm border-2 border-white/50 shadow-sm mx-4 inline-block"
                  style={roundedFontStack}
                >
                  Will côn méo côn be ba lợn bếo's Valentine?
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 relative w-full h-32 md:h-48 mt-4">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYesClick}
                  className="bg-[#ff85a2] text-white px-12 md:px-16 py-4 md:py-6 rounded-full text-2xl md:text-4xl font-black shadow-xl hover:shadow-pink-300 transition-all z-30"
                >
                  Yes! 💕
                </motion.button>

                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="bg-white/80 text-gray-400 px-8 py-3 rounded-full text-lg md:text-xl font-semibold shadow-md border-2 border-dashed border-pink-200 cursor-default"
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
              className="flex flex-col items-center gap-8 py-8"
            >
              <h1 className="text-6xl md:text-9xl font-black text-[#d64561] drop-shadow-lg">
                Yay! 😽
              </h1>
              
              <p 
                className="text-4xl md:text-7xl text-pink-600 font-black animate-pulse"
                style={roundedFontStack}
              >
                BA IU CÔN 💗
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-orange-600 font-black text-xl md:text-2xl bg-white/70 px-10 py-4 rounded-full backdrop-blur-md shadow-inner border border-white"
                style={roundedFontStack}
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