import { type ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

const D = "'Cormorant Garamond', Georgia, serif"
const B = "'Manrope', system-ui, sans-serif"
const BODY = "Georgia, 'Times New Roman', serif"

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal(0.1) as React.RefObject<HTMLDivElement>
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Terms() {
  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: B }}>
      {/* ── HERO ───────────────────── */}
      <section
        className="relative flex flex-col justify-end px-10 lg:px-20 overflow-hidden"
        style={{ minHeight: '40vh', paddingTop: '68px', backgroundColor: '#670626', borderBottom: '1px solid rgba(103,6,38,0.1)' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 30%, rgba(103,6,38,0.7) 65%, rgba(103,6,38,0.3) 100%)' }} />
        
        <div className="relative z-10 max-w-[1440px] mx-auto w-full pb-16">
          <Reveal delay={100}>
            <p className="text-[10px] tracking-[0.28em] uppercase mb-6" style={{ color: '#BAD797', fontFamily: B }}>
              [ LEGAL ]
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(48px, 8vw, 120px)', letterSpacing: '-0.02em', color: '#FAF8F2' }}>
              TERMS OF SERVICE.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────── */}
      <section className="py-24 px-10 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <p className="text-[16px] leading-relaxed mb-12" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
              Welcome to Zovent! By accessing and using our website or services, you agree to comply with the following terms and conditions. Please read them carefully before proceeding.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                1. Acceptance of Terms
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                By using Zovent, you agree to these terms. If you do not accept these terms, you must refrain from using our services.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                2. Eligibility
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                Our services are intended for individuals aged 18 years or older. By accessing our website, you confirm that you meet this requirement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                3. Booking and Payment
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                <li>All bookings are subject to availability.</li>
                <li>Payments must be completed using the approved payment methods listed on our website.</li>
                <li>Non-refundable deposits may apply to specific trips.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                4. Cancellation and Refund Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                <li>Cancellation requests must be made in writing.</li>
                <li>Refund eligibility will be based on the terms specified in the booking agreement.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                5. Intellectual Property
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                All content, including logos, images, and text, is the property of Zovent and is protected under copyright laws.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                6. Limitation of Liability
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                Zovent is not responsible for losses caused by delays, cancellations, or unforeseen circumstances beyond our control.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                7. Privacy
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                Your personal data is handled in accordance with our Privacy Policy. Please refer to it for more details.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                8. Modifications to Terms
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                Zovent reserves the right to update these terms at any time without prior notice. Continued use of the website constitutes acceptance of the revised terms.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[20px] font-black uppercase mb-4" style={{ fontFamily: D, color: '#670626' }}>
                9. Governing Law
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                These terms are governed by the laws of India. Any disputes will be resolved in accordance with Indian legal procedures.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <p className="text-[15px] leading-relaxed mb-4" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                For any inquiries regarding these terms, please contact our team.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
