import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./../../components/common/Button/Button";
import "./TermsAndConditions.css";

const websiteUseItems = [
  {
    icon: "bi-pc-display-horizontal",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum totam aperiam quo maiores similique adipisci sunt praesentium iusto nemo eius. Recusandae illo sint unde ullam ea explicabo esse nesciunt odit?",
  },
  {
    icon: "bi-controller",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum totam aperiam quo maiores similique adipisci sunt praesentium iusto nemo eius. Recusandae illo sint unde ullam ea explicabo esse nesciunt odit?",
  },
  {
    icon: "bi-smartwatch",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum totam aperiam quo maiores similique adipisci sunt praesentium iusto nemo eius. Recusandae illo sint unde ullam ea explicabo esse nesciunt odit?",
  },
  {
    icon: "bi-headphones",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum totam aperiam quo maiores similique adipisci sunt praesentium iusto nemo eius. Recusandae illo sint unde ullam ea explicabo esse nesciunt odit?",
  },
];

const TermsAndCondition = () => {
  const [formValues, setFormValues] = useState({
    message: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to a real contact-form endpoint once the backend exists
    console.log("Contact form submitted:", formValues);
  };

  return (
    <section className="terms-page">
      <div className="terms-container">
        <nav className="terms-breadcrumb" aria-label="breadcrumb">
          <NavLink to="/" end>
            Home
          </NavLink>
          <span className="terms-breadcrumb-sep">|</span>
          <span className="terms-breadcrumb-current">Terms & Conditions</span>
        </nav>

        <h1 className="terms-title">Terms & Conditions</h1>

        <div className="terms-row">
          <h2 className="terms-row-label">Purchases Terms and Conditions</h2>
          <div className="terms-row-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto veritatis corrupti voluptatibus, sapiente culpa
              perspiciatis fugit ipsa provident at quod deserunt ratione? Omnis
              facilis laborum dicta ipsam cumque animi quaerat!
            </p>
          </div>
        </div>

        <div className="terms-row">
          <h2 className="terms-row-label">Website Terms of Use</h2>
          <div className="terms-row-content">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              fuga sunt amet animi! Officiis dolores illo neque libero sunt vel
              quidem autem, unde fugit quod saepe, vitae eos, quaerat
              reprehenderit.
            </p>

            <ul className="terms-icon-list">
              {websiteUseItems.map((item, index) => (
                <li key={index}>
                  <i className={`bi ${item.icon}`}></i>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="terms-row">
          <h2 className="terms-row-label">Intellectual Propertly</h2>
          <div className="terms-row-content">
            <ul className="terms-bullet-list">
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repellat aperiam tempore ea voluptatem quos, eveniet pariatur
                accusamus minus voluptates corrupti consectetur natus quisquam
                quas itaque odio eos molestiae architecto placeat.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam magnam in odio amet ducimus possimus illo incidunt
                doloribus, totam asperiores iure quae praesentium voluptatum,
                quaerat quam repellendus, maiores eius magni.
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
                rerum at tempore, atque suscipit odit cumque autem culpa
                sapiente vero non nam iusto? Earum alias, mollitia ipsam iste
                non nulla.
              </li>
            </ul>
          </div>
        </div>

        <div className="terms-row">
          <h2 className="terms-row-label">Termination</h2>
          <div className="terms-row-content">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Asperiores maiores similique fugit, culpa dicta alias nobis dolor
              enim eveniet pariatur vitae. Nihil praesentium qui quam illo
              voluptatem facere odio placeat.
            </p>
          </div>
        </div>

        <div className="terms-row terms-contact">
          <div className="terms-contact-intro">
            <h2 className="terms-contact-title">Contact Us</h2>
            <p className="terms-contact-subtitle">
              If you have any questions about this Agreement, please contact us
              filling this contact form
            </p>
          </div>

          <form className="terms-contact-form" onSubmit={handleSubmit}>
            <textarea
              name="message"
              placeholder="Messages"
              rows={6}
              value={formValues.message}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formValues.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your eMail *"
              value={formValues.email}
              onChange={handleChange}
              required
            />

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TermsAndCondition;
