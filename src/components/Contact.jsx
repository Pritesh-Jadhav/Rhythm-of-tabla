import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm]   = useState({ name: "", email: "", phone: "", event: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  const set = (key) => (ev) => {
    setForm((f) => ({ ...f, [key]: ev.target.value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <div className="contact">
      
      <section className="contact-hero">
        <div className="contact-hero__bg" />
        <div className="contact-hero__inner">
          <p className="contact-hero__eyebrow">॥ Let's Create Together ॥</p>
          <h1 className="contact-hero__title">
            Book <em>Sai Nikam</em>
          </h1>
          <p className="contact-hero__sub">Tabla & Dholki Performer · Nashik</p>
          <div className="gold-divider" />
          <p className="contact-hero__desc">
            Looking for authentic Indian percussion for your wedding, sangeet, or event? Fill in the form below and Sai will get back to you within 24 hours.
          </p>
        </div>
      </section>

      
      <section className="contact-main">
        <div className="contact-main__inner">

         
          <div className="contact-info">
            <h2 className="contact-info__title">Get in Touch</h2>

            <div className="contact-details">
              {[
                { icon: "📧", label: "Email",    val: "sainikam840@gmail.com",  link: "https://mail.google.com/" },
                { icon: "📍", label: "Location", val: "Nashik, Maharashtra, India", link: null },
                { icon: "🎭", label: "Available For", val: "Weddings · Sangeet · Events · New Year", link: null },
                { icon: "⏰", label: "Response Time", val: "Within 24 hours", link: null },
              ].map(({ icon, label, val, link }) => (
                <div className="contact-detail" key={label}>
                  <span className="detail__icon">{icon}</span>
                  <div className="detail__text">
                    <span className="detail__label">{label}</span>
                    {link
                      ? <a className="detail__val detail__val--link" href={link}>{val}</a>
                      : <span className="detail__val">{val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              <p className="social__title">Follow Sai</p>
              <div className="social__links">
                {[
                  { icon: "📸", label: "Instagram", href: "https://www.instagram.com/sai_nikam_029/" },
                  
                ].map(({ icon, label, href }) => (
                  <a key={label} href={href} className="social__btn"
                  target="_blank" rel="noreferrer">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            
            <div className="contact-deco" aria-hidden="true">
              <div className="cdeco cdeco--1" />
              <div className="cdeco cdeco--2" />
              <div className="cdeco cdeco--3" />
              <span className="cdeco__center">॥</span>
            </div>
          </div>

          
          <div className="contact-form-wrap">
            {sent ? (
              <div className="form-success">
                <div className="success-ring">
                  <span className="success-icon">🥁</span>
                </div>
                <h3 className="success-title">Message Sent!</h3>
                <p className="success-body">
                  Thank you for reaching out! Sai will respond within 24 hours.
                </p>
                <p className="success-hindi">धन्यवाद · Dhanyavaad</p>
                <button className="btn-outline-gold" onClick={() => { setSent(false); setForm({ name:"",email:"",phone:"",event:"",message:"" }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="form-row">
                  <div className={`form-group ${errors.name ? "form-group--error" : ""}`}>
                    <label className="form-label">Full Name *</label>
                    <input
                      className="form-input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={set("name")}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className={`form-group ${errors.email ? "form-group--error" : ""}`}>
                    <label className="form-label">Email Address *</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Type</label>
                    <select className="form-input form-select" value={form.event} onChange={set("event")}>
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding Ceremony</option>
                      <option value="sangeet">Sangeet Night</option>
                      <option value="newyear">New Year Event</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="cultural">Cultural Programme</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className={`form-group ${errors.message ? "form-group--error" : ""}`}>
                  <label className="form-label">Your Message *</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Tell Sai about your event — date, venue, duration, and any special requirements..."
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button className="form-submit" type="submit">
                  <span className="submit-text">Send Booking Request</span>
                  <span className="submit-arrow">→</span>
                  <div className="submit-shine" />
                </button>

                <p className="form-note">
                  🔒 Your information is safe. Sai will respond within 24 hours at <a href="mailto:sainikamtabla@gmail.com">sainikamtabla@gmail.com</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      
      <section className="faq-strip">
        <div className="faq-strip__inner">
          {[
            { q: "How far in advance should I book?", a: "At least 2–4 weeks for smaller events. 1–2 months for weddings." },
            { q: "Do you travel outside Nashik?", a: "Yes! Sai performs across Maharashtra and beyond for the right events." },
            { q: "What equipment is needed?", a: "A clean, level performance area. Sound system can be arranged on request." },
          ].map(({ q, a }) => (
            <div className="faq-item" key={q}>
              <h4 className="faq-q">{q}</h4>
              <p className="faq-a">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}