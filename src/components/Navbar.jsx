import { useState, useEffect } from "react";
import "./Navbar.css";

const navLinks = ["Home", "About", "Contact"];

export default function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page) => {
    setActive(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <button className="navbar__logo" onClick={() => handleNav("Home")}>
            <span className="logo__hindi">तबला</span>
            <div className="logo__text">
              <span className="logo__title">Rhythm of Tabla</span>
              <span className="logo__sub">Sai Nikam · Nashik</span>
            </div>
          </button>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  className={`navbar__link ${active === link ? "navbar__link--active" : ""}`}
                  onClick={() => handleNav(link)}
                >
                  {link}
                  <span className="link__bar" />
                </button>
              </li>
            ))}
          </ul>

          {/* Book Now CTA */}
          <button className="navbar__cta" onClick={() => handleNav("Contact")}>
            <span>Book Now</span>
            <span className="cta__arrow">→</span>
            <div className="cta__shimmer" />
          </button>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        {navLinks.map((link) => (
          <button
            key={link}
            className={`mobile-menu__link ${active === link ? "mobile-menu__link--active" : ""}`}
            onClick={() => handleNav(link)}
          >
            <span className="mobile__num">0{navLinks.indexOf(link) + 1}</span>
            {link}
          </button>
        ))}
        <button className="mobile-menu__cta" onClick={() => handleNav("Contact")}>
          Book Now →
        </button>
      </div>
    </>
  );
}