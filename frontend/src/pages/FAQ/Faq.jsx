import React, { useState } from "react";
import "./Faq.css";

// const NAV_LINKS = ["Home", "Shop", "Blog", "FAQ"];

const FAQ_ITEMS = [
    {
        q: "History of the Company",
        a: "Gamers-Store started as a single storefront focused on well-made everyday tech. Two decades later we ship worldwide, but we still test every product ourselves before it goes on sale.",
    },
    {
        q: "Cooperate with Us!",
        a: "We work with independent makers, boutique brands, and larger manufacturers. If you'd like to stock your products with us, reach out through the contact page with a short brand overview.",
    },
    {
        q: "How can I order",
        a: "Add any item to your cart, then follow the checkout steps. You'll need a shipping address and a payment method — no account required, though creating one lets you track orders.",
    },
    {
        q: "Why should I buy online",
        a: "Our online catalog carries more stock than any single store, prices update in real time, and every order ships with tracking and our standard return window.",
    },
    {
        q: "Is VAT charged",
        a: "VAT is calculated automatically at checkout based on your shipping destination and shown as a separate line before you confirm payment.",
    },
    {
        q: "Can I pay with invoice",
        a: "Business customers can request invoice payment terms. Contact our support team with your company details before placing the order to get this set up.",
    },
    {
        q: "Can I cancel my order",
        a: "Orders can be cancelled free of charge as long as they haven't shipped yet. Once a tracking number is issued, you'll need to use our standard returns process instead.",
    },
    {
        q: "Do I have to order online",
        a: "Not at all — you're welcome to visit one of our stores in person. Use the store locator to find the nearest location and check current stock before you go.",
    },
    {
        q: "Can I return a product",
        a: "Yes, most products can be returned within 30 days in their original condition and packaging. A few categories, like opened earbuds, have shorter windows for hygiene reasons.",
    },
    {
        q: "How do I create an account",
        a: "Click 'My Account' in the header and choose 'Register'. You'll only need an email address and password — order history and saved addresses follow automatically.",
    },
    {
        q: "Security",
        a: "All payments are processed over an encrypted connection and we never store full card numbers on our servers. Two-factor login is available from your account settings.",
    },
    {
        q: "Can I track my order",
        a: "Yes — once your order ships you'll receive a tracking link by email, and the same tracking status is always visible from your account's order history.",
    },
    {
        q: "Shipping time",
        a: "Standard shipping typically takes 3–5 business days domestically and 7–14 days internationally, depending on customs processing at the destination.",
    },
    {
        q: "Shipping cost",
        a: "Shipping is free on orders over $100. Below that threshold, cost is calculated by weight and destination and shown before you check out.",
    },
    {
        q: "Fastest Delivery",
        a: "Express shipping is available at checkout for most in-stock items, typically arriving within 1–2 business days domestically.",
    },
    {
        q: "Customer Care",
        a: "Our support team is available by phone, email, or live chat during store hours, and we aim to reply to every message within one business day.",
    },
];

const CATEGORIES = [
    "Business",
    "Creative",
    "Development",
    "Digital",
    "Electronics",
    "Technology",
    "Trends",
    "Web",
];

const TAGS = [
    "Branding",
    "Design",
    "Funding",
    "Gadget",
    "Innovation",
    "Marketing",
    "New",
    "Style",
    "Success",
    "Sustainable",
    "Viral",
];


