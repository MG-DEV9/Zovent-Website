import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ring_pos = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY } }

    const onEnter = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor]')) setHovered(true)
    }
    const onLeave = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor]')) setHovered(false)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (ring.current) {
        ring_pos.current.x = lerp(ring_pos.current.x, pos.current.x, 0.12)
        ring_pos.current.y = lerp(ring_pos.current.y, pos.current.y, 0.12)
        ring.current.style.transform = `translate(${ring_pos.current.x - 20}px, ${ring_pos.current.y - 20}px) scale(${hovered ? 1.8 : 1})`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [hovered])

  return (
    <>
      {/* dot */}
      <div
        ref={dot}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: '8px', height: '8px',
          backgroundColor: '#090909ff',
          borderRadius: '50%',
          willChange: 'transform',
        }}
      />
      {/* ring */}
      <div
        ref={ring}
        className="fixed top-0 left-0 z-[9999] pointer-events-none transition-[opacity] duration-200"
        style={{
          width: '40px', height: '40px',
          border: '1px solid rgba(12, 12, 12, 0.64)',
          borderRadius: '50%',
          willChange: 'transform',
          transition: 'transform 0s, opacity 0.2s, scale 0.3s',
        }}
      />
    </>
  )
}
