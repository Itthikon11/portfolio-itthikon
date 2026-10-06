/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, events as createPointerEvents, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// Card size in world units — matches the CuboidCollider half-extents below.
const CARD_W = 1.6;
const CARD_H = 2.25;

// A press that moves less than this (px) and ends within CLICK_MS is a click, which flips the card.
const CLICK_PX = 6;
const CLICK_MS = 350;

const useCanvasTexture = canvas => {
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 16;
    return t;
  }, [canvas]);
  // textures are rebuilt on theme/language change; free the old one
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
};

/**
 * meshline marks the strap's two ends by giving them a neighbour equal to themselves, but its shader
 * compares that neighbour against a position that went through extra float math (`* aspect`), so the
 * test randomly fails and the end is squared off along the normalised rounding noise — the cut at the
 * ring flickered every frame. Extrapolated end neighbours make both code paths give the same answer.
 */
const fixLineEnds = geometry => {
  const pos = geometry.attributes.position.array;
  const prev = geometry.attributes.previous.array;
  const next = geometry.attributes.next.array;
  const n = pos.length;
  // each point is stored twice (one vertex per side of the ribbon), 6 floats per point
  for (let k = 0; k < 3; k++) {
    prev[k] = prev[k + 3] = 2 * pos[k] - pos[k + 6];
    next[n - 6 + k] = next[n - 3 + k] = 2 * pos[n - 6 + k] - pos[n - 12 + k];
  }
  geometry.attributes.previous.needsUpdate = true;
  geometry.attributes.next.needsUpdate = true;
};

/**
 * Adapted from React Bits' Lanyard: the card is built from primitives instead of card.glb,
 * and the faces/strap come from canvases (`frontCanvas`, `backCanvas`, `bandCanvas`).
 * The strap follows the joints' *rendered* (interpolated) positions rather than the raw physics
 * ones, so it no longer stutters against the smoothly drawn card on high-refresh screens.
 */
