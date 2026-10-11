import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

// The "Nggak dulu deh" button. Once it's been touched or hovered once,
// it teleports to a random spot on screen so it can never actually be pressed.
export default function DodgeButton({ label = "Nggak dulu deh", onDodge }) {
  const [dodged, setDodged] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const countRef = useRef(0);

  const runAway = useCallback(() => {
    const margin = 56;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const x = margin + Math.random() * Math.max(w - margin * 2, 0);
    const y = margin + Math.random() * Math.max(h - margin * 2, 0);

    countRef.current += 1;
    setPos({ x, y });
    setDodged(true);
    onDodge?.(countRef.current);
  }, [onDodge]);

  return (
    <motion.button
      type="button"
      onMouseEnter={runAway}
      onClick={runAway}
      onTouchStart={runAway}
      animate={dodged ? { left: pos.x, top: pos.y } : {}}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={dodged ? { left: pos.x, top: pos.y } : undefined}
      className={`whitespace-nowrap rounded-full border-2 border-stone-300 bg-white/80 px-6 py-3 font-semibold text-stone-500 shadow-sm select-none ${
        dodged ? "fixed z-50" : "relative"
      }`}
    >
      {label}
    </motion.button>
  );
}
