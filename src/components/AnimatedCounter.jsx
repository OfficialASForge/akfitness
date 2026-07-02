import { useState, useEffect } from "react";

function AnimatedCounter({ end, duration = 2000, trigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();

    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);

      const value = Math.floor(progress * end);
      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    setCount(0);
    requestAnimationFrame(animate);
  }, [trigger, end, duration]);

  return <>{count}</>;
}

export default AnimatedCounter