export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontCanvas,
  backCanvas,
  bandCanvas,
  holderColor = '#d9dade',
  metalColor = '#c9ccd2',
  anchorY = 4,
  anchorRef,
  eventSource,
  lanyardWidth = 1,
  active = true
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const wrapperRef = useRef(null);
  // Where the strap hangs from, as a fraction of the canvas — the top centre of `anchorRef`.
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    const wrap = wrapperRef.current;
    const el = anchorRef?.current;
    if (!wrap || !el) return;
    const measure = () => {
      const w = wrap.getBoundingClientRect();
      const a = el.getBoundingClientRect();
      if (!w.width || !w.height) return;
      const fx = (a.left + a.width / 2 - w.left) / w.width;
      const fy = (a.top - w.top) / w.height;
      setAnchor(prev => (prev && Math.abs(prev[0] - fx) < 0.005 && Math.abs(prev[1] - fy) < 0.005 ? prev : [fx, fy]));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [anchorRef]);

  // With an eventSource the canvas itself ignores the pointer (so content under it stays usable);
  // the pointer is mapped from client coordinates onto the canvas instead.
  const pointerEvents = useMemo(
    () =>
      eventSource
        ? store => ({
            ...createPointerEvents(store),
            compute(event, state) {
              const r = state.gl.domElement.getBoundingClientRect();
              state.pointer.set(((event.clientX - r.left) / r.width) * 2 - 1, -((event.clientY - r.top) / r.height) * 2 + 1);
              state.raycaster.setFromCamera(state.pointer, state.camera);
            }
          })
        : undefined,
    [eventSource]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={wrapperRef} className={`lanyard-wrapper${eventSource ? ' lanyard-wrapper--free' : ''}`}>
      <Canvas
        eventSource={eventSource}
        events={pointerEvents}
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        frameloop={active ? 'always' : 'never'}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} paused={!active}>
          {/* wait for the anchor so the strap isn't dropped once at the centre and then again */}
          {anchorRef && !anchor ? null : (
            <Band
              key={anchor ? anchor.join() : 'center'}
              anchor={anchor}
              isMobile={isMobile}
              frontCanvas={frontCanvas}
              backCanvas={backCanvas}
              bandCanvas={bandCanvas}
              holderColor={holderColor}
              metalColor={metalColor}
              anchorY={anchorY}
              lanyardWidth={lanyardWidth}
            />
          )}
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontCanvas,
  backCanvas,
  bandCanvas,
  holderColor,
  metalColor,
  anchorY,
  anchor,
  lanyardWidth = 1
}) {
  const viewport = useThree(s => s.viewport);
  const size = useThree(s => s.size);
  // anchorY is the strap height when anchored at the canvas top; lower anchors shift it down by their offset
  const origin = anchor
    ? [(anchor[0] - 0.5) * viewport.width, (0.5 - anchor[1]) * viewport.height + anchorY - viewport.height / 2, 0]
    : [0, anchorY, 0];
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  // markers inside each body: their world position is where the body is drawn this frame
  // (the strap's bottom end is pinned to the card's ring, not to j3: the card↔j3 joint is soft and
  // stretches on a fling, which made the strap end wobble around the ring)
  const fixedAt = useRef(),
    j1At = useRef(),
    j2At = useRef(),
    ringAt = useRef();
  const [drawn] = useState(() => ({
    fixed: new THREE.Vector3(),
    j1: new THREE.Vector3(),
    j2: new THREE.Vector3(),
    ring: new THREE.Vector3()
  }));
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const frontTex = useCanvasTexture(frontCanvas);
  const backTex = useCanvasTexture(backCanvas);
  const texture = useCanvasTexture(bandCanvas);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  // which face the card turns towards; read every frame, so a ref rather than state
  const flipped = useRef(false);
  const pressAt = useRef(null);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current && ringAt.current) {
      fixedAt.current.getWorldPosition(drawn.fixed);
      j1At.current.getWorldPosition(drawn.j1);
      j2At.current.getWorldPosition(drawn.j2);
      ringAt.current.getWorldPosition(drawn.ring);
      [
        [j1, drawn.j1],
        [j2, drawn.j2]
      ].forEach(([ref, target]) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(target);
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(target)));
        // capped at 1 so a long frame can't overshoot the target
        ref.current.lerped.lerp(target, Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))));
      });
      curve.points[0].copy(drawn.ring);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(drawn.fixed);
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      fixLineEnds(band.current.geometry);
      ang.copy(card.current.angvel());
      const q = card.current.rotation();
      // spring the card's turn about the strap towards the face it should show
      const yaw = 2 * Math.atan2(q.y, q.w);
      const err = THREE.MathUtils.euclideanModulo(yaw - (flipped.current ? Math.PI : 0) + Math.PI, Math.PI * 2) - Math.PI;
      card.current.setAngvel({ x: ang.x, y: ang.y - err * 0.125, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={origin}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed">
          <group ref={fixedAt} />
        </RigidBody>
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
          <group ref={j1At} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
          <group ref={j2At} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              const p = pressAt.current;
              if (p && performance.now() - p.t < CLICK_MS && Math.hypot(e.clientX - p.x, e.clientY - p.y) < CLICK_PX) {
                flipped.current = !flipped.current;
                card.current.wakeUp();
                // a kick to start the turn; the spring above settles it on the other face
                const a = card.current.angvel();
                card.current.setAngvel({ x: a.x, y: a.y + 9, z: a.z });
              }
              pressAt.current = null;
            }}
            onPointerDown={e => {
              e.target.setPointerCapture(e.pointerId);
              pressAt.current = { x: e.clientX, y: e.clientY, t: performance.now() };
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <RoundedBox args={[CARD_W - 0.02, CARD_H - 0.02, 0.03]} radius={0.07} smoothness={4}>
              <meshPhysicalMaterial color={holderColor} clearcoat={isMobile ? 0 : 0.4} roughness={0.6} envMapIntensity={0.25} />
            </RoundedBox>
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              {/* unlit + no tone mapping: the printed face shows its true colours instead of washing out */}
              <meshBasicMaterial map={frontTex} alphaTest={0.5} transparent toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, -0.017]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              {/* unlit + no tone mapping: the printed face shows its true colours instead of washing out */}
              <meshBasicMaterial map={backTex} alphaTest={0.5} transparent toneMapped={false} />
            </mesh>
            {/* clip + ring connecting the card to the strap */}
            <mesh position={[0, CARD_H / 2 + 0.08, 0]}>
              <boxGeometry args={[0.34, 0.14, 0.07]} />
              <meshStandardMaterial color={metalColor} metalness={1} roughness={0.3} />
            </mesh>
            <mesh position={[0, CARD_H / 2 + 0.3, 0]}>
              <torusGeometry args={[0.12, 0.03, 12, 32]} />
              <meshStandardMaterial color={metalColor} metalness={1} roughness={0.25} />
            </mesh>
            {/* where the strap ends — the card-side anchor of the j3 joint */}
            <group ref={ringAt} position={[0, 1.5, 0]} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          // the real canvas size keeps the strap's thickness tied to canvas height, not width
          resolution={[size.width, size.height]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
