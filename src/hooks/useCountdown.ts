import { useCallback, useRef, useState } from 'react';

function useCountdown(duration: number) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<any>(null);
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 100);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setTimeLeft(duration);
    stop();
  }, []);

  return {timeLeft, start, stop, reset}
}

export { useCountdown };

