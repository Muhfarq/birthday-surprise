import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#EF6F53", "#F6B93B", "#F7DC6F", "#7BC67E", "#6FA8DC", "#E88FB6"];

// Small confetti burst, centered on its parent. Mount with `active` toggled
// to true to fire it once (e.g. right after blowing the candle).
export default function ConfettiBurst({ active, count = 24 }) {
  if (!active) return null;
  const pieces = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      <AnimatePresence>
        {pieces.map((i) => {
          const angle = (i / count) * Math.PI * 2;
          const distance = 90 + Math.random() * 80;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          const color = COLORS[i % COLORS.length];

          return (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={{
                x,
                y,
                opacity: 0,
                scale: 0.4,
                rotate: Math.random() * 180,
              }}
              transition={{ duration: 0.9 + Math.random() * 0.4, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 8,
                height: 8,
                borderRadius: i % 2 === 0 ? "9999px" : "2px",
                background: color,
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
