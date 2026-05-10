import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./AmbientBg.css";

// Vertex shader — simple full-screen triangle pass-through
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Fragment shader — plasma wave with custom gradient ramp
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uWaveScale;
uniform vec3 uPalette[3];
uniform vec2 uViewport;
uniform float uSoftness;

out vec4 fragColor;

// Hash-based gradient noise (replaces simplex)
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gradientNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // quintic

  float a = dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));
  float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Three-stop linear gradient along X axis
vec3 paletteRamp(float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.5) {
    return mix(uPalette[0], uPalette[1], t * 2.0);
  } else {
    return mix(uPalette[1], uPalette[2], (t - 0.5) * 2.0);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / uViewport;

  // Plasma layers — different freq/phase per layer
  float wave0 = gradientNoise(vec2(uv.x * 2.2 + uTime * 0.05, uTime * 0.14)) * 0.55 * uWaveScale;
  float wave1 = gradientNoise(vec2(uv.x * 4.1 - uTime * 0.09, uTime * 0.28)) * 0.28 * uWaveScale;
  float wave2 = gradientNoise(vec2(uv.x * 8.3 + uTime * 0.19, uTime * 0.47)) * 0.11 * uWaveScale;

  // Fold waves through an exponential to get a soft ridge
  float ridge = exp(wave0 + wave1 + wave2);
  float horizon = uv.y * 2.0 - ridge + 0.18;
  float lum = 0.60 * horizon;

  // Smooth edge falloff controlled by uSoftness
  float cutoff = 0.20;
  float alpha = smoothstep(
    cutoff - uSoftness * 0.50,
    cutoff + uSoftness * 0.50,
    lum
  );

  // Horizontal color ramp
  vec3 col = paletteRamp(uv.x);

  // Y-depth tint — cool shadows at bottom, warm glow at top
  vec3 shadowTint = uPalette[0] * 0.35;
  vec3 highlightTint = uPalette[2] * 0.18;
  col += mix(shadowTint, highlightTint, uv.y) * alpha * 0.25;

  // Radial vignette centred slightly above middle
  float vig = 1.0 - smoothstep(0.25, 1.05,
    length((uv - vec2(0.5, 0.28)) * vec2(1.15, 1.75))
  );
  col   *= 0.82 + 0.18 * vig;
  alpha *= 0.88 + 0.12 * vig;

  // Pre-multiply alpha before output
  fragColor = vec4(col * lum * alpha, alpha);
}
`;

export default function AmbientBg({
  palette    = ["#0f172a", "#6366f1", "#0ea5e9"],
  waveScale  = 1.15,
  softness   = 0.50,
  speed      = 1.0,
}) {
  const liveProps = useRef({ palette, waveScale, softness, speed });
  liveProps.current = { palette, waveScale, softness, speed };

  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";

    const hexToFloats = (hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    };

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const program = new Program(gl, {
      vertex:   VERT,
      fragment: FRAG,
      uniforms: {
        uTime:      { value: 0 },
        uWaveScale: { value: waveScale },
        uPalette:   { value: palette.map(hexToFloats) },
        uViewport:  { value: [container.offsetWidth, container.offsetHeight] },
        uSoftness:  { value: softness },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uViewport.value = [container.offsetWidth, container.offsetHeight];
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    let raf;
    const tick = (ms) => {
      raf = requestAnimationFrame(tick);
      const p = liveProps.current;
      program.uniforms.uTime.value      = ms * 0.001 * (p.speed ?? 1.0);
      program.uniforms.uWaveScale.value = p.waveScale ?? 1.15;
      program.uniforms.uSoftness.value  = p.softness  ?? 0.50;
      program.uniforms.uPalette.value   = (p.palette ?? palette).map(hexToFloats);
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      if (container && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className="ambient-bg" />;
}