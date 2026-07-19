import React, { useState } from "react";
import "./ContactUs.css";


const FEATURES = [
  {
    key: "vision",
    label: "Our Vision",
    copy:
      "We believe great technology should feel effortless. Every product we curate is chosen for how it fits into a real life, not just a spec sheet.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
        <path
          d="M24 4V11M24 37V44M44 24H37M11 24H4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "do",
    label: "What We Do",
    copy:
      "From sourcing to support, we handle the details so you can focus on the parts that matter — unboxing, plugging in, and getting on with it.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="10" width="34" height="22" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M17 39H31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 32V39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 20L21 26L28 18L34 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "history",
    label: "Company History",
    copy:
      "Started as a single storefront, now shipping worldwide. Two decades in, we still test every gizmo ourselves before it reaches you.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 8a16 16 0 1 1-11.3 4.7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M8 6V14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 16V24L30 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <div className="cu-page">
        {/* Hero */}
        <section className="cu-hero">
          <p className="cu-breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>Contact Us</span>
          </p>
          <h1 className="cu-hero__title">Get in touch with us</h1>
          <p className="cu-hero__lede">
            Have a question about an order, a product, or just want to say hello? Our team
            reads every message and typically replies within one business day.
          </p>
          <p className="cu-hero__sub">
            Prefer to talk it through? Give us a call or drop by the store — we're always
            happy to help you find the right gadget for the job.
          </p>
        </section>

        {/* MAP */}
        <section className="cu-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.798802840943!2d3.3295544735043796!3d6.5470701228920705!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d06d0a7e193%3A0x41dd48795939a26a!2sAptech%20Ajao%20Estate%20Center!5e0!3m2!1sen!2sng!4v1783849657177!5m2!1sen!2sng"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Aptech Ajao Estate Location"
          ></iframe>
        </section>

        {/* Contact grid: form + details */}
        <section className="cu-contact">
          <form className="cu-form" onSubmit={handleSubmit}>
            <div className="cu-form__row">
              <div className="cu-field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John David"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="cu-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Gamer@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="cu-field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="cu-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us how we can help..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="cu-submit">
              {submitted ? "Message sent ✓" : "Submit"}
            </button>
          </form>

          <aside className="cu-info">
            <div className="cu-info__item">
              <span className="cu-info__label">Call us</span>
              <a href="tel:+2347120103256" className="cu-info__value">
                +2347120103256
              </a>
            </div>

            <div className="cu-info__item">
              <span className="cu-info__label">Email us</span>
              <a href="mailto:sonofplele@gmail.com" className="cu-info__value">
                sonofplele@gmail.com
              </a>
            </div>

            <div className="cu-info__item">
              <span className="cu-info__label">Visit us</span>
              <a
                href="https://maps.app.goo.gl/XBvDRfV3xZx4tLBW6"
                target="_blank"
                rel="noreferrer"
                className="cu-info__value"
              >
                <strong> @Gamers-Store.ng </strong>
              </a>
            </div>

            <div className="cu-info__item">
              <span className="cu-info__label">Store hours</span>
              <p className="cu-info__value cu-info__value--static">
                Monday to Friday: 9am – 9pm
                <br />
                Saturday to Sunday: 9am – 10pm
              </p>
            </div>
          </aside>
        </section>

        {/* Feature boxes */}
        <section className="cu-features">
          {FEATURES.map((f) => (
            <div className="cu-feature" key={f.key}>
              <div className="cu-feature__icon">{f.icon}</div>
              <h3 className="cu-feature__title">{f.label}</h3>
              <p className="cu-feature__copy">{f.copy}</p>
            </div>
          ))}
        </section>



      </div>
    </>
  );
}
