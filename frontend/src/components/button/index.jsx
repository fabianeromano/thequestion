import styles from "../button/styles.module.css";

const Button = ({ onClick, children, theme, className, width, height, ...props }) => {
  return (
    <button
      onClick={onClick}
      style={{ width: `${width}`, height: `${height}` }}
      className={`${styles.container} ${theme === "primary" ? styles.primary : styles.secondary} ${
        className === "primary__medium" ? styles.primary__medium : ""
      }
      ${className === "primary__bigger" ? styles.primary__big : ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
