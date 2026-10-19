/**
 * Smooth, fluid, slow scroll helper with easing
 * Provides a luxurious, silky deceleration curve instead of browser-default snappy jumps.
 */
export function smoothScrollToTop(duration = 800, onComplete?: () => void) {
  const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  if (startY <= 4) {
    if (onComplete) onComplete();
    return;
  }

  const startTime = performance.now();

  // Quintic / Quartic ease-out for a slow, fluid, ultra-smooth stop
  function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);

    const currentY = startY * (1 - eased);
    window.scrollTo(0, currentY);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, 0);
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(step);
}
