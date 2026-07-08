import React from 'react'
import "./About.css"

const team = [
  { name: "Gerald Eberechukwu", role: "Managing Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
  { name: "David Ugwuna", role: "Sales Manager", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" },
  { name: "John Chimezie", role: "General Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" },
  { name: "Adeshino Grace", role: "Customer Service", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
  { name: "Ibrahim Calvin", role: "Sales Associate", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop" },
  { name: "Kingsley Udeh", role: "Content Manager", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=500&fit=crop" },
];

const posts = [
  {
    title: "New Trends In Digital Media",
    category: "Digital",
    date: "June 30, 2026",
    img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&h=350&fit=crop",
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

const clients = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

export default function About() {
  return (
    <>
      <div className="au-page">

        {/* Page heading */}
        
        <section className="au-intro">
          <h1 className="au-title">More About Company History</h1>
          <div className="au-intro-text">
            <p>
              Nulla porta nulla nec orci vulputate, id rutrum sapien varius. Class aptent
              taciti sociosqu ad litora torquent per conubia sed nostra, per inceptos
              himenaeos. Nulla facilisi. Integer vel felis cursus, varius arcu non,
              sollicitudin tortor. Vivamus porttitor libero id metus scelerisque
              pellentesque sit amet in est. Mauris accumsan porta ante, vel tincidunt
              quam auctor vitae. Maecenas suscipit risus neque, at dapibus dolor
              sollicitudin vitae. Maecenas a eros eget lorem iaculis ultricies.
            </p>
            <p>
              Suspendisse sodales magna ut gravida feugiat. Aenean gravida pellentesque
              lacinia. Suspendisse ullamcorper, volutpat iaculis pharetra, lacus sem
              gravida urna, eu pharetra enim felis condimentum enim. Cras eget quam
              mollis, ultrices dolor tincidunt, finibus mauris. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus. In
              ornare rhoncus metus ex, quis pretium neque tincidunt ut. Donec vestibulum
              congue sapien eu lacinia.
            </p>
          </div>
        </section>

        {/* Our Vision */}
        <section>
          <div className="au-feature">
            <div className="au-feature-img">
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&h=525&fit=crop" alt="Our vision" />
            </div>
            <div>
              <h3>Our Vision</h3>
              <p>
                Ne nemore aeterno dolores sit, sit ne consulatu dignissim, vix autem
                volumus id tacimates id. Ad quod ignota democritum his, quis probatus
                mel te. At sale sonet eam, ex eam nostrum recusabo pertinacia. Est ne
                propriae cotidieque, an vel solet malorum inermis, alii admodum.
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
                Ne nemore aeterno dolores sit, sit ne consulatu dignissim, vix autem
                volumus id tacimates id. Ad quod ignota democritum his, quis probatus
                mel te. At sale sonet eam, ex eam nostrum recusabo pertinacia. Est ne
                propriae cotidieque, an vel solet malorum inermis, alii admodum.
              </p>
            </div>
            <div className="au-feature-img">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=525&fit=crop" alt="What we do" />
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

        {/* Video */}
        <section>
          <div className="au-video">
            <a href="https://vimeo.com/323271717" target="_blank" rel="noopener noreferrer">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=514&fit=crop"
                alt="Company video"
              />
              <span className="au-play" />
            </a>
          </div>
        </section>

        {/* Multi-Vendor / Clients */}
        <section>
          <h2 className="au-title">Multi-Vendor</h2>
          <div className="au-clients">
            {clients.map((c, i) => (
              <div className="au-client" key={i}>Client {c}</div>
            ))}
          </div>
        </section>

        {/* Latest Blog Posts */}
        <section>
          <h2 className="au-title">Latest Blog Posts</h2>
          <div className="au-blog-grid">
            {posts.map((post) => (
              <article className="au-blog-card" key={post.title}>
                <img src={post.img} alt={post.title} />
                <p className="au-blog-meta">
                  {post.category}
                  <span>{post.date}</span>
                </p>
                <h4>{post.title}</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In augue
                  ligula, feugiat ut nulla case elitr.
                </p>
                <a className="au-read-more" href="#">Read More</a>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section>
          <div className="au-newsletter">
            <h3>Sign up to Newsletter</h3>
            <form className="au-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </div>

    </>
  )
}
