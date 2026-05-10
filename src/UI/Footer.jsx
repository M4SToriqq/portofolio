import "remixicon/fonts/remixicon.css";
import Logo from "../../public/assets/Logo.png";

const Footer = () => {
  const socials = [
    { icon: "ri-github-fill", href: "https://github.com/M4SToriqq", label: "GitHub" },
    { icon: "ri-instagram-fill", href: "https://www.instagram.com/jstxriqqz66/", label: "Instagram" },
    { icon: "ri-tiktok-fill", href: "https://www.tiktok.com/@jstxriqqz66", label: "TikTok" },
  ];

  const navLinks = ["Home", "About", "Project", "Contact"];

  return (
    <footer className="mt-32 relative z-10">
      <div style={{ height: "1px", width: "100%", background: "linear-gradient(to right, transparent, rgba(13,148,136,0.3), transparent)", marginBottom: "3rem" }} />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 pb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-10">

          <div className="flex flex-col items-center md:items-start gap-3">
            <img src={Logo} alt="TH.dev Logo" className="w-16 h-16 object-contain" style={{ filter: "invert(0.15) sepia(1) saturate(3) hue-rotate(160deg)" }} />
            <p style={{ fontSize: "12px", color: "#9ca3af", maxWidth: "180px", lineHeight: 1.6 }}>
              Full-stack developer building modern digital experiences.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "999px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: "10px", color: "#059669", fontWeight: 500, letterSpacing: "0.06em" }}>Available for work</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <p style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.15em", color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" }}>
              Navigation
            </p>
            {navLinks.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#0d9488"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <p style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.15em", color: "#9ca3af", textTransform: "uppercase" }}>
              Socials
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
                  style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", textDecoration: "none", background: "rgba(13,148,136,0.05)", border: "1px solid rgba(13,148,136,0.12)", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#0d9488"; e.currentTarget.style.borderColor = "rgba(13,148,136,0.35)"; e.currentTarget.style.background = "rgba(13,148,136,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(13,148,136,0.12)"; e.currentTarget.style.background = "rgba(13,148,136,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <i className={`${icon} text-lg`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", paddingTop: "24px", borderTop: "1px solid rgba(13,148,136,0.1)" }}>
          <p style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "monospace" }}>
            {`© ${new Date().getFullYear()} Toriq Habil Fadhila. All rights reserved.`}
          </p>
          <p style={{ fontSize: "11px", color: "#9ca3af", fontFamily: "monospace" }}>
            Built with React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;