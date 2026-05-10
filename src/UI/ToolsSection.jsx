import GlowText from "../components/GlowText/GlowText";
import { listTools } from "../data";

const ToolsSection = () => (
  <div className="tools mt-32">
    <div className="flex items-end justify-between mb-14" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
      <div>
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-violet-600 uppercase">Stack</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight" style={{ color: '#1a1a2e' }}>
          Tools & <span style={{ color: '#7c3aed' }}>Technologies</span>
        </h2>
      </div>
      <p className="text-sm text-right hidden md:block max-w-50 leading-relaxed" style={{ color: '#9ca3af' }}>
        Technologies I use to build modern digital experiences
      </p>
    </div>

    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {listTools.map((tool) => (
        <div
          key={tool.id}
          data-aos="fade-up" data-aos-duration="600" data-aos-delay={tool.dad} data-aos-once="true"
          className="group relative flex items-center gap-4 p-4 rounded-2xl cursor-default overflow-hidden transition-all duration-300"
          style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(139,92,246,0.12)', backdropFilter: 'blur(10px)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          onMouseEnter={(e) => { e.currentTarget.style.border = '1px solid rgba(139,92,246,0.35)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(139,92,246,0.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.border = '1px solid rgba(139,92,246,0.12)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-8 rounded-r-full transition-all duration-300" style={{ background: '#7c3aed' }} />

          <div className="relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
            <img src={tool.gambar} alt={tool.nama} className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110" />
          </div>

          <div className="flex flex-col overflow-hidden min-w-0">
            <GlowText text={tool.nama} disabled={false} speed={3} className="text-sm font-semibold truncate block" />
            <p className="text-xs truncate transition-colors duration-300 mt-0.5" style={{ color: '#9ca3af' }}>
              {tool.ket}
            </p>
          </div>

          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full transition-colors duration-300" style={{ background: '#e5e7eb' }}
            ref={(el) => { if (el) { el.closest('.group')?.addEventListener('mouseenter', () => { el.style.background = '#7c3aed'; }); el.closest('.group')?.addEventListener('mouseleave', () => { el.style.background = '#e5e7eb'; }); } }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default ToolsSection;
