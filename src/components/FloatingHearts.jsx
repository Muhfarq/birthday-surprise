import { motion } from "framer-motion";

const EMOJIS = ["💛", "💖", "🎈", "✨", "💌"];

// Hearts + balloons that float up from the bottom of the parent.
// Toggle `active` to true when the envelope is opened.
export default function FloatingHearts({ active, count = 14 }) {
  if (!active) return null;
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {items.map((i) => {
        const left = 10 + Math.random() * 80;
        const delay = Math.random() * 0.6;
        const duration = 2.4 + Math.random() * 1.4;
        const emoji = EMOJIS[i % EMOJIS.length];
        const size = 18 + Math.random() * 16;

        return (
          <motion.span
            key={i}
            initial={{ y: 20, x: 0, opacity: 0 }}
            animate={{
              y: -260 - Math.random() * 100,
              x: (Math.random() - 0.5) * 60,
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration, delay, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: `${left}%`,
              bottom: 0,
              fontSize: size,
            }}
          >
            {emoji}
          </motion.span>
        );
      })}
    </div>
  );
}
