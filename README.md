# Birthday Surprise 🎉

Website ucapan ulang tahun interaktif: tiup lilin → tawaran hadiah (dengan
tombol "Nggak" yang kabur) → 3 kado yang bisa dibuka satu per satu (catatan,
foto, amplop dengan animasi hati & balon).

## 1. Install dependencies

```
npm install
```

## 2. (Opsional, tapi direkomendasikan) pasang komponen asli React Bits

Kode ini sudah jalan langsung pakai versi sederhana buatan sendiri di
`src/components/SplitText.jsx` dan `src/components/ClickSpark.jsx`, supaya
kamu bisa langsung `npm run dev` tanpa langkah tambahan.

Kalau mau animasi yang lebih niat sesuai versi asli dari
[reactbits.dev](https://reactbits.dev), ganti dua file itu dengan command CLI
resminya:

```
npx jsrepo init https://reactbits.dev/tailwind/
npx jsrepo add https://reactbits.dev/tailwind/TextAnimations/SplitText
npx jsrepo add https://reactbits.dev/tailwind/Animations/ClickSpark
```

Command `init` akan nanya folder tujuan komponen disimpan — pilih
`src/components` supaya menimpa file placeholder di atas. Kalau kamu pilih
folder lain, sesuaikan lagi baris import di `src/screens/CoverScreen.jsx`.

## 3. Siapkan asset gambar

Taruh file-file ini di folder `public/assets/` (nama harus sama persis, atau
ganti path-nya di kode):

- `duck-cake.png` — ilustrasi bebek bawa kue (export dari Figma-mu)
- `cake-smoke.png` — kue dengan asap lilin
- `duck-face.png` — bebek di layar tawaran hadiah
- `gift-box.png` — ikon kotak kado tertutup
- `envelope-closed.png` — amplop tertutup
- `memory-photo.jpg` — foto kalian berdua (dipakai di kado #2)

Tinggal select tiap ilustrasi di file Figma yang sudah kamu buat, lalu
Export as PNG.

## 4. Ganti teks & nama

Semua teks (ucapan, doa, caption foto, pesan di amplop) ada di satu tempat:
`src/data/content.js`. Edit di situ aja, nggak perlu utak-atik komponen.

## 5. Jalankan lokal

```
npm run dev
```

## 6. Deploy ke Netlify

```
npm run build
```

Lalu drag-drop folder `dist/` ke [netlify.com/drop](https://app.netlify.com/drop),
atau hubungkan repo GitHub-nya dan set:

- Build command: `npm run build`
- Publish directory: `dist`

## Struktur folder

```
src/
  App.jsx                 — state utama (cover → blown → offer → reveal)
  data/content.js          — semua teks & path foto, edit di sini
  components/
    DodgeButton.jsx         — tombol "Nggak dulu deh" yang kabur
    ConfettiBurst.jsx       — confetti pas tiup lilin & buka amplop
    FloatingHearts.jsx      — hati & balon naik pas amplop dibuka
    SplitText.jsx           — placeholder React Bits (lihat langkah 2)
    ClickSpark.jsx          — placeholder React Bits (lihat langkah 2)
  screens/
    CoverScreen.jsx
    CandleBlownScreen.jsx
    GiftOfferScreen.jsx
    GiftRevealScreen.jsx
  gifts/
    NoteCard.jsx
    PhotoCard.jsx
    EnvelopeCard.jsx
```
