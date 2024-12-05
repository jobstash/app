import { useEffect, useState } from 'react';

export function useDelayedTrue(value: boolean, delay: number) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (value) {
      // If value becomes true, immediately set it to true
      setDelayedValue(true);
    } else {
      // Delay setting the value to false
      timeout = setTimeout(() => setDelayedValue(false), delay);
    }

    return () => clearTimeout(timeout); // Cleanup timeout on unmount or value change
  }, [value, delay]);

  return delayedValue;
}
