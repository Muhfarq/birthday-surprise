import ClickSpark from "../components/ClickSpark";
import SplitText from "../components/SplitText";
import content from "../data/content";

// NOTE: ClickSpark & SplitText come from React Bits (reactbits.dev).
// Install them first — see README.md — otherwise these two imports will fail.
export default function CoverScreen({ onBlow }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <span className="rounded-full bg-[#FCE3C0] px-4 py-1 text-xs font-semibold tracking-wide text-[#B5652B]">
        Psst... hari ini spesial
      </span>

      <SplitText
        text={content.coverHeadline}
        className="text-4xl font-extrabold text-stone-800"
        delay={40}
      />

      <p className="max-w-xs text-sm text-stone-500">{content.coverSubtitle}</p>

      <img
        src="/assets/duck-cake.png"
        alt="Bebek membawa kue ulang tahun"
        className="w-56"
      />

      <ClickSpark sparkColor="#EF6F53" sparkCount={10} sparkRadius={20}>
        <button
          onClick={onBlow}
          className="rounded-full bg-[#EF6F53] px-8 py-3 font-semibold text-white shadow-lg shadow-[#EF6F53]/30 transition active:scale-95"
        >
          Tiup Lilinnya 🕯️
        </button>
      </ClickSpark>

      <span className="text-xs text-stone-400">make a wish dulu, ya!</span>
    </div>
  );
}
