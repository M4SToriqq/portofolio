import "./IconStack.css";

const gradientMapping = {
  violet:  "linear-gradient(145deg, #6d28d9, #4c1d95)",
  indigo:  "linear-gradient(145deg, #4f46e5, #3730a3)",
  blue:    "linear-gradient(145deg, #2563eb, #1d4ed8)",
  cyan:    "linear-gradient(145deg, #0891b2, #0e7490)",
  emerald: "linear-gradient(145deg, #059669, #047857)",
  rose:    "linear-gradient(145deg, #e11d48, #be123c)",
  amber:   "linear-gradient(145deg, #d97706, #b45309)",
  pink:    "linear-gradient(145deg, #db2777, #9d174d)",
};

const IconStack = ({ items = [], className = "" }) => {
  const getBg = (color) =>
    gradientMapping[color] ?? color ?? gradientMapping.violet;

  return (
    <div className={`gi-grid ${className}`}>
      {items.map((item, i) => (
        <button key={i} className={`gi-btn ${item.customClass || ""}`} aria-label={item.label} type="button" onClick={item.onClick}>
          <span className="gi-glow" style={{ background: getBg(item.color) }} />
          <span className="gi-back" style={{ background: getBg(item.color) }} />
          <span className="gi-front">
            <span className="gi-icon" aria-hidden="true">{item.icon}</span>
          </span>
          <span className="gi-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default IconStack;