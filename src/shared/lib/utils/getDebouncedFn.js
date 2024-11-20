/**
 *
 */
export function getDebouncedFn(func, delay, immediate = false) {
  let timeout;
  return function (...args) {
    const context = this;
    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, delay);

    if (callNow) func.apply(context, args);
  };
}
