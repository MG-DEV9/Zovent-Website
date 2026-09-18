import { useEffect, useState } from 'react'

const D = "'Cormorant Garamond', Georgia, serif"
const L = "'Manrope', system-ui, sans-serif"

interface Props {
  onEnter: () => void
}

export default function Preloader({ onEnter }: Props) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setTimeout(() => setVisible(true), 60))
    return () => cancelAnimationFrame(t)
  }, [])

  const handleEnter = () => {
    setExiting(true)
    setTimeout(onEnter, 900)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#670626',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.03)' : 'scale(1)',
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
          opacity: 0.04,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(-8px)',
          transitionDelay: '0.1s',
        }}
      >

        <span style={{ fontFamily: L, fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(250,248,242,0.35)', textTransform: 'uppercase' }}>
          CORPORATE EVENTS
        </span>
      </div>

      {/* Brand line */}
      <p
        style={{
          fontFamily: L,
          fontSize: '10px',
          letterSpacing: '0.3em',
          color: '#BAD797',
          textTransform: 'uppercase',
          marginBottom: '24px',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(16px)',
          transitionDelay: '0.2s',
        }}
      >
        CONFERENCES. MICE. TRAVEL.
      </p>

      {/* Main wordmark */}
      <h1
        style={{
          fontFamily: D,
          fontSize: 'clamp(96px, 20vw, 280px)',
          fontWeight: 900,
          lineHeight: 0.82,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#FAF8F2',
          transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(32px)',
          transitionDelay: '0.3s',
          userSelect: 'none',
        }}
      >
        ZO<span style={{ WebkitTextStroke: '1px rgba(250,248,242,0.3)', color: 'transparent' }}>VENT</span>
      </h1>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: '56px',
          backgroundColor: 'rgba(250,248,242,0.2)',
          margin: '40px 0 36px',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scaleY(1)' : 'scaleY(0)',
          transitionDelay: '0.55s',
          transformOrigin: 'top',
        }}
      />

      {/* Enter button */}
      <button
        onClick={handleEnter}
        style={{
          fontFamily: L,
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(250,248,242,0.5)',
          background: 'none',
          border: 'none',
          cursor: 'none',
          transition: 'opacity 0.8s ease, transform 0.8s ease, color 0.2s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(12px)',
          transitionDelay: '0.7s',
          padding: '12px 0',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#BAD797' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.5)' }}
      >
        [ ENTER ]
      </button>

      {/* Bottom progress line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          backgroundColor: '#BAD797',
          width: visible ? '100%' : '0%',
          transition: 'width 2.8s cubic-bezier(0.4,0,0.2,1)',
          transitionDelay: '0.4s',
        }}
        onTransitionEnd={e => {
          if ((e.target as HTMLElement).style.width === '100%') handleEnter()
        }}
      />
    </div>
  )
}
