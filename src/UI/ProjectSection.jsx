import { listProyek } from "../data";

const ProjectSection = () => (
  <div id="project" className="mt-32">
    <div className="relative flex flex-col items-center mb-16" data-aos="fade-up" data-aos-duration="800" data-aos-once="true">
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[120px] font-black select-none pointer-events-none leading-none tracking-tighter" style={{ color: 'rgba(13,148,136,0.05)' }}>
        WORK
      </span>

      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#0d9488' }}>Selected Work</span>
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
      </div>

      <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-center mb-4" style={{ color: '#0c1f1c' }}>
        My <span style={{ color: '#0d9488' }}>Projects</span>
      </h2>

      <div className="flex items-center gap-4 w-full max-w-sm">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(13,148,136,0.4))' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: '#0d9488' }} />
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(13,148,136,0.4))' }} />
      </div>

      <p className="text-base text-center mt-5 max-w-lg leading-relaxed" style={{ color: '#9ca3af' }} data-aos="fade-up" data-aos-duration="800" data-aos-delay="150" data-aos-once="true">
        A selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.
      </p>

      <div className="flex items-center gap-8 mt-8" data-aos="fade-up" data-aos-duration="800" data-aos-delay="250" data-aos-once="true">
        {[
          { num: listProyek.length, label: 'Total Projects' },
          { num: '100%', label: 'Open Source' },
          { num: '3+', label: 'Years Building' },
        ].map(({ num, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-xl font-bold" style={{ color: '#0c1f1c' }}>{num}</span>
            <span className="text-xs tracking-wide" style={{ color: '#9ca3af' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listProyek.map((project, index) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 hover:scale-105 transform" style={{ borderColor: project.borderColor, background: project.gradient ? `linear-gradient(145deg, ${project.borderColor}20, rgba(255,255,255,0.9))` : 'white' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">Project {String(index + 1).padStart(2, '0')}</span>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0d9488' }} className="transition-colors hover:opacity-70">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0c1f1c' }}>{project.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{project.subtitle}</p>
            <p className="text-gray-700 leading-relaxed text-sm">{project.fullDescription}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectSection;