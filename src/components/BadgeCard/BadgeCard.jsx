'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './BadgeCard.css';
;
const cardGLB = "./assets/card.glb";
const lanyard = "./assets/Lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({
  position = [0, 0, 18],
  gravity = [0, -40, 0],
  fov = 38,
  transparent = true
}) {
  return (
    <div className="badge-wrapper">
      <Canvas camera={{ position, fov, near: 0.1, far: 1000 }} gl={{ alpha: transparent, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }} onCreated={({ gl }) => { gl.setClearColor(new THREE.Color(0x141a38), transparent ? 0 : 1); gl.shadowMap.enabled = true; gl.shadowMap.type = THREE.PCFSoftShadowMap;}}>
        <hemisphereLight intensity={0.65} skyColor="#f3f4ff" groundColor="#1f2937" />
        <ambientLight intensity={1.1}/>
        <directionalLight position={[5, 12, 8]} intensity={3.6} color="#ffffff" castShadow/>
        <pointLight position={[-2, 3, 8]} intensity={3.0} color="#c084fc" />
        <pointLight position={[3, -1, 5]} intensity={2.2} color="#60a5fa" />
        <pointLight position={[0, 8, 18]} intensity={2.4} color="#ffffff" />
        <spotLight position={[0, 12, 6]} angle={0.32} penumbra={0.8} intensity={5.5} color="#e9d5ff" castShadow/>
        <spotLight position={[-6, 4, 8]} angle={0.4} penumbra={0.7} intensity={3.2} color="#93c5fd" />

        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band/>
        </Physics>

        <Environment blur={0.85}>
          <Lightformer intensity={1.5} color="#a78bfa" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]}/>
          <Lightformer intensity={2} color="#818cf8" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]}/>
          <Lightformer intensity={2} color="#c4b5fd" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]}/>
          <Lightformer intensity={6} color="#7c3aed" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]}/>
          <Lightformer intensity={4} color="#4f46e5" position={[10, 5, -5]} rotation={[0, -Math.PI / 2, 0]} scale={[50, 10, 1]}/>
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef();
  const fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const profileTexture = useTexture('./assets/Toriq.png');
  profileTexture.flipY = false;
  profileTexture.colorSpace = THREE.SRGBColorSpace;
  profileTexture.wrapS = profileTexture.wrapT = THREE.ClampToEdgeWrapping;
  profileTexture.repeat.set(1, 1);
  profileTexture.offset.set(0, 0);

  const [curve] = useState(() =>
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const cardMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: profileTexture,
      color: new THREE.Color('#eef2ff'),
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 3.5,
      emissive: new THREE.Color('#c4b5fd'),
      emissiveIntensity: 0.08,
      sheen: 0.7,
      sheenColor: new THREE.Color('#d8b4fe'),
    });
  }, [profileTexture]);

  const clipMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#c4b5fd'),
      roughness: 0.1,
      metalness: 1,
      clearcoat: 1,
      envMapIntensity: 3,
      emissive: new THREE.Color('#7c3aed'),
      emissiveIntensity: 0.4,
    });
  }, []);

  return (
    <>
      <group position={[0, 4, 0]}>
        <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
          <planeGeometry args={[8, 11]} />
          <meshStandardMaterial color="#4338ca" opacity={0.08} transparent side={THREE.DoubleSide} />
        </mesh>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group scale={4.5} position={[0, -1.1, -0.05]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))} onPointerDown={(e) => ( e.target.setPointerCapture(e.pointerId), drag( new THREE.Vector3() .copy(e.point) .sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry} castShadow receiveShadow>
              <primitive object={cardMaterial} attach="material" />
            </mesh>

            <mesh geometry={nodes.clip.geometry} castShadow>
              <primitive object={clipMaterial} attach="material" />
            </mesh>

            <mesh geometry={nodes.clamp.geometry} castShadow>
              <meshPhysicalMaterial color="#a78bfa" roughness={0.05} metalness={1.0} clearcoat={1} envMapIntensity={3} emissive="#6d28d9" emissiveIntensity={0.3}/>
            </mesh>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="#7c3aed" depthTest={false} resolution={isSmall ? [1000, 2000] : [1000, 1000]} useMap map={texture} repeat={[-3, 1]} lineWidth={1.2} opacity={0.95} transparent/>
      </mesh>
    </>
  );
}