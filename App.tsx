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
      // ADDED: pt-20 to pt-32 for more top margin
      <div className="relative w-full h-screen flex flex-col items-center justify-start pt-20 md:pt-32 bg-[#fff0f3] overflow-hidden px-6 select-none">
        <FloatingHearts density={10} isPartyMode={false} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            x: showError ? [0, -10, 10, -10, 10, 0] : 0 
          }}
          // ADDED: p-10 md:p-16 for much more internal padding
          className="z-10 bg-white/70 backdrop-blur-xl p-10 md:p-16 rounded-[40px] shadow-2xl border-2 border-white flex flex-col items-center gap-8 max-w-lg w-full text-center"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 bg-orange-100 rounded-full flex items-center justify-center border-4 border-orange-200 shadow-inner">
            <span className="text-6xl md:text-8xl">🐈</span> 
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-[#d64561]">Côn Méo Côn?</h1>
            <p className="text-lg md:text-xl text-pink-500 font-medium italic">Enter the secret code to continue...</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 md:py-5 rounded-2xl text-center text-xl font-semibold shadow-inner border-2 border-pink-100 bg-white/50 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all text-pink-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#ff85a2] text-white py-4 md:py-5 rounded-2xl text-xl font-bold shadow-lg hover:bg-[#ff7091] transition-colors"
            >
              Enter Heart ❤️
            </motion.button>
          </form>
        </motion.div>

        {/* ERROR MODAL remains centered */}
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
                <h2 className="text-2xl font-black text-orange-600 mb-2">WRONG CODE!</h2>
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

  // --- MAIN VALENTINE SCREEN ---
  return (
    // ADDED: justify-start and pt-16 md:pt-24 for top margin
    <div className="relative w-full h-screen flex flex-col items-center justify-start pt-16 md:pt-24 bg-[#fff0f3] overflow-hidden px-6 select-none">
      {!isAccepted && <FloatingHearts density={25} isPartyMode={false} />}

      <div className="z-10 text-center flex flex-col items-center gap-8 md:gap-12 max-w-5xl w-full">
        {/* Cat Container with more bottom padding */}
        <div className="relative min-h-[250px] md:min-h-[400px] flex items-center justify-center w-full pb-6">
          <Cat action={catAction} />
        </div>

        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              // ADDED: gap-10 for more breathing room between text and buttons
              className="flex flex-col items-center gap-10"
            >
              <div className="space-y-6">
                <h1 className="text-4xl md:text-7xl font-black text-[#d64561] drop-shadow-sm leading-tight">
                  Happy Valentine’s Day, <br/>côn méo côn! 💖
                </h1>
                <p className="text-xl md:text-4xl text-pink-600 font-extrabold italic bg-white/40 px-10 py-4 rounded-3xl backdrop-blur-sm border-2 border-white/50 shadow-sm">
                  Will côn méo côn be ba lợn bếo's Valentine?
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 relative w-full h-48">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYesClick}
                  // ADDED: Larger px-16 and py-6 for bigger button presence
                  className="bg-[#ff85a2] text-white px-16 py-6 rounded-full text-3xl font-black shadow-xl hover:shadow-pink-300 transition-all z-30"
                >
                  Yes! 💕
                </motion.button>

                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="bg-white/80 text-gray-400 px-10 py-4 rounded-full text-xl font-semibold shadow-md border-2 border-dashed border-pink-200 cursor-default"
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
              // ADDED: py-12 for more vertical height in the success state
              className="flex flex-col items-center gap-8 py-12"
            >
              <h1 className="text-7xl md:text-9xl font-black text-[#d64561] drop-shadow-lg">
                Yay! 😽
              </h1>
              <p 
                className="text-4xl md:text-6xl text-pink-600 font-black animate-pulse"
                style={{ fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", sans-serif' }}
              >
                BA IU CÔN 💗
              </p>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="mt-6 text-orange-600 font-black text-2xl bg-white/70 px-12 py-4 rounded-full backdrop-blur-md shadow-inner border border-white"
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