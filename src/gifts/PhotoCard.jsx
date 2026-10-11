import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function PhotoCard({ gift, onClose, sourceRect, sourceRef }) {
  const cardRef = useMotionValue(null);
  const overlayRef = useMotionValue(null);

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
        className="w-full max-w-sm rounded-2xl bg-white p-4 pb-6 text-center shadow-xl"
        style={{ transformOrigin: "center center" }}
      >
        <div className="mb-4 aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-100">
          <img
            src={gift.photoUrl}
            alt="Kenangan berdua"
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-sm italic text-stone-600">{gift.caption}</p>
        <button
          onClick={handleClose}
          className="mt-5 w-full rounded-full border border-stone-300 py-2 text-sm font-semibold text-stone-600"
        >
          Tutup
        </button>
      </motion.div>
    </motion.div>
  );
}
