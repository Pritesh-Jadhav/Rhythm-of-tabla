import { useState, useEffect, useCallback, useRef } from "react";
import "./Home.css";

// ── SLIDER DATA ──────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    tag: "PERCUSSION",
    badge: "🥁 The Tabla",
    heading: "Soul of Indian",
    headingAccent: "Classical Music",
    body: "The tabla is the heartbeat of Hindustani music — a pair of hand drums that speak the language of rhythm, devotion, and artistry. Every bol carries centuries of Gharana tradition.",
    ornament: "धा धिन धिन ना",
    cta: "Discover More",
    ctaSecondary: "Book Sai",
    bg: "radial-gradient(ellipse at 30% 50%, #3d1200 0%, #1a0800 40%, #060402 100%)",
    accentColor: "#e8a020",
    emoji: "🥁",
  },
  {
    id: 2,
    tag: "DHOLKI",
    badge: "🪘 The Dholki",
    heading: "Heartbeat of",
    headingAccent: "Every Celebration",
    body: "The dholki transforms every celebration into a festival. Its vibrant, resonant beats are the soul of weddings, sangeet ceremonies, and festive gatherings across India.",
    ornament: "ना धिन धिन ना",
    cta: "Explore Dholki",
    ctaSecondary: "Book Sai",
    bg: "radial-gradient(ellipse at 70% 40%, #1a0d00 0%, #0f0a02 40%, #060402 100%)",
    accentColor: "#d4880a",
    emoji: "🪘",
  },
  {
    id: 3,
    tag: "LIVE",
    badge: "🎵 Live Performance",
    heading: "Feel the",
    headingAccent: "Rhythm Live",
    body: "From New Year galas to intimate sangeet ceremonies — Sai Nikam brings the raw energy of live tabla and dholki performance to every stage in Nashik and beyond.",
    ornament: "तिन तिन ना ना",
    cta: "Watch Performances",
    ctaSecondary: "Book Now",
    bg: "radial-gradient(ellipse at 50% 60%, #1a0e00 0%, #120800 40%, #060402 100%)",
    accentColor: "#f0a030",
    emoji: "🎶",
  },
  {
    id: 4,
    tag: "NASHIK",
    badge: "📍 Based in Nashik",
    heading: "Classical Beats,",
    headingAccent: "Modern Stages",
    body: "Rooted in the classical tradition of Indian percussion, Sai Nikam delivers authentic, powerful performances — available for weddings, corporate events, and cultural programmes.",
    ornament: "धे धे तिन ना",
    cta: "About Sai",
    ctaSecondary: "Contact Us",
    bg: "radial-gradient(ellipse at 20% 30%, #1f1000 0%, #140900 40%, #060402 100%)",
    accentColor: "#c9922a",
    emoji: "✨",
  },
];

const AUTOPLAY = 5000;

// ── ANIMATED CIRCLES ────────────────────────────────────────
function DrumCircles({ color }) {
  return (
    <div className="drum-circles">
      <div className="dc dc--1" style={{ borderColor: color }} />
      <div className="dc dc--2" style={{ borderColor: color }} />
      <div className="dc dc--3" style={{ borderColor: color }} />
      <div className="dc__center" style={{ color }}>
        <span className="dc__symbol">॥</span>
      </div>
    </div>
  );
}

// ── FLOATING BOLS ────────────────────────────────────────────
function FloatingBols() {
  const bols = ["धा","धिन","ना","तिन","ते","धे","गे","ता","क","ट"];
  return (
    <div className="floating-bols" aria-hidden="true">
      {bols.map((bol, i) => (
        <span
          key={i}
          className="fbol"
          style={{
            left: `${8 + i * 9}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 3) * 2}s`,
          }}
        >
          {bol}
        </span>
      ))}
    </div>
  );
}

// ── SLIDE CONTENT ────────────────────────────────────────────
function SlideContent({ slide, settled, onCta }) {
  return (
    <div className={`slide-content ${settled ? "slide-content--settled" : ""}`}>
      <div className="slide-content__left">
        <span className="sc__badge">
          <span className="sc__tag" style={{ background: slide.accentColor }}>{slide.tag}</span>
          {slide.badge}
        </span>

        <h1 className="sc__heading">
          <span className="sc__h-line1">{slide.heading}</span>
          <span className="sc__h-line2" style={{ color: slide.accentColor }}>
            {slide.headingAccent}
          </span>
        </h1>

        <p className="sc__ornament">{slide.ornament}</p>
        <p className="sc__body">{slide.body}</p>

        <div className="sc__actions">
          <button className="sc__btn-primary" style={{ background: slide.accentColor }} onClick={onCta}>
            {slide.cta}
          </button>
          <button className="sc__btn-ghost" onClick={onCta}>
            {slide.ctaSecondary}
          </button>
        </div>
      </div>

      <div className="slide-content__right">
        <DrumCircles color={slide.accentColor} />
        <div className="slide-emoji" style={{ color: slide.accentColor }}>
          {slide.emoji}
        </div>
      </div>
    </div>
  );
}

