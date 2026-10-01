import { useState, useCallback } from 'react';

export const usePagination = (items = [], initialCount = 6, step = 6, scrollTargetId = null) => {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + step, items.length));
      setIsLoadingMore(false);
    }, 300);
  }, [items.length, step]);

  const handleShowLess = useCallback(() => {
    setVisibleCount(initialCount);
    if (scrollTargetId) {
      const section = document.getElementById(scrollTargetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialCount, scrollTargetId]);

  const displayedItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return {
    displayedItems,
    visibleCount,
    hasMore,
    isLoadingMore,
    handleLoadMore,
    handleShowLess
  };
};

export default usePagination;
