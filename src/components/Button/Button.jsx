import './Button.css'; // Ensures the styles are loaded for this component

const Button = ({ text, variant, onClick, style }) => {
  return (
    <button style={style} className={`custom-btn ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
