import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CatProps {
  action: 'idle' | 'happy' | 'mischievous';
}

const FRAMES = {
  AWAKE: { x: 0, y: 0 },
  SQUINT: { x: 100, y: 0 },
  SEMI_CLOSED: { x: 0, y: 33.33 },
  HAPPY_CLOSED: { x: 100, y: 33.33 },
  SLEEPY: { x: 0, y: 66.66 },
  DEEP_SLEEP: { x: 100, y: 66.66 },
  WIDE_AWAKE: { x: 0, y: 100 },
};

const Cat: React.FC<CatProps> = ({ action }) => {
  const [currentFrame, setCurrentFrame] = useState(FRAMES.AWAKE);
  const blinkTimeoutRef = useRef<number | null>(null);

  const isHappy = action === 'happy';
  const isMischievous = action === 'mischievous';

  useEffect(() => {
    const triggerBlink = async () => {
      if (isHappy || isMischievous) return;

      setCurrentFrame(FRAMES.SQUINT);
      await new Promise(r => setTimeout(r, 70));
      setCurrentFrame(FRAMES.SEMI_CLOSED);
      await new Promise(r => setTimeout(r, 100));
      setCurrentFrame(FRAMES.SQUINT);
      await new Promise(r => setTimeout(r, 70));
      setCurrentFrame(FRAMES.AWAKE);

      const nextBlink = Math.random() * 3000 + 2000;
      blinkTimeoutRef.current = window.setTimeout(triggerBlink, nextBlink);
    };

    if (isHappy) {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    } else if (isMischievous) {
      setCurrentFrame(FRAMES.SQUINT);
    } else {
      setCurrentFrame(FRAMES.AWAKE);
      blinkTimeoutRef.current = window.setTimeout(triggerBlink, 3000);
    }

    return () => {
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [isHappy, isMischievous]);

  return (
    <motion.div
      className="relative w-[240px] h-[180px] sm:w-[340px] sm:h-[240px] md:w-[420px] md:h-[280px] lg:w-[480px] lg:h-[320px] flex items-center justify-center cursor-pointer select-none z-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: isHappy ? [0, -12, 0] : [0, -6, 0],
        rotate: isHappy ? [-1, 1, -1] : [0, 0.5, -0.5, 0],
      }}
      transition={{
        y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
    >
      {/* Renders image-Photoroom.png when happy. 
          Important: We reset backgroundPosition and backgroundSize so the 
          sprite coordinates don't interfere with the single image.
      */}
      <div
        className="w-full h-full bg-no-repeat bg-center transition-[background-image] duration-300"
        style={{
          backgroundImage: isHappy ? 'url("/image-Photoroom.png")' : 'url("/cat-sprite-Photoroom.png")',
          backgroundSize: isHappy ? 'contain' : '200% 400%',
          backgroundPosition: isHappy ? 'center' : `${currentFrame.x}% ${currentFrame.y}%`,
          imageRendering: 'auto',
          display: 'block'
        }}
      />

      {/* Shadow Effect */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/5 blur-xl rounded-full -z-10"
        animate={{
          scaleX: isHappy ? [1, 0.9, 1] : [1, 1.1, 1],
          opacity: isHappy ? [0.1, 0.15, 0.1] : [0.1, 0.05, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      />

      {/* Floating Emotions */}
      <AnimatePresence>
        {isHappy && (
          <motion.div
            className="absolute top-0 flex gap-4 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -50 }}
            exit={{ opacity: 0, y: -70 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>💖</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>✨</motion.span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.0 }}>😽</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cat;