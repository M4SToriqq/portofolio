'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './BadgeCard.css';

const MODEL_PATH = './assets/card.glb';
const STRAP_TEX = './assets/Lanyard.png';
const PROFILE_TEX = './assets/Toriq.png';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function BadgeCard({
  camPos = [0, 0, 18],
  pullForce = [0, -40, 0],
  fieldOfView = 38,
  clearBg = true,
}) {
  return (
    <div className="badge-shell">
      <Canvas
        camera={{ position: camPos, fov: fieldOfView, near: 0.1, far: 1000 }}
        gl={{
          alpha: clearBg,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x0d1117), clearBg ? 0 : 1);
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* Ambient fill */}
        <hemisphereLight intensity={0.55} skyColor="#e0f2fe" groundColor="#1e293b" />
        <ambientLight intensity={0.9} />

        {/* Key light — warm gold */}
        <directionalLight position={[6, 14, 9]} intensity={3.2} color="#fde68a" castShadow />

        {/* Accent fills */}
        <pointLight position={[-3, 4, 7]} intensity={2.8} color="#34d399" />
        <pointLight position={[4, -2, 6]} intensity={2.0} color="#38bdf8" />
        <pointLight position={[0, 9, 16]} intensity={2.2} color="#f0fdf4" />

        {/* Spots */}
        <spotLight position={[0, 13, 7]} angle={0.30} penumbra={0.75} intensity={5.0} color="#d1fae5" castShadow />
        <spotLight position={[-5, 5, 9]} angle={0.38} penumbra={0.65} intensity={3.0} color="#7dd3fc" />

        <Physics gravity={pullForce} timeStep={1 / 60}>
          <Tether />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer intensity={1.4} color="#6ee7b7" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={1.8} color="#22d3ee" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={1.8} color="#a7f3d0" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={5.5} color="#059669" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          <Lightformer intensity={3.5} color="#0284c7" position={[10, 5, -5]} rotation={[0, -Math.PI / 2, 0]} scale={[50, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

// ─── Physics rope + card ──────────────────────────────────────────────────────

function Tether({ topSpeed = 50, bottomSpeed = 0 }) {
  const cordRef = useRef();
  const anchor = useRef();
  const seg0 = useRef();
  const seg1 = useRef();
  const seg2 = useRef();
  const cardBody = useRef();

  const tmpVec = new THREE.Vector3();
  const tmpAng = new THREE.Vector3();
  const tmpRot = new THREE.Vector3();
  const tmpDir = new THREE.Vector3();

  const jointConfig = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes } = useGLTF(MODEL_PATH);
  const strapTex = useTexture(STRAP_TEX);
  const faceTex = useTexture(PROFILE_TEX);

  faceTex.flipY = false;
  faceTex.colorSpace = THREE.SRGBColorSpace;
  faceTex.wrapS = faceTex.wrapT = THREE.ClampToEdgeWrapping;
  faceTex.repeat.set(1, 1);
  faceTex.offset.set(0, 0);

  const [path] = useState(() =>
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
  );

  const [grabbed, setGrabbed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  );

  // Rope joints
  useRopeJoint(anchor, seg0, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(seg0, seg1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(seg1, seg2, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(seg2, cardBody, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovering) {
      document.body.style.cursor = grabbed ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovering, grabbed]);

  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useFrame((state, delta) => {
    if (grabbed) {
      tmpVec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      tmpDir.copy(tmpVec).sub(state.camera.position).normalize();
      tmpVec.add(tmpDir.multiplyScalar(state.camera.position.length()));
      [cardBody, seg0, seg1, seg2, anchor].forEach((r) => r.current?.wakeUp());
      cardBody.current?.setNextKinematicTranslation({
        x: tmpVec.x - grabbed.x,
        y: tmpVec.y - grabbed.y,
        z: tmpVec.z - grabbed.z,
      });
    }

    if (anchor.current) {
      [seg0, seg1].forEach((r) => {
        if (!r.current.lerped)
          r.current.lerped = new THREE.Vector3().copy(r.current.translation());
        const dist = Math.max(0.1, Math.min(1, r.current.lerped.distanceTo(r.current.translation())));
        r.current.lerped.lerp(
          r.current.translation(),
          delta * (bottomSpeed + dist * (topSpeed - bottomSpeed))
        );
      });

      path.points[0].copy(seg2.current.translation());
      path.points[1].copy(seg1.current.lerped);
      path.points[2].copy(seg0.current.lerped);
      path.points[3].copy(anchor.current.translation());
      cordRef.current.geometry.setPoints(path.getPoints(32));

      tmpAng.copy(cardBody.current.angvel());
      tmpRot.copy(cardBody.current.rotation());
      cardBody.current.setAngvel({ x: tmpAng.x, y: tmpAng.y - tmpRot.y * 0.25, z: tmpAng.z });
    }
  });

  path.curveType = 'chordal';
  strapTex.wrapS = strapTex.wrapT = THREE.RepeatWrapping;

  // Card face — teal-tinted physical material
  const faceMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: faceTex,
    color: new THREE.Color('#ecfdf5'),
    roughness: 0.08,
    metalness: 0.92,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    envMapIntensity: 3.2,
    emissive: new THREE.Color('#6ee7b7'),
    emissiveIntensity: 0.07,
    sheen: 0.65,
    sheenColor: new THREE.Color('#a7f3d0'),
  }), [faceTex]);

  // Clip — gold metallic
  const clipMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#fcd34d'),
    roughness: 0.08,
    metalness: 1,
    clearcoat: 1,
    envMapIntensity: 3.2,
    emissive: new THREE.Color('#d97706'),
    emissiveIntensity: 0.35,
  }), []);

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Ghost backdrop plane */}
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[8, 11]} />
          <meshStandardMaterial color="#0d9488" opacity={0.06} transparent side={THREE.DoubleSide} />
        </mesh>

        <RigidBody ref={anchor} {...jointConfig} type="fixed" />

        <RigidBody position={[0.5, 0, 0]} ref={seg0} {...jointConfig}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1, 0, 0]} ref={seg1} {...jointConfig}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody position={[1.5, 0, 0]} ref={seg2} {...jointConfig}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={cardBody}
          {...jointConfig}
          type={grabbed ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />

          <group
            scale={4.5}
            position={[0, -1.1, -0.05]}
            onPointerOver={() => setHovering(true)}
            onPointerOut={() => setHovering(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              setGrabbed(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              setGrabbed(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(tmpVec.copy(cardBody.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry} castShadow receiveShadow>
              <primitive object={faceMat} attach="material" />
            </mesh>

            <mesh geometry={nodes.clip.geometry} castShadow>
              <primitive object={clipMat} attach="material" />
            </mesh>

            <mesh geometry={nodes.clamp.geometry} castShadow>
              <meshPhysicalMaterial
                color="#34d399"
                roughness={0.04}
                metalness={1.0}
                clearcoat={1}
                envMapIntensity={3.2}
                emissive="#065f46"
                emissiveIntensity={0.28}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* Cord mesh */}
      <mesh ref={cordRef}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#0d9488"
          depthTest={false}
          resolution={compact ? [1000, 2000] : [1000, 1000]}
          useMap
          map={strapTex}
          repeat={[-3, 1]}
          lineWidth={1.2}
          opacity={0.92}
          transparent
        />
      </mesh>
    </>
  );
}