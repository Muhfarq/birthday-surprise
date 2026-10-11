import { useState } from "react";
import DodgeButton from "../components/DodgeButton";
import content from "../data/content";

export default function GiftOfferScreen({ onAccept }) {
  // The "Iya" button grows a little every time the "Nggak" button dodges —
  // a small nudge without needing a separate confirm-loop.
  const [dodgeCount, setDodgeCount] = useState(0);
  const scale = Math.min(1 + dodgeCount * 0.04, 1.3);

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <span className="rounded-full bg-[#FCE3C0] px-4 py-1 text-xs font-semibold tracking-wide text-[#B5652B]">
        Special delivery
      </span>
      <h1 className="text-2xl font-extrabold text-stone-800">{content.giftOfferQuestion}</h1>
      <p className="max-w-xs text-sm text-stone-500">{content.giftOfferHint}</p>

      <img src="/assets/duck-face.png" alt="Bebek menunggu jawaban" className="w-40" />

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onAccept}
          style={{ transform: `scale(${scale})` }}
          className="rounded-full bg-[#EF6F53] px-8 py-3 font-semibold text-white shadow-lg shadow-[#EF6F53]/30 transition active:scale-95"
        >
          Iya, mau!
        </button>
        <DodgeButton onDodge={setDodgeCount} />
      </div>
    </div>
  );
}
