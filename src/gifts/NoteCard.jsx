import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function NoteCard({ gift, onClose, sourceRect, sourceRef }) {
  const cardRef = useMotionValue(null);
  const overlayRef = useMotionValue(null);

  // Animate in from button position
  useEffect(() => {
    if (!sourceRect || !cardRef.current) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const dx = sourceRect.left - cardRect.left;
    const dy = sourceRect.top - cardRect.top;
    const scaleX = sourceRect.width / cardRect.width;
    const scaleY = sourceRect.height / cardRect.height;

    const cardAnim = cardRef.current.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`, opacity: 0 },
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
      ],
      {
        duration: 450,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        fill: "forwards",
      }
    );

    let overlayAnim;
    if (overlayRef.current) {
      overlayAnim = overlayRef.current.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 200, fill: "forwards" }
      );
    }

    return () => {
      cardAnim.cancel();
      overlayAnim?.cancel();
    };
  }, [sourceRect]);

  // Animate out to button position
  const handleClose = () => {
    if (!sourceRect || !sourceRef || !cardRef.current) {
      onClose();
      return;
    }

    const cardRect = cardRef.current.getBoundingClientRect();
    const sourceRectNow = sourceRef.getBoundingClientRect();
    const dx = sourceRectNow.left - cardRect.left;
    const dy = sourceRectNow.top - cardRect.top;
    const scaleX = sourceRectNow.width / cardRect.width;
    const scaleY = sourceRectNow.height / cardRect.height;

    const animation = cardRef.current.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`, opacity: 0 },
      ],
      {
        duration: 350,
        easing: "cubic-bezier(0.5, 0, 0.5, 1)",
        fill: "forwards",
      }
    );

    let overlayAnim;
    if (overlayRef.current) {
      overlayAnim = overlayRef.current.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 200, fill: "forwards" }
      );
    }

    animation.onfinish = () => {
      overlayAnim?.cancel();
      onClose();
    };
  };

  return (
    <motion.div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 px-6"
      style={{ opacity: 0 }}
    >
      <motion.div
        ref={cardRef}
        className="w-full max-w-sm rounded-3xl border-2 border-dashed border-[#F0C9A0] bg-[#FFFBF3] p-6 text-left shadow-xl"
        style={{ transformOrigin: "center center" }}
      >
        <span className="mb-3 inline-block rounded-full bg-[#FCE3C0] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#B5652B]">
          {gift.tag}
        </span>
        <h2 className="mb-2 text-xl font-extrabold text-stone-800">{gift.title}</h2>
        <p className="text-sm leading-relaxed text-stone-600">{gift.message}</p>
        <p className="mt-3 text-sm font-medium text-[#EF6F53]">{gift.signOff}</p>
        <button
          onClick={handleClose}
          className="mt-5 w-full rounded-full border border-stone-300 bg-white py-2 text-sm font-semibold text-stone-600"
        >
          Tutup
        </button>
      </motion.div>
    </motion.div>
  );
}
