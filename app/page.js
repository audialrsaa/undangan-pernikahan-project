"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   DATA
========================================================= */

const GROOM_NAME = "Alfa Fadhila";
const BRIDE_NAME = "Adhe Noerma Yunita";

const EVENT_DATE = new Date("2026-10-09T08:00:00+07:00");
const EVENT_LOCATION =
  "Jl. Kamp. Duri Dalam no.16 Rt 003/003 , Duri Selatan , Tambora , Jakarta Barat , 11270";

const scriptStyle = { fontFamily: "var(--font-pinyon), cursive" };
const serifStyle = { fontFamily: "var(--font-cormorant), Georgia, serif" };

/* =========================================================
   MAIN
========================================================= */

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Undangan");
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) setGuestName(decodeURIComponent(to));
  }, []);

  useEffect(() => {
    function tick() {
      const distance = EVENT_DATE.getTime() - Date.now();
      if (distance < 0) {
        setTimeLeft({ hari: 0, jam: 0, menit: 0, detik: 0 });
        return;
      }
      setTimeLeft({
        hari: Math.floor(distance / 86400000),
        jam: Math.floor((distance / 3600000) % 24),
        menit: Math.floor((distance / 60000) % 60),
        detik: Math.floor((distance / 1000) % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", !opened);
    return () => document.body.classList.remove("is-locked");
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [opened]);

  function handleOpen() {
    setOpened(true);
    audioRef.current
      ?.play()
      .then(() => setMusicPlaying(true))
      .catch(() => {});
  }

  function toggleMusic() {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => {});
    }
  }

  function copyAccount(number, key) {
    navigator.clipboard?.writeText(number.replace(/\s/g, ""));
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(null), 1800);
  }

  const mapsUrl = "https://maps.app.goo.gl/s4fTrDm5hJCgkHJi9";

  const dateLong = EVENT_DATE.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dateShort = EVENT_DATE.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dayNumber = EVENT_DATE.getDate();
  const monthShort = EVENT_DATE.toLocaleDateString("id-ID", {
    month: "short",
  }).toUpperCase();
  const yearShort = EVENT_DATE.getFullYear();

  function formatCardNumber(num) {
    const clean = String(num).replace(/\s/g, "");
    return clean.replace(/(.{4})/g, "$1 ").trim();
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--sage-900)]">
      <audio
        ref={audioRef}
        src="/music/sampai-jadi-debu-instrumental.mp3"
        loop
      />

      {/* =========================================================
          COVER
      ========================================================= */}
      <section
        className={`
          fixed inset-0 z-30
          bg-[var(--sage-900)]
          transition-all duration-[1200ms] ease-out
          ${
            opened
              ? "opacity-0 pointer-events-none -translate-y-8"
              : "opacity-100"
          }
        `}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--sage-700)]/25 blur-3xl pointer-events-none" />

        <SprigCorner className="top-0 left-0 w-28 h-28 sm:w-36 sm:h-36 text-[var(--champagne)]/30 anim-sway" />
        <SprigCorner
          className="top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 text-[var(--champagne)]/30 anim-sway"
          flipX
        />
        <SprigCorner className="bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 text-[var(--sage-300)]/25 anim-float" />
        <SprigCorner
          className="bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 text-[var(--sage-300)]/25 anim-float"
          flipX
        />

        <BotanicalRing className="absolute top-20 right-6 w-16 h-16 text-[var(--champagne)]/20 anim-turn" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-10 gap-7 sm:gap-9">
          <header className="text-center anim-fade-up">
            <p className="label-type text-[var(--champagne)] mb-3">
              The Wedding Of
            </p>

            <h1
              className="text-[var(--cream)] text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-3"
              style={scriptStyle}
            >
              {BRIDE_NAME.split(" ")[0]}
              <span className="block text-3xl sm:text-4xl md:text-5xl my-1 opacity-70">
                &amp;
              </span>
              {GROOM_NAME.split(" ")[0]}
            </h1>

            <div className="flex items-center justify-center gap-3 text-[var(--cream)]/60">
              <span className="hair-rule text-[var(--champagne)]" />
              <span className="label-type">{dateShort}</span>
              <span className="hair-rule text-[var(--champagne)]" />
            </div>
          </header>

          <div className="cover-frame anim-fade-up delay-2">
            <div className="cover-frame-inner" />

            <div className="relative z-10">
              <div className="flex justify-center mb-5">
                <div className="wax-seal">
                  <div className="wax-seal-ring" />
                  <div className="wax-seal-core" />
                  <span
                    className="relative z-10 text-[var(--champagne)] text-lg"
                    style={scriptStyle}
                  >
                    A &amp; A
                  </span>
                </div>
              </div>

              <p className="label-type text-center text-[var(--muted)] mb-5">
                Wedding Invitation
              </p>

              <div className="text-center mb-5">
                <p
                  className="text-[var(--muted)] text-sm italic mb-2"
                  style={serifStyle}
                >
                  Kepada Yth. Bapak/Ibu/Saudara/i
                </p>

                <p
                  className="text-[var(--ink)] text-2xl leading-tight mb-1"
                  style={serifStyle}
                >
                  {guestName}
                </p>

                <p className="label-type text-[var(--muted)] text-[10px]">
                  Di Tempat
                </p>
              </div>

              <div className="w-12 h-px mx-auto bg-[var(--gold)]/40 mb-5" />

              <p
                className="text-center text-[var(--muted)] text-xs leading-relaxed mb-5 italic"
                style={serifStyle}
              >
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir
                dan merayakan hari bahagia kami.
              </p>

              <button onClick={handleOpen} className="wedding-button w-full">
                <EnvelopeIcon />
                Buka Undangan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <div className={opened ? "" : "invisible"}>
        {/* ============ HERO ============ */}
        <section className="relative min-h-[760px] flex items-center justify-center overflow-hidden bg-[var(--sage-800)] text-[var(--cream)] px-6 py-32 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,193,154,0.10),transparent_60%)]" />

          <SprigCorner className="top-0 left-0 w-44 h-44 text-[var(--champagne)]/30 anim-sway" />
          <SprigCorner
            className="top-0 right-0 w-44 h-44 text-[var(--champagne)]/30 anim-sway"
            flipX
          />
          <SprigCorner className="bottom-0 left-0 w-36 h-36 text-[var(--sage-300)]/25 anim-float" />
          <SprigCorner
            className="bottom-0 right-0 w-36 h-36 text-[var(--sage-300)]/25 anim-float"
            flipX
          />

          <BotanicalRing className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-96 h-96 text-[var(--champagne)]/10 anim-turn" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="label-type text-[var(--champagne)] mb-7">
              The Wedding Of
            </p>

            <h1
              className="text-7xl sm:text-8xl md:text-9xl leading-[0.85] mb-8"
              style={scriptStyle}
            >
              {BRIDE_NAME.split(" ")[0]}
              {" & "}
              {GROOM_NAME.split(" ")[0]}
            </h1>

            <p
              className="text-lg md:text-xl italic text-[var(--champagne)] mb-8"
              style={serifStyle}
            >
              Dua Hati Menjadi Satu
            </p>

            <p className="label-type text-[var(--cream)]/60 mb-10">
              {dateLong}
            </p>

            <p
              className="text-[var(--cream)]/70 text-base italic max-w-md mx-auto"
              style={serifStyle}
            >
              Kepada Yth. Bapak/Ibu/Saudara/i{" "}
              <span className="text-[var(--cream)] not-italic">
                {guestName}
              </span>
            </p>
          </div>
        </section>

        {/* CURVE DIVIDER */}
        <CurveDivider from="#2b3526" to="#fbf8f1" />

        {/* ============ QUOTE ============ */}
        <section className="section bg-[var(--cream)] relative">
          <SprigCorner className="top-8 left-4 w-24 h-24 text-[var(--sage-400)]/20 anim-sway" />

          <div className="section-inner">
            <div className="max-w-3xl mx-auto text-center">
              <p
                className="text-[var(--gold)] text-5xl leading-none mb-6"
                style={serifStyle}
              >
                &ldquo;
              </p>

              <p
                className="text-[var(--ink)]/85 text-xl md:text-3xl leading-relaxed italic mb-7"
                style={serifStyle}
              >
                Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia
                menciptakan pasangan-pasangan untukmu dari (jenis) dirimu
                sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di
                antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang
                demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah)
                bagi kaum yang berpikir.
              </p>

              <p className="label-type text-[var(--sage-600)]">
                QS. Ar-Rum : 21
              </p>
            </div>
          </div>
        </section>

        {/* ============ MEMPELAI ============ */}
        <section className="section paper-texture relative">
          <SprigCorner
            className="top-0 right-0 w-44 h-44 text-[var(--gold)]/15 anim-sway"
            flipX
          />
          <SprigCorner className="bottom-0 left-0 w-44 h-44 text-[var(--gold)]/15 anim-sway" />

          <div className="section-inner">
            <div className="relative mb-20">
              <span className="editorial-number block leading-none">01</span>
              <div className="-mt-16 md:-mt-24 relative z-10">
                <p
                  className="text-[var(--gold)] text-3xl md:text-4xl mb-2"
                  style={scriptStyle}
                >
                  Kedua Mempelai
                </p>
                <h2 className="display-serif text-4xl md:text-5xl text-[var(--ink)] max-w-md">
                  Dengan tulus memohon ridho-Nya
                </h2>
              </div>
            </div>

            {/* Bride */}
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center mb-28 md:mb-40 reveal">
              <div className="md:col-span-5 relative">
                <PhotoFrame src="/images/foto-1.jpg" alt={BRIDE_NAME} />
              </div>

              <div className="md:col-span-7 md:pl-6 text-center md:text-left">
                <p className="label-type text-[var(--gold)] mb-3">
                  Mempelai Wanita
                </p>

                <h3 className="display-serif text-4xl md:text-5xl text-[var(--ink)] mb-4">
                  {BRIDE_NAME}
                </h3>

                <div className="w-14 h-px bg-[var(--gold)]/50 mb-5 mx-auto md:mx-0" />

                <p
                  className="text-[var(--muted)] text-base italic leading-relaxed"
                  style={serifStyle}
                >
                  Putri tercinta dari
                </p>
                <p
                  className="text-[var(--muted)] text-base italic leading-relaxed"
                  style={serifStyle}
                >
                  Bpk. Sabar Priyanto (alm) & Ny. Anna
                </p>
              </div>
            </div>

            {/* Groom */}
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center reveal">
              <div className="md:col-span-7 md:pr-6 order-2 md:order-1 text-center md:text-right">
                <p className="label-type text-[var(--gold)] mb-3">
                  Mempelai Pria
                </p>

                <h3 className="display-serif text-4xl md:text-5xl text-[var(--ink)] mb-4">
                  {GROOM_NAME}
                </h3>

                <div className="w-14 h-px bg-[var(--gold)]/50 mb-5 mx-auto md:ml-auto md:mr-0" />

                <p
                  className="text-[var(--muted)] text-base italic leading-relaxed"
                  style={serifStyle}
                >
                  Putra tercinta dari
                </p>
                <p
                  className="text-[var(--muted)] text-base italic leading-relaxed"
                  style={serifStyle}
                >
                  Bpk. Abdul Fatah & Ny. Jijah
                </p>
              </div>

              <div className="md:col-span-5 relative order-1 md:order-2">
                <PhotoFrame src="/images/foto-2.jpg" alt={GROOM_NAME} />
              </div>
            </div>
          </div>
        </section>

        {/* ============ EVENT ============ */}
        <section className="section bg-[var(--cream)] relative">
          <SprigCorner className="top-8 left-4 w-28 h-28 text-[var(--sage-400)]/25 anim-float" />
          <SprigCorner
            className="bottom-8 right-4 w-28 h-28 text-[var(--sage-400)]/25 anim-float"
            flipX
          />

          <div className="section-inner">
            <div className="relative mb-16">
              <span className="editorial-number block leading-none">02</span>
              <div className="-mt-16 md:-mt-24 relative z-10">
                <p
                  className="text-[var(--gold)] text-3xl md:text-4xl mb-2"
                  style={scriptStyle}
                >
                  Waktu &amp; Lokasi
                </p>
                <h2 className="display-serif text-4xl md:text-5xl text-[var(--ink)]">
                  Rangkaian acara
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 reveal">
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center">
                    <span className="display-serif text-7xl md:text-8xl leading-none text-[var(--sage-700)]">
                      {dayNumber}
                    </span>
                    <span className="label-type text-[var(--gold)] mt-2">
                      {monthShort}
                    </span>
                    <span className="label-type text-[var(--muted)] mt-0.5 text-[10px]">
                      {yearShort}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="w-full h-px bg-[var(--gold)]/30 mb-4" />
                    <p
                      className="text-[var(--muted)] text-base italic leading-relaxed"
                      style={serifStyle}
                    >
                      Hari yang kami nantikan untuk memulai babak baru
                      kehidupan bersama.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="label-type text-[var(--muted)] mb-4">
                    Menuju hari bahagia
                  </p>

                  <div className="flex gap-2 sm:gap-3">
                    {[
                      { label: "Hari", value: timeLeft.hari },
                      { label: "Jam", value: timeLeft.jam },
                      { label: "Menit", value: timeLeft.menit },
                      { label: "Detik", value: timeLeft.detik },
                    ].map((item) => (
                      <div key={item.label} className="countdown-pill">
                        <p className="display-serif text-2xl sm:text-3xl text-[var(--ink)] leading-none">
                          {String(item.value).padStart(2, "0")}
                        </p>
                        <p className="label-type text-[9px] text-[var(--muted)] mt-1.5">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 reveal delay-2">
                <div className="relative pl-6 md:pl-10">
                  <span className="absolute left-0 top-2 bottom-2 w-px bg-[var(--gold)]/30" />

                  <p className="label-type text-[var(--gold)] mb-3">
                    Syukuran
                  </p>

                  <h3 className="display-serif text-3xl md:text-4xl text-[var(--ink)] mb-3">
                    {dateLong}
                  </h3>
                  <p
                    className="text-[var(--muted)] text-sm mb-1"
                    style={serifStyle}
                  >
                    Pukul 14.00 WIB
                  </p>

                  <p
                    className="text-[var(--muted)] text-base mb-6"
                    style={serifStyle}
                  >
                    {EVENT_LOCATION}
                  </p>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="wedding-button"
                  >
                    <PinIcon small />
                    Lihat Lokasi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GALLERY ============ */}
        <section className="section paper-texture relative">
          <SprigCorner className="top-0 left-0 w-40 h-40 text-[var(--gold)]/15 anim-sway" />
          <SprigCorner
            className="bottom-0 right-0 w-40 h-40 text-[var(--gold)]/15 anim-sway"
            flipX
          />

          <div className="section-inner">
            <div className="relative mb-14">
              <span className="editorial-number block leading-none">03</span>
              <div className="-mt-16 md:-mt-24 relative z-10">
                <p
                  className="text-[var(--gold)] text-3xl md:text-4xl mb-2"
                  style={scriptStyle}
                >
                  Dokumentasi
                </p>
                <h2 className="display-serif text-4xl md:text-5xl text-[var(--ink)]">
                  Galeri kasih
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 md:gap-4">
              <div className="col-span-12 md:col-span-7 mosaic-cell aspect-[4/3] md:aspect-[5/4] rounded-[28px]">
                <img src="/images/gallery-1.jpg" alt="Galeri" />
              </div>

              <div className="col-span-6 md:col-span-5 mosaic-cell aspect-[3/4] rounded-[28px]">
                <img src="/images/gallery-2.jpg" alt="Galeri" />
              </div>

              <div className="col-span-6 md:col-span-5 mosaic-cell aspect-square rounded-[28px]">
                <img src="/images/gallery-2.jpg" alt="Galeri" />
              </div>

              <div className="col-span-12 md:col-span-7 rounded-[28px] bg-[var(--sage-700)] text-[var(--cream)] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center">
                <BotanicalRing className="absolute -right-16 -bottom-16 w-52 h-52 text-[var(--champagne)]/15 anim-turn" />
                <SprigCorner className="absolute top-0 left-0 w-24 h-24 text-[var(--champagne)]/25 anim-sway" />

                <p
                  className="relative z-10 text-4xl md:text-5xl mb-3"
                  style={scriptStyle}
                >
                  A &amp; A
                </p>
                <div className="relative z-10 w-12 h-px bg-[var(--champagne)]/60 mb-4" />
                <p className="relative z-10 label-type text-[var(--cream)]/60">
                  One beautiful beginning
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GIFT — ATM CARD STYLE ============ */}
        <section className="section bg-[var(--cream)] relative">
          <SprigCorner className="top-8 left-4 w-32 h-32 text-[var(--sage-400)]/20 anim-float" />
          <SprigCorner
            className="bottom-8 right-4 w-32 h-32 text-[var(--sage-400)]/20 anim-float"
            flipX
          />

          <div className="section-inner">
            <div className="relative mb-14">
              <span className="editorial-number block leading-none">04</span>
              <div className="-mt-16 md:-mt-24 relative z-10 max-w-xl">
                <p
                  className="text-[var(--gold)] text-3xl md:text-4xl mb-2"
                  style={scriptStyle}
                >
                  Tanda Kasih
                </p>
                <h2 className="display-serif text-4xl md:text-5xl text-[var(--ink)] mb-5">
                  Amplop digital &amp; kado
                </h2>
                <p
                  className="text-[var(--muted)] text-base leading-relaxed"
                  style={serifStyle}
                >
                  Doa restu Anda adalah karunia terindah bagi kami. Namun jika
                  Anda bermaksud memberikan tanda kasih, dapat melalui nomor
                  rekening di bawah ini.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-6 max-w-3xl">
              {[
                {
                  bank: "BCA",
                  number: "3452461533",
                  name: BRIDE_NAME,
                  variant: "atm-card--sage",
                },
                {
                  bank: "BCA",
                  number: "8680059765",
                  name: GROOM_NAME,
                  variant: "atm-card--gold",
                },
              ].map((account) => (
                <div key={account.number} className="gift-card-wrap">
                  <div className={`atm-card ${account.variant}`}>
                    <div className="atm-card-inner">
                      <div className="atm-card-top">
                        <span className="atm-card-bank">{account.bank}</span>
                        <span className="atm-card-chip" aria-hidden="true" />
                      </div>

                      <div>
                        <p className="atm-card-label">Card Number</p>
                        <p className="atm-card-number">
                          {formatCardNumber(account.number)}
                        </p>
                      </div>

                      <div className="atm-card-bottom">
                        <div>
                          <p className="atm-card-label">Card Holder</p>
                          <p className="atm-card-name">{account.name}</p>
                        </div>

                        <div className="text-right">
                          <p className="atm-card-label">Valid Thru</p>
                          <p className="atm-card-name">10/26</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="atm-card-actions">
                    <button
                      onClick={() =>
                        copyAccount(account.number, account.number)
                      }
                      className="atm-card-copy-btn"
                    >
                      {copiedAccount === account.number
                        ? "Tersalin ✓"
                        : "Salin Nomor Rekening"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="relative overflow-hidden bg-[var(--sage-900)] text-[var(--cream)] px-6 py-28 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,193,154,0.08),transparent_60%)]" />

          <SprigCorner className="top-0 left-0 w-40 h-40 text-[var(--champagne)]/30 anim-sway" />
          <SprigCorner
            className="top-0 right-0 w-40 h-40 text-[var(--champagne)]/30 anim-sway"
            flipX
          />
          <SprigCorner className="bottom-0 left-0 w-36 h-36 text-[var(--sage-300)]/25 anim-float" />
          <SprigCorner
            className="bottom-0 right-0 w-36 h-36 text-[var(--sage-300)]/25 anim-float"
            flipX
          />

          <BotanicalRing className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-80 h-80 text-[var(--champagne)]/10 anim-turn" />

          <div className="relative z-10 max-w-xl mx-auto">
            <p
              className="text-[var(--cream)]/65 text-base italic leading-relaxed mb-10"
              style={serifStyle}
            >
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu
              kepada kami berdua.
            </p>

            <div className="ornament-divider text-[var(--champagne)]/60 mb-7" />

            <h3 className="text-6xl md:text-7xl mb-5" style={scriptStyle}>
              {BRIDE_NAME.split(" ")[0]}
              {" & "}
              {GROOM_NAME.split(" ")[0]}
            </h3>

            <p className="label-type text-[var(--cream)]/40">
              Beserta Keluarga Besar Kedua Mempelai
            </p>
          </div>
        </footer>

        <button
          onClick={toggleMusic}
          className="music-button fixed bottom-5 right-5 z-20"
          aria-label={musicPlaying ? "Matikan musik" : "Putar musik"}
        >
          {musicPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </main>
  );
}

/* =========================================================
   CURVE DIVIDER
========================================================= */

function CurveDivider({ from = "#2b3526", to = "#fbf8f1" }) {
  return (
    <div className="relative w-full -mt-px">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[60px] md:h-[100px]"
        aria-hidden="true"
      >
        <path
          d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

/* =========================================================
   PHOTO FRAME — Ornate Oval
========================================================= */

function PhotoFrame({ src, alt, className = "" }) {
  return (
    <div className={`photo-frame-oval ${className}`}>
      <span className="photo-frame-halo" />

      <span className="photo-frame-leaf photo-frame-leaf--tl">
        <LeafOrnament />
      </span>
      <span className="photo-frame-leaf photo-frame-leaf--tr">
        <LeafOrnament />
      </span>
      <span className="photo-frame-leaf photo-frame-leaf--bl">
        <LeafOrnament />
      </span>
      <span className="photo-frame-leaf photo-frame-leaf--br">
        <LeafOrnament />
      </span>

      <div className="photo-frame-oval-inner">
        <img src={src} alt={alt} />
      </div>

      <span className="photo-frame-bow" aria-hidden="true">
        <BowRibbon />
      </span>
    </div>
  );
}

/* =========================================================
   BOW RIBBON
========================================================= */

function BowRibbon() {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="100" cy="42" rx="9" ry="11" fill="currentColor" opacity="0.9" />
      <ellipse cx="100" cy="42" rx="5" ry="7" fill="var(--sage-700)" />

      <path
        d="M92 42 C70 20, 40 18, 38 38 C36 56, 66 60, 92 48"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M92 42 C70 20, 40 18, 38 38 C36 56, 66 60, 92 48"
        stroke="var(--sage-700)"
        strokeWidth="0.8"
        opacity="0.4"
      />

      <path
        d="M108 42 C130 20, 160 18, 162 38 C164 56, 134 60, 108 48"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M108 42 C130 20, 160 18, 162 38 C164 56, 134 60, 108 48"
        stroke="var(--sage-700)"
        strokeWidth="0.8"
        opacity="0.4"
      />

      <path
        d="M92 52 C82 72, 70 88, 58 100 C66 96, 78 92, 92 84"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M92 52 C82 72, 70 88, 58 100"
        stroke="var(--sage-700)"
        strokeWidth="0.8"
        opacity="0.35"
        fill="none"
      />

      <path
        d="M108 52 C118 72, 130 88, 142 100 C134 96, 122 92, 108 84"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M108 52 C118 72, 130 88, 142 100"
        stroke="var(--sage-700)"
        strokeWidth="0.8"
        opacity="0.35"
        fill="none"
      />
    </svg>
  );
}

/* =========================================================
   LEAF ORNAMENT
========================================================= */

function LeafOrnament() {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 55 C 20 40, 35 25, 55 5" />
      <path d="M15 45 C 10 38, 12 30, 20 28 C 22 36, 20 42, 15 45 Z" />
      <path d="M25 35 C 20 28, 22 20, 30 18 C 32 26, 30 32, 25 35 Z" />
      <path d="M35 25 C 30 18, 32 10, 40 8 C 42 16, 40 22, 35 25 Z" />
      <path d="M20 50 C 14 48, 8 42, 12 34 C 20 38, 22 44, 20 50 Z" />
      <path d="M30 40 C 24 38, 18 32, 22 24 C 30 28, 32 34, 30 40 Z" />
      <path d="M40 30 C 34 28, 28 22, 32 14 C 40 18, 42 24, 40 30 Z" />
    </svg>
  );
}

/* =========================================================
   ICONS
========================================================= */

function EnvelopeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PinIcon({ small = false }) {
  const size = small ? 14 : 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.5-7-11a7 7 0 0114 0c0 4.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function SprigCorner({ className = "", flipX = false }) {
  return (
    <div
      className={`sprig-corner ${flipX ? "sprig-flip-x" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 5 C 40 40, 90 70, 140 110" />
        <path d="M30 30 C 25 18, 32 10, 45 8 C 44 22, 38 28, 30 30 Z" />
        <path d="M45 45 C 38 34, 46 26, 60 24 C 58 38, 52 44, 45 45 Z" />
        <path d="M62 62 C 55 50, 64 42, 78 40 C 76 54, 70 60, 62 62 Z" />
        <path d="M80 80 C 73 68, 82 60, 96 58 C 94 72, 88 78, 80 80 Z" />
        <path d="M100 100 C 93 88, 102 80, 116 78 C 114 92, 108 98, 100 100 Z" />
        <path d="M120 118 C 114 106, 122 98, 136 96 C 134 110, 128 116, 120 118 Z" />
        <path d="M22 42 C 12 38, 8 30, 12 20 C 24 24, 28 32, 22 42 Z" />
        <path d="M38 60 C 28 56, 24 48, 28 38 C 40 42, 44 50, 38 60 Z" />
        <path d="M56 78 C 46 74, 42 66, 46 56 C 58 60, 62 68, 56 78 Z" />
        <path d="M74 96 C 64 92, 60 84, 64 74 C 76 78, 80 86, 74 96 Z" />
        <path d="M94 116 C 84 112, 80 104, 84 94 C 96 98, 100 106, 94 116 Z" />
        <circle cx="150" cy="120" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="160" cy="130" r="1" fill="currentColor" stroke="none" />
        <circle cx="170" cy="140" r="1.5" fill="currentColor" stroke="none" />
        <circle
          cx="140"
          cy="105"
          r="3"
          fill="currentColor"
          stroke="none"
          opacity="0.6"
        />
        <circle
          cx="148"
          cy="112"
          r="2.2"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
        <circle
          cx="134"
          cy="112"
          r="2.2"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

function BotanicalRing({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" strokeDasharray="2 6" />
      <path
        d="M50 7 C59 17 67 20 80 20 C78 32 83 40 93 50 C83 60 78 68 80 80 C67 80 59 83 50 93 C41 83 33 80 20 80 C22 68 17 60 7 50 C17 40 22 32 20 20 C33 20 41 17 50 7"
        strokeDasharray="1 7"
        opacity="0.5"
      />
    </svg>
  );
}