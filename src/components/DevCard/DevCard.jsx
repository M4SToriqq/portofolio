import React, { useRef, useCallback } from "react";
import "./DevCard.css";

const ProfileCardBase = ({
  photoUrl = "./assets/Toriq.png",
  thumbUrl,
  fullName = "Toriq Habil Fadhila",
  role = "Full-Stack Developer",
  username = "jstxriqqz66",
  onlineStatus = "Online",
  city = "Malang",
  btnLabel = "Connect",
  showFooter = true,
  tiltEnabled = true,
  onBtnClick,
}) => {
  const panelRef = useRef(null);

  const onPointerMove = useCallback((e) => {
    const el = panelRef.current;
    if (!el || !tiltEnabled) return;

    const box = el.getBoundingClientRect();
    const px = e.clientX - box.left;
    const py = e.clientY - box.top;
    const midX = box.width / 2;
    const midY = box.height / 2;

    const pctX = (px / box.width) * 100;
    const pctY = (py / box.height) * 100;

    // Slightly more dramatic tilt — ±10 deg vs original ±8
    const tiltX = ((py - midY) / midY) * -10;
    const tiltY = ((px - midX) / midX) * 10;

    const radialDist = Math.min(
      Math.hypot(pctX - 50, pctY - 50) / 50, 1
    );

    el.style.transform =
      `perspective(860px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;

    el.style.setProperty("--pointer-x", `${px}px`);
    el.style.setProperty("--pointer-y", `${py}px`);
    el.style.setProperty("--background-x", `${30 + pctX * 0.4}%`);
    el.style.setProperty("--background-y", `${30 + pctY * 0.4}%`);
    el.style.setProperty("--pointer-from-center", `${radialDist}`);
    el.style.setProperty("--pointer-from-top", `${pctY / 100}`);
    el.style.setProperty("--pointer-from-left", `${pctX / 100}`);
    el.style.setProperty("--card-opacity", "1");
  }, [tiltEnabled]);

  const onPointerLeave = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    el.style.transform = "perspective(860px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1)";
    el.style.setProperty("--card-opacity", "0");
    setTimeout(() => { if (el) el.style.transition = ""; }, 650);
  }, []);

  const onPointerEnter = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    el.style.transition = "none";
  }, []);

  return (
    <div className="pc-wrap">
      <div
        ref={panelRef}
        className="pc-panel"
        onMouseMove={onPointerMove}
        onMouseLeave={onPointerLeave}
        onMouseEnter={onPointerEnter}
      >
        <div className="pc-inner" />
        <div className="pc-foil" />
        <div className="pc-glint" />

        <div className="pc-headline">
          <h3>{fullName}</h3>
          <p>{role}</p>
        </div>

        <div className="pc-badge">
          <span className="pc-beacon" />
          <span className="pc-badge-text">{onlineStatus}</span>
        </div>

        <div className="pc-photo-wrap">
          <img
            className="photo"
            src={photoUrl}
            alt={fullName}
            loading="lazy"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {showFooter && (
          <div className="pc-footer">
            <div className="pc-identity">
              <div className="pc-thumb">
                <img src={thumbUrl || photoUrl} alt={fullName} loading="lazy" />
              </div>
              <div className="pc-meta">
                <div className="pc-username">@{username}</div>
                <div className="pc-city">{city}</div>
              </div>
            </div>
            <button className="pc-btn" onClick={onBtnClick} type="button">
              {btnLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardBase);
export default ProfileCard;