export default function FaqPage() {
    const [openQuestion, setOpenQuestion] = useState(FAQ_ITEMS[0].q);
    const [question, setQuestion] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [search, setSearch] = useState("");

    const toggle = (q) => setOpenQuestion((cur) => (cur === q ? null : q));

    const handleField = (e) => {
        const { name, value } = e.target;
        setQuestion((prev) => ({ ...prev, [name]: value }));
    };

    const handleAsk = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 2000);
        setQuestion({ name: "", email: "", message: "" });
    };

    const filteredFaqs = FAQ_ITEMS.filter((item) =>
        item.q.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="faq-page">

                {/* Breadcrumb / Hero */}
                <section className="faq-hero">
                    <p className="faq-breadcrumb">
                        <a href="#top">Home</a>
                        <span aria-hidden="true">/</span>
                        <span>FAQ Page</span>
                    </p>
                    <h1 className="faq-hero__title">FAQ Page</h1>
                    <p className="faq-hero__lede">
                        Answers to the questions we hear most, from ordering and shipping to
                        returns and account security.
                    </p>
                </section>

                {/* Main content: accordion + sidebar */}
                <section className="faq-faq-layout">
                    <div className="faq-faq-main">
                        <div className="faq-faq-search">
                            <input
                                type="text"
                                placeholder="Search a question..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                aria-label="Search FAQs"
                            />
                        </div>

                        <div className="faq-accordion">
                            {filteredFaqs.length === 0 && (
                                <p className="faq-faq-empty">
                                    No questions match "{search}"
                                    <br />
                                    <br />
                                    <strong>Email your question below ⬇️</strong>
                                </p>
                            )}

                            {filteredFaqs.map((item) => {
                                const isOpen = openQuestion === item.q;

                                return (
                                    <div
                                        key={item.q}
                                        className={`faq-accordion__item ${isOpen ? "is-open" : ""}`}
                                    >
                                        <button
                                            className="faq-accordion__trigger"
                                            onClick={() => toggle(item.q)}
                                            aria-expanded={isOpen}
                                        >
                                            <span>{item.q}</span>

                                            <span
                                                className="faq-accordion__icon"
                                                aria-hidden="true"
                                            />
                                        </button>

                                        <div
                                            className="faq-accordion__panel"
                                            style={{
                                                maxHeight: isOpen ? "300px" : "0px",
                                            }}
                                            aria-hidden={!isOpen}
                                        >
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Ask a question */}
                        <div className="faq-ask">
                            <h2>Ask us a question</h2>
                            <p className="faq-ask__note">
                                Your email address will not be published. Required fields are marked *
                            </p>
                            <form className="faq-form" onSubmit={handleAsk}>
                                <div className="faq-form__row">
                                    <div className="faq-field">
                                        <label htmlFor="qname">Name </label>
                                        <input
                                            id="qname"
                                            name="name"
                                            type="text"
                                            value={question.name}
                                            onChange={handleField}
                                        />
                                    </div>
                                    <div className="faq-field">
                                        <label htmlFor="qemail">Email *</label>
                                        <input
                                            id="qemail"
                                            name="email"
                                            type="email"
                                            value={question.email}
                                            onChange={handleField}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="faq-field">
                                    <label htmlFor="qmessage">Your question *</label>
                                    <textarea
                                        id="qmessage"
                                        name="message"
                                        type="text"
                                        rows={5}
                                        value={question.message}
                                        onChange={handleField}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={sent}
                                    className={`faq-submit ${sent ? "sent" : ""}`}
                                >
                                    {sent ? "Question sent ✓" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="faq-sidebar">
                        <div className="faq-sidebar__block">
                            <h4>Categories</h4>
                            <ul className="faq-sidebar__list">
                                {CATEGORIES.map((c) => (
                                    <li key={c}>
                                        <a href="#top">{c}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="faq-sidebar__block">
                            <h4>Visit our store</h4>
                            <div className="faq-map">
                                <iframe
                                    title="Gamers_store location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.798802840943!2d3.3295544735043796!3d6.5470701228920705!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d06d0a7e193%3A0x41dd48795939a26a!2sAptech%20Ajao%20Estate%20Center!5e0!3m2!1sen!2sng!4v1783849657177!5m2!1sen!2sng"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <p className="faq-map__address">Gamers Store, Lagos, Nigeria</p>
                        </div>

                        <div className="faq-sidebar__block">
                            <h4>Tags</h4>
                            <div className="faq-tags">
                                {TAGS.map((t) => (
                                    <a href="#top" className="faq-tag" key={t}>
                                        {t}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </section>




            </div>
        </>
    );
}
