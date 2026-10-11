import { motion } from "framer-motion";

// Minimal stand-in for React Bits' SplitText so the project runs out of the
// box. Swap this file for the real one (see README) for a fancier reveal.
export default function SplitText({ text, className = "", delay = 30 }) {
  const letters = Array.from(text);

  return (
    <span className={className}>
      {letters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: (i * delay) / 1000 }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
