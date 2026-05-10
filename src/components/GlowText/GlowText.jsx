import './GlowText.css';

const GlowText = ({ text, disabled = false, speed = 3, className = '' }) => {
  return (
    <span className={`glow-text ${disabled ? 'disabled' : ''} ${className}`} style={{ "--shine-speed": `${speed}s` }}>
      {text}
    </span>
  );
};

export default GlowText;