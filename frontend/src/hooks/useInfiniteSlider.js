import { useRef, useState, useEffect, useCallback } from 'react';

export const useInfiniteSlider = ({ speed = 0.85, resumeDelay = 1800 } = {}) => {
  const sliderRef = useRef(null);
  const isInteractingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId;

    const step = () => {
      if (!isInteractingRef.current && slider) {
        slider.scrollLeft += speed;

        // Reset scroll seamlessly when reaching halfway
        const maxScroll = slider.scrollWidth / 2;
        if (slider.scrollLeft >= maxScroll) {
          slider.scrollLeft -= slider.scrollWidth / 3;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [speed]);

  const pauseAutoScroll = useCallback(() => {
    isInteractingRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  const resumeAutoScroll = useCallback((delay = resumeDelay) => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  }, [resumeDelay]);

  const handleMouseDown = useCallback((e) => {
    const slider = sliderRef.current;
    if (!slider) return;
    setIsDragging(true);
    pauseAutoScroll();
    dragStartX.current = e.pageX - slider.offsetLeft;
    dragStartScrollLeft.current = slider.scrollLeft;
  }, [pauseAutoScroll]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    slider.scrollLeft = dragStartScrollLeft.current - walk;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    resumeAutoScroll(1500);
  }, [resumeAutoScroll]);

  const handleMouseEnter = useCallback(() => {
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      resumeAutoScroll(1000);
    }
  }, [isDragging, resumeAutoScroll]);

  const handleTouchStart = useCallback(() => {
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  const handleTouchEnd = useCallback(() => {
    resumeAutoScroll(2000);
  }, [resumeAutoScroll]);

  return {
    sliderRef,
    isDragging,
    containerHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    },
    sliderHandlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd
    }
  };
};

export default useInfiniteSlider;
