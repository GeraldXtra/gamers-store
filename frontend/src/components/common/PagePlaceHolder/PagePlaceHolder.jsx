import "./PagePlaceholder.css";

const PagePlaceholder = ({ title }) => (
  <div className="page-placeholder">
    <h1 className="page-placeholder-title">{title}</h1>
    <p className="page-placeholder-text">
      This page hasn't been built yet — coming soon.
    </p>
  </div>
);

export default PagePlaceholder;
