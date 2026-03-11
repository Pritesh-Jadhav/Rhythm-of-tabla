import "./Footer.css";

export default function Footer({ setActive }) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-hindi">तबला</span>
            <div>
              <span className="footer__logo-title">Rhythm of Tabla</span>
              <span className="footer__logo-sub">
                Sai Nikam · Nashik, India
              </span>
            </div>
          </div>
          <p className="footer__tagline">
            Authentic tabla & dholki performances for weddings,
            <br />
            sangeet ceremonies, and cultural events across India.
          </p>
          <a href="mailto:sainikamtabla@gmail.com" className="footer__email">
            sainikam840@gmail.com
          </a>
        </div>

        <div className="footer__links">
          <h4 className="footer__links-title">Navigation</h4>
          {["Home", "About", "Contact"].map((page) => (
            <button
              key={page}
              className="footer__link"
              onClick={() => setActive(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="footer__links">
          <h4 className="footer__links-title">Services</h4>
          {[
            "Wedding Performances",
            "Sangeet Night",
            "New Year Events",
            "Cultural Programmes",
            "Studio Sessions",
          ].map((s) => (
            <span key={s} className="footer__link footer__link--static">
              {s}
            </span>
          ))}
        </div>

        <div className="footer__links">
          <h4 className="footer__links-title">Connect</h4>
          {[
            { label: "📸 Instagram", href: "https://www.instagram.com/sai_nikam_029/" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="footer__link"
            target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__hindi">॥ संगीत ही जीवन है ॥</span>
        <span className="footer__copy">
          © 2025 Rhythm of Tabla  Made by{" "}
          <a
            href="https://github.com/Pritesh-Jadhav"
            target="_blank"
            rel="noreferrer"
            style={{ color: "rgba(201,146,42,0.7)", textDecoration: "none" }}
          >
            @Pritesh
          </a>
        </span>
      </div>
    </footer>
  );
}
