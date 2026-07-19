import { lazy, Suspense } from 'react'

const GlassBlob = lazy(() => import('./GlassBlob'))

interface LazyGlassBlobProps {
  className?: string
  tint?: string
  size?: number
}

/**
 * Defers the three.js/@react-three payload behind its own chunk so a page's
 * text and CTAs stay interactive immediately; the glass gem streams in
 * slightly behind instead of blocking first paint.
 */
export default function LazyGlassBlob(props: LazyGlassBlobProps) {
  return (
    <Suspense fallback={null}>
      <GlassBlob {...props} />
    </Suspense>
  )
}
