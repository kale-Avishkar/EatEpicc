/**
 * Skeleton loading components for EatEpic.
 * Use these during data-fetching to prevent blank white screens
 * on slow Indian mobile networks.
 */

/* ── Shimmer keyframe injection (once per app) ─────────────── */
const shimmerStyle = `
  @keyframes skeletonShimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .skeleton {
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      #EDE8E1 25%,
      #F5EFE7 50%,
      #EDE8E1 75%
    );
    background-size: 600px 100%;
    animation: skeletonShimmer 1.6s ease-in-out infinite;
  }
`

let shimmerInjected = false
function injectShimmer() {
  if (shimmerInjected || typeof document === 'undefined') return
  const tag = document.createElement('style')
  tag.textContent = shimmerStyle
  document.head.appendChild(tag)
  shimmerInjected = true
}
injectShimmer()

/* ── Base Skeleton block ────────────────────────────────────── */
export function Skeleton({ width = '100%', height = 16, radius = 8, style = {}, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width, height,
        borderRadius: radius,
        flexShrink: 0,
        ...style,
      }}
    />
  )
}

/* ── Card skeleton ──────────────────────────────────────────── */
export function SkeletonCard({ style = {} }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #EDE8E1',
      borderRadius: 24,
      padding: '28px 24px',
      display: 'flex', flexDirection: 'column', gap: 14,
      ...style,
    }}>
      <Skeleton width={48} height={48} radius={12} />
      <Skeleton width="70%" height={18} />
      <Skeleton width="90%" height={13} />
      <Skeleton width="80%" height={13} />
      <Skeleton width="55%" height={13} />
    </div>
  )
}

/* ── List / stat row skeleton ───────────────────────────────── */
export function SkeletonRow({ lines = 3, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={`${90 - i * 12}%`} height={14} />
      ))}
    </div>
  )
}

/* ── Hero skeleton (full‑ width, above the fold) ────────────── */
export function SkeletonHero() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 20, padding: '120px 24px 80px', textAlign: 'center',
    }}>
      {/* Status pill */}
      <Skeleton width={220} height={32} radius={100} />
      {/* H1 */}
      <Skeleton width="80%" height={52} radius={12} />
      <Skeleton width="60%" height={52} radius={12} />
      {/* Sub */}
      <Skeleton width="55%" height={18} />
      <Skeleton width="45%" height={18} />
      {/* CTA row */}
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <Skeleton width={160} height={52} radius={100} />
        <Skeleton width={200} height={52} radius={100} />
      </div>
    </div>
  )
}

/* ── Stats bar skeleton ─────────────────────────────────────── */
export function SkeletonStats({ cols = 4 }) {
  return (
    <div style={{
      background: '#1A1A2E', padding: '36px 0',
      display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
    }}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} style={{ textAlign: 'center', padding: '8px 24px' }}>
          <div style={{ width: 60, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.08)', margin: '0 auto 8px', animation: 'skeletonShimmer 1.6s ease-in-out infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)', backgroundSize: '600px 100%' }} />
          <div style={{ width: 100, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.06)', margin: '0 auto', animation: 'skeletonShimmer 1.6s ease-in-out infinite', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 75%)', backgroundSize: '600px 100%' }} />
        </div>
      ))}
    </div>
  )
}

/* ── Grid of cards skeleton ─────────────────────────────────── */
export function SkeletonGrid({ count = 3, cols = 3, style = {} }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 24,
      ...style,
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

/* ── Section skeleton with header + grid ───────────────────── */
export function SkeletonSection({ cards = 3, cols = 3 }) {
  return (
    <div style={{ padding: '80px 0' }}>
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <Skeleton width={80} height={14} radius={100} style={{ margin: '0 auto 14px' }} />
          <Skeleton width="50%" height={36} radius={10} style={{ margin: '0 auto 14px' }} />
          <Skeleton width="38%" height={18} radius={6} style={{ margin: '0 auto 6px' }} />
          <Skeleton width="30%" height={18} radius={6} style={{ margin: '0 auto' }} />
        </div>
        <SkeletonGrid count={cards} cols={cols} />
      </div>
    </div>
  )
}

export default Skeleton
