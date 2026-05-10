import DevCard from "../components/DevCard/DevCard";
import ShimmerText from "../components/GlowText/GlowText";
import LiveType from "../components/LiveType/LiveType";
import FadeWords from "../components/FadeWords/FadeWords";

const HeroSection = () => (
  <div id="home" className="hero grid md:grid-cols-2 items-center pt-28 xl:gap-0 gap-10 grid-cols-1 min-h-screen">
    <div style={{ animation: 'heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s forwards', opacity: 0 }}>
      <div
        className="flex items-center gap-3 mb-8 w-fit p-3 px-4 rounded-2xl"
        style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', animation: 'heroFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s forwards', opacity: 0 }}
      >
        <q className="text-sm text-violet-700 font-medium">From logic to reality.</q>
      </div>

      <div className="text-5xl font-bold mb-6 leading-tight">
        <LiveType text="Hello, I'm Toriq Habil Fadhila" speed={55} delay={800} shineSpeed={3} cursor={true} />
      </div>

      <div className="flex flex-col gap-7">
        <FadeWords
          text="Turning ideas into modern web experiences through clean code, creative thinking, and user-focused design."
          stagger={60} animateBy="words" direction="top" duration={0.5} blurAmount={10}
          className="text-base text-gray-500 leading-relaxed"
        />
        <div className="flex items-center sm:gap-4 gap-3 flex-wrap">
          <a
            href="./assets/CV.pdf"
            download="Toriq_Habil_Fadhila_CV.pdf"
            className="font-semibold p-3.5 px-7 rounded-full transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.35)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Download CV
          </a>
          <a
            href="#project"
            className="font-semibold p-3.5 px-7 rounded-full transition-all duration-300"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)', color: '#7c3aed' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <ShimmerText text="Explore My Projects" disabled={false} speed={3} />
          </a>
        </div>
      </div>
    </div>

    <div
      className="md:ml-auto flex justify-center items-center w-full"
      style={{ maxWidth: '420px', margin: '0 auto', animation: 'heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s forwards', opacity: 0 }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <DevCard
          name="Toriq Habil Fadhila"
          title="Full-Stack Developer"
          handle="toriqhabil"
          status="Online"
          location="Malang, ID"
          contactText="Contact Me"
          avatarUrl="./assets/Toriq.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>
    </div>

    <style>{`
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(32px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

export default HeroSection;
