import React, { useRef, useCallback } from "react";
import "./DevCard.css";

const DevCardComponent = ({
  avatarUrl = "",
  miniAvatarUrl,
  name = "Toriq Habil F",
  title = "Full-Stack Developer",
  handle = "toriqhabil",
  status = "Online",
  location = "Malang",
  contactText = "Contact Me",
  showUserInfo = true,
  enableTilt = true,
  onContactClick,
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card || !enableTilt) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    const fromCenter = Math.min(
      Math.hypot(percentY - 50, percentX - 50) / 50, 1
    );

    card.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    card.style.setProperty("--pointer-x", `${x}px`);
    card.style.setProperty("--pointer-y", `${y}px`);
    card.style.setProperty("--background-x", `${35 + percentX * 0.3}%`);
    card.style.setProperty("--background-y", `${35 + percentY * 0.3}%`);
    card.style.setProperty("--pointer-from-center", `${fromCenter}`);
    card.style.setProperty("--pointer-from-top", `${percentY / 100}`);
    card.style.setProperty("--pointer-from-left", `${percentX / 100}`);
    card.style.setProperty("--card-opacity", "1");
  }, [enableTilt]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    card.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    card.style.setProperty("--card-opacity", "0");
    setTimeout(() => {
      if (card) card.style.transition = "";
    }, 600);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "none";
  }, []);

  return (
    <div className="dc-card-wrapper">
      <div ref={cardRef} className="dc-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <div className="dc-inside" />
        <div className="dc-shine" />
        <div className="dc-glare" />

        <div className="dc-header">
          <h3>{name}</h3>
          <p>{title}</p>
        </div>

        <div className="dc-status-badge">
          <span className="dc-status-dot" />
          <span className="dc-status-text">{status}</span>
        </div>

        <div className="dc-avatar-wrap">
          <img className="avatar" src={avatarUrl} alt={name} loading="lazy" onError={(e) => { e.target.style.display = "none"; }}/>
        </div>

        {showUserInfo && (
          <div className="dc-user-info">
            <div className="dc-user-details">
              <div className="dc-mini-avatar">
                <img src={miniAvatarUrl || avatarUrl} alt={name} loading="lazy" />
              </div>
              <div className="dc-user-text">
                <div className="dc-handle">@{handle}</div>
                <div className="dc-status">{location}</div>
              </div>
            </div>
            <button className="dc-contact-btn" onClick={onContactClick} type="button">
              {contactText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DevCard = React.memo(DevCardComponent);
export default DevCard;