// ── MAIN HOME COMPONENT ──────────────────────────────────────
export default function Home({ onNavigate }) {
  const [current, setCurrent]     = useState(0);
  const [prev, setPrev]           = useState(null);
  const [dir, setDir]             = useState("next");
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const audioRef                  = useRef(null);

  const goTo = useCallback((idx, direction = "next") => {
    if (animating || idx === current) return;
    setDir(direction);
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    setProgress(0);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 680);
  }, [animating, current]);

  const goNext = useCallback(() => goTo((current + 1) % SLIDES.length, "next"), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length, "prev"), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, AUTOPLAY);
    return () => clearInterval(t);
  }, [paused, goNext]);

  // Progress ring
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    const t = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / AUTOPLAY) * 100, 100));
    }, 30);
    return () => clearInterval(t);
  }, [current, paused]);

  const slide     = SLIDES[current];
  const prevSlide = prev !== null ? SLIDES[prev] : null;

  return (
    <div className="home">
      
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <FloatingBols />

        <div className="hero__track">
          
          {prevSlide && (
            <div
              className={`hero__slide hero__slide--exit-${dir}`}
              style={{ background: prevSlide.bg }}
            >
              <SlideContent slide={prevSlide} settled={false} onCta={() => onNavigate("Contact")} />
            </div>
          )}

          
          <div
            className={`hero__slide hero__slide--enter-${dir} ${animating ? "" : "hero__slide--settled"}`}
            style={{ background: slide.bg }}
          >
            <div className="hero__bg-grain" />
            <SlideContent slide={slide} settled={!animating} onCta={() => onNavigate("Contact")} />
          </div>
        </div>

        
        <button className="hero__arrow hero__arrow--left" onClick={goPrev} aria-label="Previous slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

    
        <button className="hero__arrow hero__arrow--right" onClick={goNext} aria-label="Next slide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        
        <div className="hero__dots">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? "hero__dot--active" : ""}`}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === current && (
                <svg className="hero__dot-ring" viewBox="0 0 36 36">
                  <circle
                    cx="18" cy="18" r="14"
                    fill="none"
                    stroke={s.accentColor}
                    strokeWidth="2.5"
                    strokeDasharray={`${(progress / 100) * 88} 88`}
                    strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

       
        <div className="hero__counter">
          <span className="hero__counter-cur">0{current + 1}</span>
          <span className="hero__counter-div">/</span>
          <span className="hero__counter-tot">0{SLIDES.length}</span>
        </div>

        
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>scroll</span>
        </div>
      </section>

     
      <section className="stats-section">
        <div className="stats-section__inner">
          {[
            { num: "7+", label: "Live Performances" },
            { num: "3+", label: "Event Types" },
            { num: "2", label: "Instruments" },
            { num: "∞", label: "Passion for Music" },
          ].map(({ num, label }) => (
            <div className="stat-card" key={label}>
              <span className="stat-card__num">{num}</span>
              <span className="stat-card__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      
      <section className="instruments-section">
        <div className="instruments-section__inner">
          <div className="section-header">
            <p className="section-eyebrow">॥ The Instruments ॥</p>
            <h2 className="section-title">Two Voices, <em>One Soul</em></h2>
            <div className="gold-divider" />
          </div>

          <div className="instruments-grid">
            <div className="instrument-card">
              <div className="instrument-card__icon">🥁</div>
              <h3 className="instrument-card__title">Tabla</h3>
              <p className="instrument-card__body">
                The tabla is the crown jewel of Indian classical percussion. Comprising two drums — the dayan and bayan — it produces a vast vocabulary of tones used in classical, semi-classical, and devotional music.
              </p>
              <ul className="instrument-card__list">
                <li>Hindustani Classical</li>
                <li>Devotional Music</li>
                <li>Fusion Performances</li>
                <li>Stage Concerts</li>
              </ul>
            </div>

            <div className="instrument-card instrument-card--alt">
              <div className="instrument-card__icon">🪘</div>
              <h3 className="instrument-card__title">Dholki</h3>
              <p className="instrument-card__body">
                The dholki is the celebratory heartbeat of Indian festivities. Its bold, joyful sound is essential at weddings, sangeet nights, and cultural events — bringing energy and tradition together.
              </p>
              <ul className="instrument-card__list">
                <li>Wedding Ceremonies</li>
                <li>Sangeet Nights</li>
                <li>New Year Events</li>
                <li>Cultural Festivals</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      <section className="cta-banner">
        <div className="cta-banner__inner">
          <p className="cta-banner__eyebrow">॥ Ready to Experience Live Rhythm? ॥</p>
          <h2 className="cta-banner__title">Book Sai Nikam for Your <em>Next Event</em></h2>
          <p className="cta-banner__sub">Weddings · Sangeet · New Year · Corporate Events · Cultural Shows</p>
          <button className="cta-banner__btn" onClick={() => onNavigate("Contact")}>
            <span>Get in Touch</span>
            <span className="cta-banner__arrow">→</span>
            <div className="cta-banner__shine" />
          </button>
        </div>
      </section>
    </div>
  );
}