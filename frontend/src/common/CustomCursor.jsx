import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorContainerRef = useRef(null);

  useEffect(() => {
    // Check if device supports true hover and is desktop/large screen
    const checkDevice = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isLargeScreen = window.innerWidth >= 1024;
      setIsDesktop(hasHover && isLargeScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      // Direct instant 1:1 hardware-accelerated movement (Zero delay / Zero lag with the arrow)
      if (cursorContainerRef.current) {
        cursorContainerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Interactive target detection (buttons, links, inputs, cards)
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], label, .cursor-pointer, [data-cursor-hover]'
      );

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorContainerRef}
      className={`fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0)'
      }}
      aria-hidden="true"
    >
      {/* Modern Circular Ring with Center White Dot (Pointer.js Style) */}
      <div
        className="relative flex items-center justify-center rounded-full transition-all duration-150 ease-out"
        style={{
          width: '32px',
          height: '32px',
          border: '2px solid #fbbf24',
          backgroundColor: isHovered ? 'rgba(251, 191, 36, 0.12)' : 'transparent',
          boxShadow: isHovered
            ? '0 0 16px rgba(251, 191, 36, 0.65), inset 0 0 8px rgba(251, 191, 36, 0.25)'
            : '0 0 10px rgba(251, 191, 36, 0.45)',
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.75 : isHovered ? 1.35 : 1})`
        }}
      >
        {/* Crisp Center White Dot */}
        <div
          className="rounded-full bg-white transition-all duration-150"
          style={{
            width: isHovered ? '6px' : '5px',
            height: isHovered ? '6px' : '5px',
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.95)'
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
