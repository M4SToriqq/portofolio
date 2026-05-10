import { useEffect } from "react";
import AmbientBg from "./components/AmbientBg/AmbientBg";
import Navbar from "./UI/Navbar";
import Footer from "./UI/Footer";
import HeroSection from "./UI/HeroSection";
import AboutSection from "./UI/AboutSection";
import ToolsSection from "./UI/ToolsSection";
import ProjectSection from "./UI/ProjectSection";
import ContactSection from "./UI/ContactSection";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ once: true, duration: 600 });
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          background:
            "linear-gradient(135deg, #f8f7ff 0%, #ede9fe 40%, #f0f4ff 70%, #faf5ff 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99,102,241,0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(167,139,250,0.06) 0%, transparent 70%)",
          }}
        />

        <AmbientBg
          colorStops={["#c4b5fd", "#a78bfa", "#818cf8"]}
          blend={0.18}
          amplitude={0.3}
          speed={0.15}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <ToolsSection />
        <ProjectSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;