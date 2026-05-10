import { useState, useEffect } from "react";
import Logo from "../../public/assets/Logo.png";

const Navbar = ({ hidden = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (hidden) return;
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hidden]);

  useEffect(() => {
    if (hidden) return;
    const sections = ["home", "about", "project", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [hidden]);

  if (hidden) return null;

  const links = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#project", label: "Project", id: "project" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500"
      style={{
        height: scrolled ? "60px" : "80px",
        background: scrolled ? "rgba(248,247,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,0.15)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(139,92,246,0.08)" : "none",
      }}
    >
      <a href="#home" className="flex items-center gap-2 group">
        <div className="w-16 h-16 flex items-center justify-center">
          <img src={Logo} alt="TH.dev Logo" className="w-16 h-16 object-contain" style={{ filter: "invert(0.15) sepia(1) saturate(3) hue-rotate(240deg)" }} />
        </div>
      </a>

      <ul className="hidden md:flex items-center gap-1">
        {links.map(({ href, label, id }) => (
          <li key={id}>
            <a
              href={href}
              className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl"
              style={{ color: activeSection === id ? "#7c3aed" : "#6b7280" }}
            >
              {activeSection === id && (
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
                />
              )}
              <span className="relative">{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
        style={{ background: "rgba(109,40,217,0.1)", border: "1px solid rgba(139,92,246,0.3)", color: "#7c3aed" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(109,40,217,0.18)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(139,92,246,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(109,40,217,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Hire Me
      </a>

      <div className="flex md:hidden items-center gap-1.5">
        {links.map(({ id }) => (
          <a key={id} href={`#${id}`}>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: activeSection === id ? "16px" : "6px",
                height: "6px",
                background: activeSection === id ? "#7c3aed" : "#d1d5db",
              }}
            />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
