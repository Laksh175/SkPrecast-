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
      className={`fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform transition-opacity duration-200 -ml-[13px] -mt-[13px] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0)'
      }}
      aria-hidden="true"
    >
      {/* Golden Glowing Squircle Shape (Directly locked with arrow cursor) */}
      <div
        className="relative w-[26px] h-[26px] rounded-[8px] bg-[#090e1a] border-[2.5px] border-[#020617] flex items-center justify-center transition-all duration-150"
        style={{
          boxShadow: isHovered
            ? '0 0 28px 6px rgba(245, 158, 11, 0.8), 0 0 45px 10px rgba(245, 158, 11, 0.4), inset 0 0 6px rgba(251, 191, 36, 0.7)'
            : '0 0 18px 3px rgba(245, 158, 11, 0.55), 0 0 32px 6px rgba(245, 158, 11, 0.25)',
          transform: `scale(${isClicked ? 0.75 : isHovered ? 1.3 : 1})`
        }}
      >
        {/* Inner Vibrant Golden Amber Core */}
        <div
          className="w-[14px] h-[14px] rounded-[4.5px] transition-all duration-150 bg-gradient-to-br from-[#fde047] via-[#fbbf24] to-[#f59e0b] shadow-[0_0_8px_rgba(251,191,36,0.9)]"
          style={{
            transform: `scale(${isHovered ? 1.15 : 1})`
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
