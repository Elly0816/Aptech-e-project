
import './Button.css'; // Ensures the styles are loaded for this component

const Button = ({ text, variant, onClick }) => {
  return (
    <button className={`custom-btn ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;