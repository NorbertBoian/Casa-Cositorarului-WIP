export const getRateLimitedFunction = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number,
  throttle = true as number | boolean,
  debounce = true as number | boolean
) => {
  let nextTick: undefined | NodeJS.Timeout = undefined;
  let timeout: undefined | NodeJS.Timeout = undefined;

  const throttledAndDebounced = (...args: Parameters<F>) => {
    const tick = () => {
      fn(...args);
      nextTick = undefined;
    };
    const later = () => fn(...args);
    if (!nextTick) {
      nextTick = setTimeout(
        tick,
        typeof throttle === "number" ? throttle : delay
      );
    }
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(
      later,
      typeof debounce === "number" ? debounce : delay
    );
  };

  const throttled = (...args: Parameters<F>) => {
    const tick = () => {
      fn(...args);
      nextTick = undefined;
    };
    if (!nextTick) {
      nextTick = setTimeout(
        tick,
        typeof throttle === "number" ? throttle : delay
      );
    }
  };

  const debounced = (...args: Parameters<F>) => {
    const later = () => fn(...args);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(
      later,
      typeof debounce === "number" ? debounce : delay
    );
  };

  if (throttle && debounce) return throttledAndDebounced as F;
  else if (throttle) return throttled as F;
  else return debounced as F;
};
