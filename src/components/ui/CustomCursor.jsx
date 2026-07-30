import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default'); // default, hover, video, magnetic
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values for spring-dampened smoothness
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Enable custom cursor styles on body
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered elements for cursor attributes
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorVariant(type || 'hover');
        setCursorText(target.getAttribute('data-cursor-text') || '');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: '1px',
    },
    hover: {
      height: 54,
      width: 54,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.6)',
      borderWidth: '1px',
    },
    play: {
      height: 72,
      width: 72,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#ffffff',
      color: '#060608',
    },
    magnetic: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.8)',
    }
  };

  return (
    <>
      {/* Ambient Spotlight Following Cursor */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(255, 255, 255, 0.035), transparent 80%)`,
        }}
      />

      {/* Center Precision Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Fluid Outer Magnetic Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-[2px]"
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {cursorText && (
          <span className="text-center font-medium px-1 leading-none drop-shadow-md">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
