import { Link } from "react-router-dom";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  type = "button",
  icon,
  hoverIcon,
  className = "",
}) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`;

  const renderIcon = () => {
    if (hoverIcon) {
      return (
        <span className="btn-icon-wrap">
          <i className={`bi ${icon} btn-icon btn-icon-default`}></i>
          <i className={`bi ${hoverIcon} btn-icon btn-icon-hover`}></i>
        </span>
      );
    }
    if (icon) {
      return <i className={`bi ${icon} btn-icon-static`}></i>;
    }
    return null;
  };

  const content = (
    <>
      {children}
      {renderIcon()}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
