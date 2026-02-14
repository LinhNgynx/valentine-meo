import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CatProps {
  action: 'idle' | 'happy' | 'mischievous';
}

/**
 * Based on the 2x4 sprite sheet:
 * Row 1 (y: 0%): Awake (Left), Squint (Right)
 * Row 2 (y: 33.33%): Semi-closed (Left), Closed-Happy (Right)
 * Row 3 (y: 66.66%): Closed-Sleepy (Left), Closed-Deep (Right)
 * Row 4 (y: 100%): Awake (Left), Awake (Right)
 */
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

  // Blinking logic
  useEffect(() => {
    const triggerBlink = async () => {
      if (isHappy || isMischievous) return;

      // Quick blink sequence
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
      setCurrentFrame(FRAMES.HAPPY_CLOSED);
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
      className="relative w-[240px] h-[180px] sm:w-[340px] sm:h-[240px] md:w-[420px] md:h-[280px] lg:w-[480px] lg:h-[320px] xl:w-[560px] xl:h-[380px] flex items-center justify-center cursor-pointer select-none z-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        // CHANGED: Reduced bounce height for happy state from -30 to -12 for elegance
        y: isHappy ? [0, -12, 0] : [0, -6, 0],
        // CHANGED: Subtler rotation angles for happy state
        rotate: isHappy ? [-1, 1, -1] : [0, 0.5, -0.5, 0],
      }}
      transition={{
        // CHANGED: Increased duration significantly (0.5s -> 3.5s) for a slow float
        y: { repeat: Infinity, duration: isHappy ? 3.5 : 3, ease: "easeInOut" },
        rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }}
      whileTap={{ scale: 1.05 }} // Reduced tap scale slightly so it's less jarring
    >
      {/* Sprite Sheet Div */}
      <div
        className="w-full h-full bg-no-repeat bg-center"
        style={{
          // Ensure this path is correct for your project structure
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
          // CHANGED: Subtle scale change for shadow in happy state
          scaleX: isHappy ? [1, 0.9, 1] : [1, 1.1, 1],
          opacity: isHappy ? [0.1, 0.15, 0.1] : [0.1, 0.05, 0.1]
        }}
        // CHANGED: Shadow duration must match the main body Y duration (3.5s)
        transition={{ repeat: Infinity, duration: isHappy ? 3.5 : 3, ease: "easeInOut" }}
      />

      {/* Floating Emotions */}
      <AnimatePresence>
        {isHappy && (
          <motion.div
            className="absolute top-0 flex gap-4 pointer-events-none"
            initial={{ opacity: 0, y: 10 }} // Start slightly lower
            animate={{ opacity: 1, y: -50 }} // Move up slowly
            exit={{ opacity: 0, y: -70 }} // Continue up while fading
            transition={{ duration: 0.8, ease: "easeOut" }} // Smooth entry
          >
             {/* Slower emoji pulsing */}
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