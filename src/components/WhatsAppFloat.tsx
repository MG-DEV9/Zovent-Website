import React, { useState } from 'react'

const WHATSAPP_NUMBER = '918800753816'
const WHATSAPP_MESSAGE =
  'Hello Zovent, I would love to know more about your services.'

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`

export const WhatsAppFloat = () => {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed right-5 bottom-5 z-50 flex items-center gap-0 focus:outline-none"
    >
      {/* Expandable label — slides in from the right side of the button */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxWidth: hovered ? '160px' : '0px', opacity: hovered ? 1 : 0 }}
      >
        <div className="mr-2 rounded-xl bg-[#25D366] px-3.5 py-2 shadow-lg whitespace-nowrap">
          <span className="block text-[9px] uppercase tracking-[0.25em] text-white/75 font-medium leading-none mb-0.5">
            WhatsApp
          </span>
          <span className="block text-sm font-bold text-white leading-tight">
            Chat With Us
          </span>
        </div>
      </div>

      {/* Main circle button */}
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.5)] transition-all duration-300"
        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* Official WhatsApp SVG logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="24" fill="#25D366" />
          <path
            fill="#fff"
            d="M24 6C14.06 6 6 14.06 6 24c0 3.19.84 6.18 2.3 8.78L6 42l9.48-2.48A17.9 17.9 0 0 0 24 42c9.94 0 18-8.06 18-18S33.94 6 24 6zm0 32.8a14.7 14.7 0 0 1-7.5-2.06l-.54-.32-5.63 1.47 1.5-5.48-.35-.56A14.64 14.64 0 0 1 9.2 24C9.2 15.82 15.82 9.2 24 9.2S38.8 15.82 38.8 24 32.18 38.8 24 38.8z"
          />
          <path
            fill="#fff"
            d="M32.8 27.3c-.44-.22-2.6-1.28-3-1.43-.4-.15-.7-.22-1 .22-.3.44-1.14 1.43-1.4 1.72-.26.29-.52.33-.96.11-.44-.22-1.88-.7-3.58-2.22-1.32-1.18-2.22-2.64-2.48-3.08-.26-.44-.03-.68.2-.9.2-.2.44-.52.66-.78.22-.26.29-.44.44-.74.15-.3.07-.56-.04-.78-.11-.22-1-2.4-1.37-3.3-.36-.86-.73-.74-1-.75h-.84c-.3 0-.78.11-1.18.56-.4.44-1.54 1.5-1.54 3.68s1.58 4.28 1.8 4.58c.22.3 3.1 4.74 7.52 6.66 1.05.45 1.87.72 2.51.92 1.05.34 2.01.29 2.77.18.85-.13 2.6-1.06 2.97-2.08.37-1.02.37-1.9.26-2.08-.11-.18-.41-.29-.85-.51z"
          />
        </svg>
      </div>
    </a>
  )
}

export default WhatsAppFloat
