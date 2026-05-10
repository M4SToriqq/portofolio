import React, { useState, useEffect, useCallback } from 'react';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

const WorkModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setImgLoaded(false);
    }, 350);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>
        {`
          @keyframes wmOverlayIn  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes wmOverlayOut { from { opacity: 1; } to { opacity: 0; } }
          @keyframes wmBoxIn {
            from { transform: translateY(24px) scale(0.97); opacity: 0; }
            to   { transform: translateY(0) scale(1); opacity: 1; }
          }
          @keyframes wmBoxOut {
            from { transform: translateY(0) scale(1); opacity: 1; }
            to   { transform: translateY(16px) scale(0.97); opacity: 0; }
          }
          .wm-overlay {
            animation: ${isClosing ? 'wmOverlayOut' : 'wmOverlayIn'} 0.35s ease forwards;
          }
          .wm-box {
            animation: ${isClosing ? 'wmBoxOut' : 'wmBoxIn'} 0.35s cubic-bezier(0.22,1,0.36,1) forwards;
          }
          .wm-skeleton {
            background: linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%);
            background-size: 200% 100%;
            animation: wmShimmer 1.5s infinite;
          }
          @keyframes wmShimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>

      <div className="wm-overlay fixed inset-0 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }} onClick={handleClose}>
        <div className="wm-box w-full sm:max-w-lg" style={{ background: '#0c0c0f', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '24px', boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.08)', overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto', }} onClick={(e) => e.stopPropagation()}>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)' }} />
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#111118' }}>
            {!imgLoaded && (
              <div className="wm-skeleton" style={{ position: 'absolute', inset: 0 }} />
            )}
            <img src={project.image} alt={project.title} onLoad={() => setImgLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s ease', }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(12,12,15,0.8) 100%)', pointerEvents: 'none', }}/>
            <button onClick={handleClose} style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(12,12,15,0.8)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#a1a1aa', transition: 'all 0.2s ease', }} onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
              <FiX size={15} />
            </button>
          </div>

          <div style={{ padding: '20px 24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(139,92,246,0.5)' }} />
              <span style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.12em', color: '#52525b', textTransform: 'uppercase' }}>
                Project Details
              </span>
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f3f4f6', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '10px' }}>
              {project.title}
            </h2>

            <p style={{ fontSize: '14px', color: '#71717a', lineHeight: 1.75, marginBottom: '24px' }}>
              {project.fullDescription}
            </p>

            <div style={{ height: '1px', background: 'rgba(139,92,246,0.08)', marginBottom: '20px' }}/>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px 16px', borderRadius: '14px', background: 'rgba(109,40,217,0.2)', border: '1px solid rgba(139,92,246,0.35)', color: '#c4b5fd', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s ease', }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(109,40,217,0.35)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(109,40,217,0.2)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)'; }}>
                <FiGithub size={15} />
                Source Code
              </a>

              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '11px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa', fontSize: '13px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s ease', }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#a1a1aa'; }}>
                  <FiExternalLink size={15} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkModal;