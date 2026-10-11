import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PixelSnow from "./components/PixelSnow";
import CoverScreen from "./screens/CoverScreen";
import CandleBlownScreen from "./screens/CandleBlownScreen";
import GiftOfferScreen from "./screens/GiftOfferScreen";
import GiftRevealScreen from "./screens/GiftRevealScreen";

const STAGES = {
  COVER: "cover",
  BLOWN: "blown",
  OFFER: "offer",
  REVEAL: "reveal",
};

export default function App() {
  const [stage, setStage] = useState(STAGES.COVER);

  return (
    <div className="relative min-h-screen w-full bg-[#FBF3E6] text-stone-800 overflow-hidden">
      {stage !== STAGES.COVER && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <PixelSnow variant="confetti" />
        </div>
      )}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[520px] flex-col items-center justify-center px-6 py-10">
        <AnimatePresence mode="wait">
          {stage === STAGES.COVER && (
            <motion.div
              key="cover"
              exit={{ opacity: 0, y: -16 }}
              className="w-full"
            >
              <CoverScreen onBlow={() => setStage(STAGES.BLOWN)} />
            </motion.div>
          )}

          {stage === STAGES.BLOWN && (
            <motion.div
              key="blown"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full"
            >
              <CandleBlownScreen onNext={() => setStage(STAGES.OFFER)} />
            </motion.div>
          )}

          {stage === STAGES.OFFER && (
            <motion.div
              key="offer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full"
            >
              <GiftOfferScreen onAccept={() => setStage(STAGES.REVEAL)} />
            </motion.div>
          )}

          {stage === STAGES.REVEAL && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <GiftRevealScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
