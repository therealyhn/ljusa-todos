import { useLayoutEffect, useRef } from 'react'
import { useAnimate } from 'framer-motion'
import xLogo from '../../../assets/brand/X.webp'
import yLogo from '../../../assets/brand/Y.webp'

export default function HeroWordmark() {
  const [scope, animate] = useAnimate()
  const ran = useRef(false)

  useLayoutEffect(() => {
    if (ran.current) return
    ran.current = true

    const left   = scope.current.querySelector('[data-char="left"]')
    const center = scope.current.querySelector('[data-char="center"]')
    const right  = scope.current.querySelector('[data-char="right"]')
    const rx     = scope.current.querySelector('[data-img="rx"]')
    const ry     = scope.current.querySelector('[data-img="ry"]')

    if (!left || !center || !right || !rx || !ry) return

    const lRect = left.getBoundingClientRect()
    const cRect = center.getBoundingClientRect()
    const rRect = right.getBoundingClientRect()

    const leftOffset  = cRect.left - lRect.left
    const rightOffset = cRect.left - rRect.left

    // Set initial state instantly — all three stacked at center
    animate(left,   { x: leftOffset,  opacity: 0 }, { duration: 0 })
    animate(right,  { x: rightOffset, opacity: 0 }, { duration: 0 })
    animate(center, { opacity: 0, scale: 0.88 },    { duration: 0 })
    animate(ry,     { opacity: 0 },                 { duration: 0 })

    const run = async () => {
      // Phase 1 — center X drops in
      await animate(center, { opacity: 1, scale: 1 }, {
        duration: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      })

      // Phase 2 — left + right slide to their positions simultaneously
      await Promise.all([
        animate(left,  { x: 0, opacity: 1 }, { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }),
        animate(right, { x: 0, opacity: 1 }, { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }),
      ])

      // Snappy pause — they've landed
      await new Promise(r => setTimeout(r, 180))

      // Phase 3 — center rotates to T, right swaps to Y
      await Promise.all([
        animate(center, { rotate: 45 }, { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }),
        animate(rx, { opacity: 0 }, { duration: 0.3, ease: 'easeOut' }),
        animate(ry, { opacity: 1 }, { duration: 0.3, ease: 'easeIn' }),
      ])
    }

    requestAnimationFrame(run)
  }, [animate, scope])

  return (
    <div
      ref={scope}
      className="flex items-end justify-between w-full"
      aria-label="X T Y"
    >
      {/* Left — X */}
      <div data-char="left" style={{ opacity: 0 }}>
        <img
          src={xLogo}
          alt="X"
          className="h-[clamp(100px,22vw,400px)] w-auto select-none"
          draggable={false}
        />
      </div>

      {/* Center — X → T (rotate 45°) */}
      <div data-char="center" style={{ opacity: 0 }}>
        <img
          src={xLogo}
          alt="T"
          className="h-[clamp(100px,22vw,400px)] w-auto select-none"
          draggable={false}
        />
      </div>

      {/* Right — X → Y (cross-fade) */}
      <div data-char="right" className="relative" style={{ opacity: 0 }}>
        <img
          data-img="rx"
          src={xLogo}
          alt=""
          aria-hidden="true"
          className="h-[clamp(100px,22vw,400px)] w-auto select-none"
          draggable={false}
        />
        <img
          data-img="ry"
          src={yLogo}
          alt="Y"
          className="absolute top-0 left-0 h-full w-auto select-none"
          draggable={false}
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  )
}
