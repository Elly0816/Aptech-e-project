import './Button.css'; // Ensures the styles are loaded for this component

const Button = ({ text, variant, onClick, style, className }) => {
  return (
    <button
      style={{ ...style }}
      className={`custom-btn ${variant ? variant : ''} ${className ? className : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
