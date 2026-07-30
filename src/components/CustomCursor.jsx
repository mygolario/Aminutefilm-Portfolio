import React, { useEffect, useState } from 'react';

export default function CustomCursor({ cursorState }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isHovered = cursorState.type !== 'default';
  const label = cursorState.text || '';

  return (
    <div
      className={`custom-cursor ${
        cursorState.type === 'hover' ? 'cursor-hover' : ''
      } ${cursorState.type === 'drag' ? 'cursor-drag' : ''} ${
        !isHovered ? 'cursor-default' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {isHovered && <span>{label}</span>}
    </div>
  );
}
