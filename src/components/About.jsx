import { useState } from "react";
import "./About.css";

const PERFORMANCES = [
  {
    id: 1,
    type: "New Year",
    icon: "🎆",
    title: "New Year Celebration 2024",
    venue: "Nashik",
    desc: "Electrifying tabla and dholki performance ringing in the New Year with classical rhythm. The crowd was enthralled by the high-energy percussion set.",
    tag: "NEW YEAR",
    color: "#e8a020",
  },
  {
    id: 2,
    type: "New Year",
    icon: "🎇",
    title: "New Year Gala Night",
    venue: "Nashik",
    desc: "A vibrant fusion of classical and contemporary beats to welcome the new year. Dholki rhythms kept the celebration alive all night.",
    tag: "NEW YEAR",
    color: "#e8a020",
  },
  {
    id: 3,
    type: "Wedding",
    icon: "💍",
    title: "Wedding Ceremony Performance",
    venue: "Nashik",
    desc: "Traditional tabla compositions blended with festive dholki beats for a beautiful wedding ceremony. The performance complemented every sacred ritual perfectly.",
    tag: "WEDDING",
    color: "#d4880a",
  },
  {
    id: 4,
    type: "Wedding",
    icon: "🌸",
    title: "Grand Wedding Celebration",
    venue: "Nashik",
    desc: "A mesmerising live performance featuring classical taal compositions that elevated the wedding atmosphere to a truly memorable experience.",
    tag: "WEDDING",
    color: "#d4880a",
  },
  {
    id: 5,
    type: "Sangeet",
    icon: "🎶",
    title: "Sangeet Night Extravaganza",
    venue: "Nashik",
    desc: "Pulsating dholki rhythms and energetic tabla beats transformed this sangeet ceremony into an unforgettable night of music and dance.",
    tag: "SANGEET",
    color: "#c9922a",
  },
  {
    id: 6,
    type: "Sangeet",
    icon: "🪷",
    title: "Pre-Wedding Sangeet Soirée",
    venue: "Nashik",
    desc: "Traditional sangeet celebration featuring non-stop dholki and tabla, filling the venue with joy, rhythm, and pure Hindustani spirit.",
    tag: "SANGEET",
    color: "#c9922a",
  },
  {
    id: 7,
    type: "Sangeet",
    icon: "✨",
    title: "Cultural Sangeet Programme",
    venue: "Nashik",
    desc: "A beautifully curated sangeet programme showcasing classical tabla compositions alongside vibrant dholki beats for a diverse and captivated audience.",
    tag: "SANGEET",
    color: "#c9922a",
  },
];

const FILTERS = ["All", "New Year", "Wedding", "Sangeet"];

export default function About() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? PERFORMANCES
    : PERFORMANCES.filter((p) => p.type === filter);

  return (
    <div className="about">
      
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">॥ The Artist ॥</p>
          <h1 className="about-hero__title">
            Sai <em>Nikam</em>
          </h1>
          <p className="about-hero__sub">Tabla & Dholki Performer · Nashik, India</p>
          <div className="gold-divider" />
          <p className="about-hero__bio">
            Sai Nikam is a passionate tabla and dholki performer based in Nashik, India. With a deep reverence for Indian classical music and a natural flair for rhythm, Sai brings authenticity and energy to every performance — from intimate wedding ceremonies to vibrant New Year celebrations.
          </p>
        </div>
      </section>

      
      <section className="artist-info">
        <div className="artist-info__inner">
          {[
            { icon: "🥁", title: "Instruments", val: "Tabla & Dholki" },
            { icon: "📍", title: "Based In",    val: "Nashik, India" },
            { icon: "🎭", title: "Performances", val: "7+ Live Shows" },
            { icon: "🎵", title: "Speciality",  val: "Classical & Folk" },
          ].map(({ icon, title, val }) => (
            <div className="info-card" key={title}>
              <span className="info-card__icon">{icon}</span>
              <span className="info-card__label">{title}</span>
              <span className="info-card__val">{val}</span>
            </div>
          ))}
        </div>
      </section>

      
      <section className="performances">
        <div className="performances__inner">
          <div className="section-header">
            <p className="section-eyebrow">॥ Live Performances ॥</p>
            <h2 className="section-title">7 Performances, <em>One Passion</em></h2>
            <div className="gold-divider" />
          </div>

          
          <div className="perf-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`perf-filter ${filter === f ? "perf-filter--active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
                {filter === f && <span className="filter-dot" />}
              </button>
            ))}
          </div>

          
          <div className="perf-grid">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="perf-card"
                style={{ "--card-color": p.color, animationDelay: `${i * 0.08}s` }}
              >
                <div className="perf-card__top">
                  <span className="perf-card__icon">{p.icon}</span>
                  <span className="perf-card__tag" style={{ color: p.color, borderColor: p.color }}>
                    {p.tag}
                  </span>
                </div>
                <h3 className="perf-card__title">{p.title}</h3>
                <p className="perf-card__venue">📍 {p.venue}</p>
                <p className="perf-card__desc">{p.desc}</p>
                <div className="perf-card__bar" style={{ background: p.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="artist-quote">
        <div className="artist-quote__inner">
          <div className="quote-ornament">॥</div>
          <blockquote className="quote-text">
            "Music is the shorthand of emotion. Every beat of the tabla is a word, every composition a story — told through rhythm, felt through the soul."
          </blockquote>
          <p className="quote-attr">— Sai Nikam</p>
        </div>
      </section>
    </div>
  );
}