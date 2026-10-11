import { useState, useRef } from "react";
import content from "../data/content";
import NoteCard from "../gifts/NoteCard";
import PhotoCard from "../gifts/PhotoCard";
import EnvelopeCard from "../gifts/EnvelopeCard";

const CARD_BY_ID = {
  note: NoteCard,
  photo: PhotoCard,
  envelope: EnvelopeCard,
};

export default function GiftRevealScreen() {
  const [openedId, setOpenedId] = useState(null);
  const [openedMap, setOpenedMap] = useState({});
  const [sourceRect, setSourceRect] = useState(null);
  const buttonRefs = useRef({});

  const openedCount = Object.values(openedMap).filter(Boolean).length;
  const allOpened = openedCount === content.gifts.length;
  const ActiveCard = openedId ? CARD_BY_ID[openedId] : null;
  const activeGift = content.gifts.find((g) => g.id === openedId);

  const handleOpen = (id, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSourceRect(rect);
    setOpenedId(id);
    setOpenedMap((m) => ({ ...m, [id]: true }));
  };

  const handleClose = () => {
    setOpenedId(null);
    setSourceRect(null);
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <span className="rounded-full bg-[#FCE3C0] px-4 py-1 text-xs font-semibold tracking-wide text-[#B5652B]">
        Choose your surprise
      </span>
      <h1 className="text-2xl font-extrabold text-stone-800">Tiga kado untukmu</h1>
      <p className="max-w-xs text-sm text-stone-500">
        Buka satu per satu. Setiap kotak menyimpan sesuatu yang kecil tapi tulus.
      </p>

      <div className="grid w-full grid-cols-3 gap-3">
        {content.gifts.map((gift) => (
          <button
            key={gift.id}
            ref={(el) => (buttonRefs.current[gift.id] = el)}
            onClick={(e) => handleOpen(gift.id, e)}
            className="flex flex-col items-center gap-2 rounded-2xl border border-[#EFE1C8] bg-white/70 p-3 shadow-sm transition hover:-translate-y-1"
          >
            <img
              src={openedMap[gift.id] ? "/assets/gift-box-opened.png" : "/assets/gift-box.png"}
              alt=""
              className="w-14"
            />
            <span className="text-[11px] font-medium text-stone-500">
              {openedMap[gift.id] ? "Sudah dibuka" : "Tap untuk buka"}
            </span>
          </button>
        ))}
      </div>

      <span className="text-xs text-stone-400">
        {allOpened
          ? "Semua kejutan sudah terbuka ✨"
          : `${openedCount} dari ${content.gifts.length} kado dibuka`}
      </span>

      {ActiveCard && activeGift && (
        <ActiveCard
          gift={activeGift}
          onClose={handleClose}
          sourceRect={sourceRect}
          sourceRef={buttonRefs.current[openedId]}
        />
      )}
    </div>
  );
}
