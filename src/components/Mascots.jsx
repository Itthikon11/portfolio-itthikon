import { useEffect, useRef, useState } from 'react';
import './Mascots.css';

// Eye positions are fractions of the blob's width (its top is a semicircle, so width is the natural unit).
const BLOBS = [
  {
    key: 'green',
    eyes: [
      { x: 0.26, y: 0.44, r: 0.15 },
      { x: 0.58, y: 0.37, r: 0.17 }
    ]
  },
  {
    key: 'purple',
    eyes: [
      { x: 0.21, y: 0.44, r: 0.14 },
      { x: 0.5, y: 0.41, r: 0.16 }
    ]
  }
];

function Blob({ blob, onPoke, jumping }) {
  return (
    <button
      type="button"
      className={`blob blob--${blob.key}${jumping ? ' is-jumping' : ''}`}
      onClick={onPoke}
      aria-label="Poke"
    >
      <span className="blob__body">
        {blob.eyes.map((eye, i) => (
          <span
            key={i}
            className="eye"
            style={{
              '--x': eye.x,
              '--y': eye.y,
              '--r': eye.r
            }}
          >
            <span className="pupil" />
          </span>
        ))}
      </span>
    </button>
  );
}

export default function Mascots() {
  const rootRef = useRef(null);
  const [jumping, setJumping] = useState({});

  useEffect(() => {
    const root = rootRef.current;
    const mouse = { x: window.innerWidth * 0.4, y: window.innerHeight * 0.5 };
    const onMove = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const eyes = [...root.querySelectorAll('.eye')].map(el => ({ el, pupil: el.firstChild, x: 0, y: 0 }));
    let raf = 0;
    const tick = () => {
      for (const eye of eyes) {
        const rect = eye.el.getBoundingClientRect();
        const dx = mouse.x - (rect.left + rect.width / 2);
        const dy = mouse.y - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        // pupils drift toward the edge of the eye, easing in when the cursor is very close
        const reach = rect.width * 0.27 * Math.min(1, dist / 120);
        eye.x += ((dx / dist) * reach - eye.x) * 0.18;
        eye.y += ((dy / dist) * reach - eye.y) * 0.18;
        eye.pupil.style.transform = `translate(${eye.x.toFixed(2)}px, ${eye.y.toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  // Poking one makes it jump; the other one hops a moment later.
  const poke = key => {
    const other = key === 'green' ? 'purple' : 'green';
    setJumping(j => ({ ...j, [key]: true }));
    setTimeout(() => setJumping(j => ({ ...j, [other]: true })), 180);
    setTimeout(() => setJumping(j => ({ ...j, [key]: false })), 700);
    setTimeout(() => setJumping(j => ({ ...j, [other]: false })), 880);
  };

  return (
    <div className="mascots" ref={rootRef}>
      {BLOBS.map(blob => (
        <Blob key={blob.key} blob={blob} jumping={jumping[blob.key]} onPoke={() => poke(blob.key)} />
      ))}
    </div>
  );
}
