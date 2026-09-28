import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './DitherFlow.css';

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform float uPixel;
uniform float uScale;
uniform float uSpeed;
uniform float uLevels;
uniform vec3 uLight;
uniform vec3 uMid;
uniform vec3 uDark;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.03 + 17.1;
    a *= 0.5;
  }
  return v;
}

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 cell = floor(gl_FragCoord.xy / uPixel);
  vec2 p = (cell * uPixel) / iResolution.y * uScale;
  float t = iTime * uSpeed;

  // Domain-warped fbm gives the smoky, marbled flow.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t * 0.7));
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.6), fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.4));
  float v = fbm(p + 3.8 * r);

  float shade = smoothstep(0.36, 0.8, v);
  vec3 col = mix(uLight, uMid, shade);
  col = mix(col, uDark, smoothstep(0.78, 0.98, v + 0.2 * length(q - 0.5)));
  // Thin bright seams where the warp folds.
  col = mix(col, uLight, smoothstep(0.02, 0.0, abs(r.x - 0.55)) * 0.8);

  float levels = max(uLevels - 1.0, 1.0);
  float threshold = bayer8(cell) - 0.5;
  col = floor(col * levels + threshold + 0.5) / levels;

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

const ctxMap = new WeakMap();

const DitherFlow = ({
  lightColor = '#ffffff',
  midColor = '#9c9aac',
  darkColor = '#2b2470',
  pixelSize = 2,
  scale = 1.4,
  speed = 0.05,
  levels = 4,
  className = ''
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ webgl: 2, antialias: false, dpr: 1 });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uPixel: { value: 2 },
        uScale: { value: 2.2 },
        uSpeed: { value: 0.05 },
        uLevels: { value: 4 },
        uLight: { value: new Float32Array([1, 1, 1]) },
        uMid: { value: new Float32Array([0.6, 0.6, 0.6]) },
        uDark: { value: new Float32Array([0.2, 0.2, 0.4]) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctxMap.set(container, { program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      const res = program.uniforms.iResolution.value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = t => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? tryStart() : tryStop();
    });
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      ctxMap.delete(container);
      try {
        container.removeChild(canvas);
      } catch {}
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  useEffect(() => {
    const ctx = ctxMap.get(containerRef.current);
    if (!ctx) return;
    const u = ctx.program.uniforms;
    u.uPixel.value = pixelSize;
    u.uScale.value = scale;
    u.uSpeed.value = speed;
    u.uLevels.value = levels;
    u.uLight.value.set(hexToRgb(lightColor));
    u.uMid.value.set(hexToRgb(midColor));
    u.uDark.value.set(hexToRgb(darkColor));
  }, [lightColor, midColor, darkColor, pixelSize, scale, speed, levels]);

  return <div ref={containerRef} className={`dither-flow-container ${className}`.trim()} />;
};

export default DitherFlow;
