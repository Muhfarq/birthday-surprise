import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Minimal stand-in for React Bits' ClickSpark so the project runs out of the
// box. Swap this file for the real one (see README) for a fancier effect.
export default function ClickSpark({
  children,
  sparkColor = "#EF6F53",
  sparkCount = 8,
  sparkRadius = 18,
  duration = 400,
  className = "",
}) {
  const [sparks, setSparks] = useState([]);

  const handleClick = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();
      setSparks((s) => [...s, { id, x, y }]);
      setTimeout(() => {
        setSparks((s) => s.filter((sp) => sp.id !== id));
      }, duration + 100);
    },
    [duration]
  );

  return (
    <span onClick={handleClick} className={`relative inline-block ${className}`}>
      {children}
      <AnimatePresence>
        {sparks.map((spark) => (
          <span
            key={spark.id}
            style={{ position: "absolute", left: spark.x, top: spark.y, pointerEvents: "none" }}
          >
            {Array.from({ length: sparkCount }, (_, i) => {
              const angle = (i / sparkCount) * Math.PI * 2;
              const dx = Math.cos(angle) * sparkRadius;
              const dy = Math.sin(angle) * sparkRadius;
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: dx, y: dy, opacity: 0 }}
                  transition={{ duration: duration / 1000, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    width: 3,
                    height: 3,
                    borderRadius: "9999px",
                    background: sparkColor,
                  }}
                />
              );
            })}
          </span>
        ))}
      </AnimatePresence>
    </span>
  );
}
