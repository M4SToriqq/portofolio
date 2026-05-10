import FadeWords from "../components/FadeWords/FadeWords";
import ShimmerText from "../components/GlowText/GlowText";

const AboutSection = () => (
  <div id="about" className="mt-24 mx-auto w-full max-w-350 relative" data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
    <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)' }} />
    <div className="absolute -bottom-16 right-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />

    <div className="relative rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(13,148,136,0.2)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(13,148,136,0.1), 0 4px 20px rgba(0,0,0,0.05)' }}>
      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(13,148,136,0.5), transparent)' }} />

      <div className="flex flex-col items-start gap-0 p-10 lg:p-14">
        <div className="w-full" style={{ borderColor: 'rgba(13,148,136,0.15)' }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#0d9488' }}>Who I Am</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight leading-tight" style={{ color: '#0c1f1c' }}>
            About <span style={{ color: '#0d9488' }}>Me</span>
          </h2>

          <FadeWords
            text="I'm Toriq Habil Fadhila, a full-stack web developer who enjoys turning ideas into fast, modern, and user-friendly applications. I like working with technologies such as Artificial Intelligence, Machine Learning, and cloud platforms to build solutions that are both functional and scalable."
            stagger={90} animateBy="words" direction="bottom" duration={0.6} blurAmount={12}
            className="text-base lg:text-lg leading-relaxed mb-10 block"
            style={{ color: '#6b7280' }}
          />

          <div className="grid grid-cols-3 mb-10" style={{ borderTop: '1px solid rgba(13,148,136,0.1)', borderBottom: '1px solid rgba(13,148,136,0.1)' }}>
            {[
              { num: "3", label: "Projects Finished" },
              { num: "3", label: "Years Experience" },
              { num: "10", label: "Technologies" },
            ].map(({ num, label }, i) => (
              <div
                key={i}
                className={`flex flex-col py-5 px-2 ${i === 0 ? "items-start" : i === 1 ? "items-center" : "items-end"}`}
                style={{ borderRight: i < 2 ? '1px solid rgba(13,148,136,0.1)' : 'none' }}
                data-aos="fade-up" data-aos-delay={i * 100} data-aos-once="true"
              >
                <span className="text-3xl lg:text-4xl font-bold tracking-tight leading-none" style={{ color: '#0c1f1c' }}>
                  {num}<span style={{ color: '#0d9488' }}>+</span>
                </span>
                <span className="text-xs mt-1.5 tracking-wide" style={{ color: '#9ca3af' }}>{label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { title: 'What I build', items: ['Modern web apps', 'Interactive portfolios', 'Responsive UI/UX'] },
              { title: 'My strengths', items: ['Fast performance', 'Clean code', 'End-to-end development'] },
              { title: 'Favorite tools', items: ['React', 'Vite', 'Tailwind CSS'] },
            ].map(({ title, items }, index) => (
              <div key={index} className="rounded-3xl bg-white/80 p-5 shadow-sm backdrop-blur-sm" style={{ border: '1px solid rgba(13,148,136,0.2)' }} data-aos="fade-up" data-aos-delay={120 + index * 80} data-aos-once="true">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: '#0d9488' }}>{title}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pl-4" style={{ borderLeft: '2px solid rgba(13,148,136,0.4)', borderRadius: 0 }}>
            <ShimmerText text="Where creativity meets clean and scalable code." disabled={false} speed={3} className="text-sm lg:text-base italic" />
          </div>
        </div>
      </div>

      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(13,148,136,0.3), transparent)' }} />
    </div>
  </div>
);

export default AboutSection;