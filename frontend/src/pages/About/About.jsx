import React from "react";
import "./About.css";

const team = [
  {
    name: "Gerald Eberechukwu",
    role: "Managing Director",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
  },
  {
    name: "David Ugwuna",
    role: "Sales Manager",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
  },
  {
    name: "John Chimezie",
    role: "General Manager",
    img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=500&fit=crop",
  },
  {
    name: "Gloria Adesiyan",
    role: "Customer Service",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
  },
  {
    name: "Calvin Ogunsola",
    role: "Sales Associate",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
  },
  {
    name: "Kingsley Udeh",
    role: "Content Manager",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  },
];

const posts = [
  {
    title: "New Trends In Digital Media",
    category: "Digital",
    date: "June 30, 2026",
    img: null,
  },
  {
    title: "The Best Games For PC",
    category: "Digital",
    date: "June 30, 2026",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop",
  },
  {
    title: "Check Out Our New App!",
    category: "Digital",
    date: "June 30, 2026",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=350&fit=crop",
  },
];

const clients = [
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
  { img: null },
];

export default function About() {
  return (
    <>
      <div className="au-page">
        {/* Video */}
        <section>
          <div className="au-video">
            <video
              src="vid"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="downloadJPEG"
            />

            <div className="au-video-overlay">
              <h1>Gamers Store</h1>
              <p>Built by passionate developers. Inspired by gamers.</p>
            </div>
          </div>
        </section>

        {/* Page heading */}

        <section className="au-intro">
          <h1 className="au-title">More About Company History</h1>
          <div className="au-intro-text">
            <p>
              <strong>Gamers Store</strong> is a web development project created
              by students of
              <strong>
                {" "}
                Aptech Computer Education, Ajao Estate, Lagos, Nigeria.
              </strong>
              The project was developed as part of our practical training to
              demonstrate our understanding of modern web technologies,
              responsive design, and user-centered development.
            </p>
            <p>
              Working as a team allowed us to combine creativity, programming,
              and problem-solving skills to build a modern e-commerce platform
              for gaming products. Throughout the project, we applied
              technologies such as React, JavaScript, HTML, and CSS while
              following good software development practices. This project
              represents our commitment to learning, teamwork, and continuous
              improvement as aspiring software developers.
            </p>{" "}
            <br />
            <div className="au-info">
              <p>
                <strong>Developed by:</strong> Students of Aptech Computer
                Education, Ajao Estate, Lagos, Nigeria.
              </p>

              <p>
                <strong>Course:</strong> Software Engineering / Web Development
                Group Project.
              </p>

              <p>
                <strong>Year:</strong> 2026.
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section>
          <div className="au-feature">
            <div className="au-feature-img">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&h=525&fit=crop"
                alt="Our vision"
              />
            </div>
            <div>
              <h3>Our Vision</h3>
              <p>
                Our vision is to build digital solutions that are modern,
                accessible, and user-friendly while continuously improving our
                technical skills. Through innovation, teamwork, and creativity,
                we aim to prepare ourselves for real-world software development
                and contribute meaningful solutions to the technology industry.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section>
          <div className="au-feature reverse">
            <div>
              <h3>What We Do</h3>
              <p>
                We design and develop responsive web applications using modern
                frontend technologies. Our focus is on creating clean user
                interfaces, writing maintainable code, and delivering smooth
                user experiences. This project allowed us to practice
                component-based development, state management, responsive
                layouts, and collaborative software engineering.
              </p>
            </div>
            <div className="au-feature-img">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=525&fit=crop"
                alt="What we do"
              />
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section>
          <h2 className="au-title">Our Team</h2>
          <div className="au-team-grid">
            {team.map((member) => (
              <div className="au-team-card" key={member.name}>
                <img src={member.img} alt={member.name} />
                <p className="au-team-role">{member.role}</p>
                <p className="au-team-name">{member.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Multi-Vendor / Clients */}
        <section>
          <h2 className="au-title">Multi-Vendor</h2>
          <div className="au-clients">
            {clients.map((c, i) => (
              <div className="au-client" key={i}>
                <img src={c.img} alt={`Client ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
