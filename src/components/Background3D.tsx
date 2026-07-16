import { useEffect, useRef } from 'react'

interface Background3DProps {
  className?: string
  shape?: 'icosahedron' | 'octahedron'
  /** object radius as a fraction of min(width, height). */
  radius?: number
  /** rotation speed multiplier. */
  speed?: number
  /** max line/dot opacity. */
  opacity?: number
  /** horizontal offset as a fraction of width. */
  offsetX?: number
  /** vertical offset as a fraction of height. */
  offsetY?: number
  /** stroke/fill color as "r,g,b". */
  color?: string
}

const PHI = (1 + Math.sqrt(5)) / 2

function icosahedronVertices(): number[][] {
  return [
    [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
    [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
    [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
  ]
}

function octahedronVertices(): number[][] {
  return [
    [1, 0, 0], [-1, 0, 0],
    [0, 1, 0], [0, -1, 0],
    [0, 0, 1], [0, 0, -1],
  ]
}

function dist(a: number[], b: number[]): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
}

function normalize(verts: number[][]): number[][] {
  return verts.map((p) => {
    const len = Math.hypot(p[0], p[1], p[2]) || 1
    return [p[0] / len, p[1] / len, p[2] / len]
  })
}

/** Edges = every vertex pair whose distance equals the minimum pairwise distance. */
function computeEdges(verts: number[][]): [number, number][] {
  let min = Infinity
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const d = dist(verts[i], verts[j])
      if (d < min) min = d
    }
  }
  const eps = min * 0.08
  const edges: [number, number][] = []
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      if (Math.abs(dist(verts[i], verts[j]) - min) < eps) edges.push([i, j])
    }
  }
  return edges
}

/**
 * A minimalist rotating 3D wireframe rendered on a 2D canvas — no libraries.
 * Vertices are rotated on two axes and perspective-projected each frame;
 * depth controls line opacity and width so the form reads as genuinely 3D.
 */
export default function Background3D({
  className,
  shape = 'icosahedron',
  radius = 0.4,
  speed = 1,
  opacity = 0.5,
  offsetX = 0,
  offsetY = 0,
  color = '255,255,255',
}: Background3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const verts = normalize(
      shape === 'octahedron' ? octahedronVertices() : icosahedronVertices(),
    )
    const edges = computeEdges(verts)

    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const D = 3.2 // perspective camera distance
    let ax = 0.4
    let ay = 0.6
    let last = 0
    let raf = 0

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2 + offsetX * width
      const cy = height / 2 + offsetY * height
      const f = Math.min(width, height) * radius

      const cosx = Math.cos(ax)
      const sinx = Math.sin(ax)
      const cosy = Math.cos(ay)
      const siny = Math.sin(ay)

      const proj = verts.map(([x, y, z]) => {
        const y1 = y * cosx - z * sinx
        const z1 = y * sinx + z * cosx
        const x2 = x * cosy + z1 * siny
        const z2 = -x * siny + z1 * cosy
        const s = D / (D - z2)
        return { x: cx + x2 * f * s, y: cy - y1 * f * s, z: z2, s }
      })

      const ordered = edges
        .map((e) => ({ e, depth: (proj[e[0]].z + proj[e[1]].z) / 2 }))
        .sort((a, b) => a.depth - b.depth)

      ctx.lineCap = 'round'
      for (const { e, depth } of ordered) {
        const p0 = proj[e[0]]
        const p1 = proj[e[1]]
        const k = (depth + 1) / 2 // 0 (far) .. 1 (near)
        ctx.strokeStyle = `rgba(${color}, ${opacity * (0.2 + 0.8 * k)})`
        ctx.lineWidth = 0.7 + 0.7 * k
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()
      }

      for (const p of proj) {
        const k = (p.z + 1) / 2
        ctx.fillStyle = `rgba(${color}, ${opacity * (0.3 + 0.7 * k)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5 * p.s, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const render = (t: number) => {
      if (!last) last = t
      const dt = Math.min((t - last) / 1000, 0.05)
      last = t
      ax += dt * 0.12 * speed
      ay += dt * 0.18 * speed
      draw()
      raf = requestAnimationFrame(render)
    }

    if (reduce) {
      draw() // single static frame
    } else {
      raf = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [shape, radius, speed, opacity, offsetX, offsetY, color])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
