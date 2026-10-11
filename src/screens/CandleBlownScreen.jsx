import { useEffect, useState } from "react";
import ConfettiBurst from "../components/ConfettiBurst";
import content from "../data/content";

export default function CandleBlownScreen({ onNext }) {
  const [burst, setBurst] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBurst(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-6 text-center">
      <span className="rounded-full bg-[#DCEFDD] px-4 py-1 text-xs font-semibold tracking-wide text-[#3F8A54]">
        Wish made ✓
      </span>
      <h1 className="text-3xl font-extrabold text-stone-800">{content.candleBlownTitle}</h1>
      <p className="max-w-xs text-sm text-stone-500">{content.candleBlownSubtitle}</p>

      <div className="relative">
        <img src="/assets/cake-smoke.png" alt="Kue dengan asap lilin" className="w-48" />
        <ConfettiBurst active={burst} />
      </div>

      <button
        onClick={onNext}
        className="rounded-full bg-[#EF6F53] px-8 py-3 font-semibold text-white shadow-lg shadow-[#EF6F53]/30 transition active:scale-95"
      >
        Lanjut →
      </button>
    </div>
  );
}
