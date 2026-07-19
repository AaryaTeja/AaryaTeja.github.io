import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei'
import type { Group, Mesh } from 'three'

interface GlassBlobProps {
  className?: string
  tint?: string
  size?: number
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * A faceted icosahedron gem — the site's one signature 3D moment.
 * Pointer parallax lives on the outer group (lerped toward a target so it
 * never fights the inner mesh's own continuous spin).
 */
function GlassGem({ tint }: { tint: string }) {
  const outerRef = useRef<Group>(null)
  const innerRef = useRef<Mesh>(null)
  const reduced = useReducedMotion()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const inner = innerRef.current
    const outer = outerRef.current
    if (inner && !reduced) {
      inner.rotation.y += delta * 0.18
      inner.rotation.x += delta * 0.1
    }
    if (outer) {
      const targetX = reduced ? 0 : pointer.current.y * 0.15
      const targetY = reduced ? 0 : pointer.current.x * 0.2
      const k = Math.min(delta * 3, 1)
      outer.rotation.x += (targetX - outer.rotation.x) * k
      outer.rotation.y += (targetY - outer.rotation.y) * k
      outer.position.y = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.6) * 0.08
    }
  })

  return (
    <group ref={outerRef}>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.3}
          thickness={0.6}
          roughness={0.06}
          chromaticAberration={0.04}
          anisotropy={0.1}
          distortion={0.15}
          distortionScale={0.3}
          temporalDistortion={0.1}
          ior={1.15}
          color={tint}
          envMapIntensity={1.2}
          clearcoat={0.2}
          samples={6}
          resolution={512}
        />
      </mesh>
    </group>
  )
}

/** Procedural studio lighting — no HDRI fetch, just a few glowing panels. */
function GlassEnvironment({ tint }: { tint: string }) {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer
        form="rect"
        color="#ffffff"
        intensity={2}
        scale={[4, 2, 1]}
        position={[3, 2, 4]}
        rotation={[0, -Math.PI / 4, 0]}
      />
      <Lightformer
        form="rect"
        color={tint}
        intensity={3}
        scale={[3, 3, 1]}
        position={[-4, -1, 2]}
        rotation={[0, Math.PI / 4, 0]}
      />
      <Lightformer form="ring" color="#ffffff" intensity={1.5} scale={6} position={[0, 4, -3]} />
    </Environment>
  )
}

/**
 * Real WebGL glass — MeshTransmissionMaterial for genuine refraction, not a
 * CSS backdrop-blur approximation. Kept to one instance per page (mounted in
 * a page's hero, unmounted on route change) so only a single GL context is
 * ever live at once.
 */
export default function GlassBlob({ className, tint = '#C2A4FF', size = 2.2 }: GlassBlobProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 2]} intensity={0.6} />
        <Suspense fallback={null}>
          <group scale={size}>
            <GlassGem tint={tint} />
          </group>
          <GlassEnvironment tint={tint} />
        </Suspense>
      </Canvas>
    </div>
  )
}
