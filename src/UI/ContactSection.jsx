import GlowText from "../components/GlowText/GlowText";
import ChatRoom from "./ChatRoom";

const ContactSection = () => (
  <div id="contact" className="mt-32 pb-20">
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16" data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
      <div>
        <p className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: '#9ca3af' }}>
          — 04 / Contact
        </p>
        <h2 className="text-6xl lg:text-7xl font-black tracking-tighter leading-none" style={{ color: '#1a1a2e' }}>
          Let's<br />
          <span style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Work
          </span><br />
          Together.
        </h2>
      </div>

      <div className="flex flex-col gap-5 lg:items-end lg:text-right">
        <p className="text-sm max-w-xs leading-relaxed lg:text-right" style={{ color: '#9ca3af' }}>
          Available for freelance projects, collaborations, and full-time opportunities.
        </p>
        <div className="flex flex-col gap-2 lg:items-end">
          <a href="mailto:toriqqhabilf12@gmail.com" className="group inline-flex items-center gap-2 text-sm transition-colors duration-200" style={{ color: '#6b7280' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#7c3aed'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280'; }}
          >
            <span>toriqqhabilf12@gmail.com</span>
            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <div className="flex items-center gap-3 mt-1">
            {[
              { label: "GitHub", href: "https://github.com/ToriqHabilFadhila" },
              { label: "LinkedIn", href: "#" },
              { label: "Instagram", href: "https://www.instagram.com/rixxieysc_/" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="text-xs tracking-wide transition-colors duration-200" style={{ color: '#9ca3af' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#7c3aed'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ border: '1px solid rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.06)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-600 font-medium tracking-wide">Available for work</span>
        </div>
      </div>
    </div>

    <div className="h-px w-full mb-16" style={{ background: 'linear-gradient(to right, rgba(139,92,246,0.3), rgba(99,102,241,0.15), transparent)' }} data-aos="fade-right" data-aos-duration="1000" data-aos-once="true" />

    <div className="flex flex-col md:flex-row gap-6 items-stretch">
      {/* Live Chat */}
      <div
        className="flex-1 relative rounded-3xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(139,92,246,0.15)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 40px rgba(139,92,246,0.08)' }}
        data-aos="fade-up" data-aos-duration="800" data-aos-delay="100" data-aos-once="true"
      >
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)' }} />
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(139,92,246,0.08)' }}>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fca5a5' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fde68a' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#a7f3d0' }} />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#9ca3af' }}>Live Chat</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-600 tracking-wide">Online</span>
          </div>
        </div>
        <div className="p-5">
          <ChatRoom />
        </div>
      </div>

      {/* Contact Form */}
      <div
        className="flex-1 relative rounded-3xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(99,102,241,0.15)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 40px rgba(99,102,241,0.08)' }}
        data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" data-aos-once="true"
      >
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent)' }} />
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fca5a5' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fde68a' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#a7f3d0' }} />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#9ca3af' }}>new message</span>
          <div className="w-2.5" />
        </div>

        <form action="https://formsubmit.co/toriqqhabilf12@gmail.com" method="POST" autoComplete="off" className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Name', name: 'Name', type: 'text', placeholder: 'Enter your name' },
              { label: 'Email', name: 'Email', type: 'email', placeholder: 'Enter your email' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: '#9ca3af' }}>{label}</label>
                <input
                  type={type} name={name} placeholder={placeholder} required
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 outline-none"
                  style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)', color: '#1a1a2e' }}
                  onFocus={(e) => { e.target.style.border = '1px solid rgba(139,92,246,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'; }}
                  onBlur={(e) => { e.target.style.border = '1px solid rgba(139,92,246,0.15)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: '#9ca3af' }}>Message</label>
            <textarea
              name="message" id="message" rows={7} placeholder="Write your message here..." required
              className="w-full rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 outline-none resize-none"
              style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)', color: '#1a1a2e' }}
              onFocus={(e) => { e.target.style.border = '1px solid rgba(139,92,246,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)'; }}
              onBlur={(e) => { e.target.style.border = '1px solid rgba(139,92,246,0.15)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          <button
            type="submit"
            className="group relative w-full mt-1 py-3 rounded-xl overflow-hidden transition-all duration-300 font-semibold"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(124,58,237,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <span className="flex items-center justify-center gap-2">
              <GlowText text="Send Message" disabled={false} speed={3} className="text-sm font-semibold tracking-wide" />
              <svg className="w-3.5 h-3.5 stroke-white opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default ContactSection;
