import { useRef, useCallback } from "react";
import "./ProjectGrid.css";

const ProjectGrid = ({ items, onItemClick, className = "" }) => {
  const data = items?.length ? items : [];
  const cardRefs = useRef([]);

  const handleMouseMove = useCallback((e, i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;

    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.setProperty("--border-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback((i) => {
    const card = cardRefs.current[i];
    if (!card) return;
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    card.style.setProperty("--border-opacity", "0");
  }, []);

  return (
    <div className={`pg-grid ${className}`}>
      {data.map((c, i) => (
        <article key={i} ref={(el) => (cardRefs.current[i] = el)} className="pg-card" onMouseMove={(e) => handleMouseMove(e, i)} onMouseLeave={() => handleMouseLeave(i)} onClick={() => onItemClick?.(c)}>
          <div className="pg-card-border" />
          <span className="pg-num">{String(i + 1).padStart(2, "0")}</span>

          <div className="pg-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy"/>
            <div className="pg-img-overlay"/>
            {c.handle && (
              <div className="pg-tags">
                {c.handle.split(" · ").map((tag, ti) => (
                  <span key={ti} className="pg-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="pg-info">
            <div className="pg-info-row">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="pg-name">{c.title}</h3>
                <p className="pg-role">{c.subtitle}</p>
              </div>
              <div className="pg-arrow">
                <svg viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProjectGrid;