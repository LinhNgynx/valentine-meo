
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingHeartsProps {
  density?: number;
  isPartyMode?: boolean;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ density = 15, isPartyMode = false }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      type: Math.random() > 0.3 ? '💖' : '✨',
      rotation: Math.random() * 360
    }));
  }, [density]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          initial={{
            left: `${heart.x}%`,
            top: '110%',
            opacity: 0,
            scale: 0.5,
            rotate: heart.rotation
          }}
          animate={{
            top: '-10%',
            opacity: [0, 0.7, 0.7, 0],
            scale: isPartyMode ? [0.5, 1.5, 1] : 1,
            rotate: heart.rotation + 360,
            x: [0, 20, -20, 0]
          }}
          transition={{
            duration: heart.duration / (isPartyMode ? 2 : 1),
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{ fontSize: heart.size }}
        >
          {heart.type}
        </motion.div>
      ))}

      {isPartyMode && (
        <motion.div
          className="absolute inset-0 bg-pink-400 opacity-10"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default FloatingHearts;
