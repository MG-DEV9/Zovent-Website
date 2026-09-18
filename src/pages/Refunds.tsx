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

export default function Refunds() {
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
              REFUNDS & CANCELLATIONS.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────── */}
      <section className="py-24 px-10 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <Reveal>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-12 font-semibold" style={{ color: 'rgba(26,10,14,0.5)', fontFamily: B }}>
              Effective Date: 28-OCT-2025
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12 space-y-6">
              <p className="text-[16px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                At ZOVENT, we strive to deliver seamless and memorable experiences for every client. As our events and travel arrangements involve advance bookings, vendor commitments, logistics planning, and operational costs, the following refund and cancellation policy shall apply to all confirmed bookings and agreements.
              </p>
              <p className="text-[16px] leading-relaxed font-semibold" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.9)' }}>
                By confirming a booking and making payment to Zovent, the Client agrees to the terms mentioned below.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[28px] font-black uppercase mb-8" style={{ fontFamily: D, color: '#670626' }}>
                Cancellation Clause
              </h2>
              <p className="text-[15px] leading-relaxed mb-8" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                If the Client wishes to cancel the Agreement/Booking, the following cancellation and refund conditions shall apply:
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-[20px] font-bold uppercase mb-3" style={{ fontFamily: D, color: '#1A0A0E' }}>
                    1. Cancellation 45 Days Prior to the Event
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                    If cancellation is made 45 days or more before the scheduled event date, the Client shall be eligible for a refund of 50% of the amount already received by Zovent.
                  </p>
                  <p className="text-[15px] leading-relaxed mt-3" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                    The remaining amount shall be retained towards administrative expenses, vendor commitments, and processing charges.
                  </p>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold uppercase mb-3" style={{ fontFamily: D, color: '#1A0A0E' }}>
                    2. Cancellation Within 45 Days of the Event
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                    If cancellation is made less than 45 days before the scheduled event date, the Client shall be eligible for a refund of 25% of the amount already received by Zovent.
                  </p>
                  <p className="text-[15px] leading-relaxed mt-3" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                    The balance amount shall be treated as cancellation and operational charges.
                  </p>
                </div>

                <div>
                  <h3 className="text-[20px] font-bold uppercase mb-3" style={{ fontFamily: D, color: '#1A0A0E' }}>
                    3. Cancellation Within 15 Days of the Event
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                    If cancellation is made less than 15 days before the scheduled event date, no refund shall be provided.
                  </p>
                  <p className="text-[15px] leading-relaxed mt-3" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                    The entire amount collected by ZOVENT shall be considered as cancellation charges due to committed vendor payments, operational expenses, and logistical arrangements.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-12">
              <h2 className="text-[28px] font-black uppercase mb-6" style={{ fontFamily: D, color: '#670626' }}>
                Additional Terms
              </h2>
              <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                <li>All cancellation requests must be submitted in writing via email or official communication channels of Zovent.</li>
                <li>Refunds, wherever applicable, shall be processed within 7-14 business days from the date of cancellation approval.</li>
                <li>Any non-refundable vendor charges, government taxes, permit fees, or third-party booking charges already incurred may be deducted additionally wherever applicable.</li>
                <li>In case of unforeseen circumstances, natural calamities, government restrictions, or force majeure events, refund decisions shall be subject to vendor policies and management discretion.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="pt-12" style={{ borderTop: '1px solid rgba(103,6,38,0.1)' }}>
              <h2 className="text-[28px] font-black uppercase mb-6" style={{ fontFamily: D, color: '#670626' }}>
                Contact Information
              </h2>
              <p className="text-[15px] leading-relaxed mb-6" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.7)' }}>
                For cancellation requests or refund-related queries, please contact:
              </p>
              
              <div className="p-8 rounded-lg" style={{ backgroundColor: '#F2E6EA', border: '1px solid rgba(103,6,38,0.1)' }}>
                <div className="space-y-3 text-[15px]" style={{ fontFamily: BODY, color: 'rgba(26,10,14,0.8)' }}>
                  <p><strong style={{ color: '#670626' }}>Company:</strong> ZOVENT</p>
                  <p><strong style={{ color: '#670626' }}>Email:</strong> <a href="mailto:info@zovents.com" className="hover:opacity-70 transition-opacity">info@zovents.com</a></p>
                  <p><strong style={{ color: '#670626' }}>Phone:</strong> <a href="tel:+918800753816" className="hover:opacity-70 transition-opacity">+91 8800753816</a></p>
                  <p><strong style={{ color: '#670626' }}>Website:</strong> <a href="https://www.zovents.com/" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">https://www.zovents.com/</a></p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="pt-12 mt-12">
              <p className="text-[12px] italic tracking-wide uppercase font-semibold" style={{ fontFamily: B, color: 'rgba(26,10,14,0.4)' }}>
                ZOVENT PRIVATE LIMITED
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
