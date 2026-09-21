import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { api, assetUrl } from '../lib/api'
import { loadRazorpay, type RazorpayInstance, type RazorpayOptions, type RazorpayFailedResponse } from '../lib/razorpay'

// ── Types ──────────────────────────────────────────────────────────────────────
type Installment = {
  label: string
  amount: number
  dueDate: string
  status: 'Pending' | 'Paid'
  paidOn?: string
}

type PaymentRecord = {
  paymentId: string
  clientName: string
  service: string
  description: string
  totalAmount: number
  baseAmount: number
  dueDate: string
  status: 'Pending' | 'Partial' | 'Paid'
  gstApplicable?: boolean
  gstRate?: number
  paidAmount?: number
  remainingAmount?: number
  installments?: Installment[]
  invoiceUrl?: string
  invoiceFileName?: string
}

// ── Design tokens ──────────────────────────────────────────────────────────────
const D    = "'Times New Roman', Times New Roman, serif"
const SANS = "'Manrope', system-ui, sans-serif"
const BODY = "Times New Roman, 'Times New Roman', Times New Roman"
const RED  = '#670626'

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const statusColors: Record<PaymentRecord['status'], { bg: string; text: string }> = {
  Paid:    { bg: '#dcfce7', text: '#15803d' },
  Partial: { bg: '#dbeafe', text: '#1d4ed8' },
  Pending: { bg: '#fef9c3', text: '#a16207' },
}

const inputCls = [
  'w-full px-4 py-3 text-sm border outline-none transition-colors',
  'bg-[#FAF8F2] border-[rgba(103,6,38,0.2)] text-[#1A0A0E]',
  'placeholder:text-[rgba(26,10,14,0.4)]',
  'focus:border-[#670626]',
].join(' ')

// ── Component ──────────────────────────────────────────────────────────────────
export default function Payment() {
  const { paymentId: urlId }  = useParams<{ paymentId?: string }>()
  const navigate              = useNavigate()

  const [reference, setReference] = useState(urlId || '')
  const [payment, setPayment]     = useState<PaymentRecord | null>(null)
  const [loading, setLoading]     = useState(false)
  const [paying, setPaying]       = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')
  const [selectedInstIdx, setSelectedInstIdx] = useState<number>(-1)
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; phone?: string }>({})
  const [client, setClient] = useState({ name: '', email: '', phone: '', message: '' })
  const rzpRef = useRef<RazorpayInstance | null>(null)

  // Auto-select first pending installment
  useEffect(() => {
    if (payment?.installments?.length) {
      const idx = payment.installments.findIndex(i => i.status === 'Pending')
      setSelectedInstIdx(idx >= 0 ? idx : -1)
    } else {
      setSelectedInstIdx(-1)
    }
  }, [payment])

  const activeBase = useMemo(() => {
    if (payment?.installments?.length && selectedInstIdx >= 0 && selectedInstIdx < payment.installments.length)
      return payment.installments[selectedInstIdx].amount
    return payment?.totalAmount || payment?.baseAmount || 0
  }, [payment, selectedInstIdx])

  const amountBreakdown = useMemo(() => {
    const fee     = Math.round(activeBase * 0.02)
    const rate    = payment?.gstRate ?? (payment?.gstApplicable ? 18 : 0)
    const gst     = rate > 0 ? Math.round((activeBase + fee) * (rate / 100)) : 0
    const charges = fee + gst
    return { fee, gst, rate, charges, total: activeBase + charges }
  }, [activeBase, payment])

  // ── Fetch payment from the Mongo API ─────────────────────────────────────────
  const fetchPayment = useCallback(async (id: string) => {
    const trimmed = id.trim().toUpperCase()
    if (!trimmed) { setError('Please enter your payment reference ID.'); return }
    setLoading(true); setError(''); setSuccess('')
    try {
      const data = await api.getPayment(trimmed)
      if (!data) {
        setPayment(null)
        setError('No payment record found for this reference ID. Please check and try again.')
      } else {
        setPayment(data)
        setReference(trimmed)
        setClient(c => ({ ...c, name: c.name || data.clientName }))
        if (urlId !== trimmed) navigate(`/payment/${trimmed}`, { replace: true })
      }
    } catch {
      setPayment(null)
      setError('Unable to reach the payment server. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [navigate, urlId])

  useEffect(() => { if (urlId) fetchPayment(urlId) }, [fetchPayment, urlId])

  const handleLookup = (e: React.FormEvent) => { e.preventDefault(); fetchPayment(reference) }

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setClient(c => ({ ...c, [name]: value }))
    setFieldErrors(fe => ({ ...fe, [name]: undefined }))
  }

  // ── Pay ───────────────────────────────────────────────────────────────────────
  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!payment) { setError('Please fetch a valid payment reference first.'); return }

    const errs: typeof fieldErrors = {}
    if (!client.name.trim()) errs.name = 'Full name is required.'
    if (!client.phone.trim()) errs.phone = 'Mobile number is required.'
    else if (!/^[6-9]\d{9}$/.test(client.phone.trim())) errs.phone = 'Enter a valid 10-digit Indian mobile number.'
    if (client.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email.trim()))
      errs.email = 'Enter a valid email address.'
    if (Object.keys(errs).length) { setFieldErrors(errs); return }
    setFieldErrors({})

    setPaying(true); setError(''); setSuccess('')
    try {
      await loadRazorpay()

      const instIdx    = payment.installments?.length && selectedInstIdx >= 0 ? selectedInstIdx : null
      const instLabel  = instIdx !== null ? payment.installments![instIdx].label : null

      const order = await api.createOrder({
        paymentId:      payment.paymentId,
        amount:         amountBreakdown.total,
        gstApplied:     Boolean(payment.gstApplicable),
        clientName:     client.name,
        clientEmail:    client.email,
        clientPhone:    client.phone,
        clientMessage:  client.message,
        installmentIdx: instIdx,
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const RazorpayClass = (window as any).Razorpay as (new (o: RazorpayOptions) => RazorpayInstance) | undefined
      if (!RazorpayClass) throw new Error('Razorpay SDK not available.')

      const rzp = new RazorpayClass({
        key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:      order.amount,
        currency:    order.currency,
        name:        'Zovent',
        description: instLabel ? `${payment.paymentId} — ${instLabel}` : `Reference: ${payment.paymentId}`,
        image:       '/assets/logozv.png',
        order_id:    order.orderId,
        prefill:     { name: client.name, email: client.email, contact: client.phone },
        theme:       { color: RED },
        modal:       {
          escape: false,
          ondismiss: () => {
            setPaying(false)
            setError('Payment was cancelled. You can try again when ready.')
          },
        },
        handler: async (response) => {
          try {
            await api.verifyPayment({
              ...response,
              paymentId:      payment.paymentId,
              amount:         amountBreakdown.total,
              installmentIdx: instIdx,
            })
            setPaying(false)
            setSuccess(`Payment successful${instLabel ? ` for ${instLabel}` : ''}! ID: ${response.razorpay_payment_id}. Thank you!`)
            fetchPayment(payment.paymentId)
          } catch (err: unknown) {
            setPaying(false)
            const detail = err instanceof Error ? err.message : 'Unknown verification error.'
            setError(`Payment was received but could not be verified: ${detail}`)
          }
        },
      })
      rzp.on('payment.failed', (r: unknown) => {
        const err = r as RazorpayFailedResponse
        setPaying(false)
        setError(`Payment failed: ${err.error?.description || 'Unknown error'}. Please try again.`)
      })
      rzpRef.current = rzp
      rzp.open()
    } catch (err) {
      setPaying(false)
      setError(err instanceof Error ? err.message : 'Could not start payment. Please try again.')
    }
  }

  const hasInstallments    = !!(payment?.installments?.length)
  const pendingInstallments = payment?.installments?.filter(i => i.status === 'Pending') || []
  const allPaid            = payment?.status === 'Paid'

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: '#FAF8F2', color: '#1A0A0E', fontFamily: SANS, minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-end px-10 lg:px-20 overflow-hidden"
        style={{ minHeight: '34vh', paddingTop: '68px', backgroundColor: RED }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 30%, rgba(103,6,38,0.65) 70%, rgba(103,6,38,0.25) 100%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full pb-12">
          <p className="text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: '#BAD797', fontFamily: SANS }}>
            [ SECURE PAYMENT ]
          </p>
          <h1 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(40px, 6vw, 90px)', letterSpacing: '-0.02em', color: '#FAF8F2' }}>
            PAY ZOVENT.
          </h1>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[12px] mb-10" style={{ color: 'rgba(26,10,14,0.5)', fontFamily: SANS }}>
            Enter your payment reference ID to load your invoice details and pay securely via Razorpay.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-6 items-start">

            {/* ── LEFT: Lookup + client fields + pay button ── */}
            <div className="p-8" style={{ backgroundColor: '#F2E6EA', border: '1px solid rgba(103,6,38,0.1)' }}>
              {/* Reference search */}
              <form onSubmit={handleLookup} className="space-y-3 mb-6">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: RED }}>
                  Payment Reference ID
                </label>
                <div className="flex gap-2">
                  <input
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                    className={inputCls}
                    placeholder="xxx-MICE-xxx1"
                    style={{ fontFamily: BODY }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-shrink-0 px-5 py-3 text-[11px] tracking-[0.15em] font-bold uppercase transition-colors disabled:opacity-60"
                    style={{ backgroundColor: RED, color: '#FAF8F2', fontFamily: SANS }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#1A0A0E' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = RED }}
                  >
                    {loading ? '...' : 'FIND'}
                  </button>
                </div>
              </form>

              {/* Alerts */}
              {error && (
                <div className="mb-4 px-4 py-3 text-[12px] border" style={{ backgroundColor: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}>
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 px-4 py-3 text-[12px] border flex gap-2 items-start" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#15803d' }}>
                  <span>✓</span><span>{success}</span>
                </div>
              )}

              {/* Client + Pay (shown when payment loaded) */}
              {payment && (
                <form onSubmit={handlePay} className="space-y-3 border-t pt-5" style={{ borderColor: 'rgba(103,6,38,0.1)' }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-3" style={{ color: RED }}>Your Details</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <input name="name" value={client.name} onChange={handleClientChange}
                        className={`${inputCls} ${fieldErrors.name ? 'border-red-400' : ''}`}
                        placeholder="Full name *" style={{ fontFamily: BODY }} />
                      {fieldErrors.name && <p className="mt-1 text-[10px] text-red-500">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <input name="email" type="email" value={client.email} onChange={handleClientChange}
                        className={`${inputCls} ${fieldErrors.email ? 'border-red-400' : ''}`}
                        placeholder="Email (optional)" style={{ fontFamily: BODY }} />
                      {fieldErrors.email && <p className="mt-1 text-[10px] text-red-500">{fieldErrors.email}</p>}
                    </div>
                    <div>
                      <input name="phone" type="tel" value={client.phone} onChange={handleClientChange}
                        className={`${inputCls} ${fieldErrors.phone ? 'border-red-400' : ''}`}
                        placeholder="Mobile number *" style={{ fontFamily: BODY }} />
                      {fieldErrors.phone && <p className="mt-1 text-[10px] text-red-500">{fieldErrors.phone}</p>}
                    </div>
                    <div className="col-span-2">
                      <textarea name="message" value={client.message} onChange={handleClientChange}
                        className={`${inputCls} resize-none`}
                        rows={2} placeholder="Message for our team (optional)" style={{ fontFamily: BODY }} />
                    </div>
                  </div>

                  {allPaid ? (
                    <div className="px-4 py-3 text-[12px] border flex gap-2 items-center" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#15803d' }}>
                      ✓ This invoice has been fully paid.
                    </div>
                  ) : pendingInstallments.length === 0 && hasInstallments ? (
                    <div className="px-4 py-3 text-[12px] border flex gap-2 items-center" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#15803d' }}>
                      ✓ All installments have been paid.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={paying || (hasInstallments && selectedInstIdx < 0)}
                      className="w-full py-3.5 text-[12px] tracking-[0.15em] font-bold uppercase transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                      style={{ backgroundColor: RED, color: '#FAF8F2', fontFamily: SANS }}
                      onMouseEnter={e => { if (!paying) (e.currentTarget as HTMLElement).style.backgroundColor = '#1A0A0E' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = RED }}
                    >
                      {paying ? (
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      ) : '🔒 '}
                      {hasInstallments && selectedInstIdx >= 0
                        ? `PAY ${payment.installments![selectedInstIdx].label} — ${fmt(amountBreakdown.total)}`
                        : `PAY ${fmt(amountBreakdown.total)}`}
                    </button>
                  )}
                </form>
              )}

              {/* Empty state */}
              {!payment && !loading && (
                <div className="mt-4 py-8 text-center border border-dashed" style={{ borderColor: 'rgba(103,6,38,0.2)' }}>
                  <p className="text-[12px] mb-2" style={{ color: 'rgba(26,10,14,0.4)' }}>
                    Enter a reference ID above to load payment details.
                  </p>
                  <Link to="/contact" className="text-[11px] underline" style={{ color: RED }}>Need Help?</Link>
                </div>
              )}

              {/* Security badge */}
              <div className="flex items-start gap-3 mt-5 pt-4 border-t" style={{ borderColor: 'rgba(103,6,38,0.1)' }}>
                <span style={{ color: RED }}>🔒</span>
                <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(26,10,14,0.5)', fontFamily: SANS }}>
                  Secured by Razorpay. We never store your card or UPI credentials.
                </p>
              </div>
            </div>

            {/* ── RIGHT: Invoice details ── */}
            <div className="p-8" style={{ backgroundColor: '#fff', border: '1px solid rgba(103,6,38,0.08)' }}>
              {payment ? (
                <>
                  {/* Reference + status */}
                  <div className="flex flex-wrap justify-between items-start gap-3 pb-5 mb-5" style={{ borderBottom: '1px solid rgba(103,6,38,0.08)' }}>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: SANS }}>Reference</p>
                      <h2 className="font-black tracking-wide leading-none" style={{ fontFamily: D, fontSize: 'clamp(22px, 3vw, 36px)', color: '#1A0A0E' }}>
                        {payment.paymentId}
                      </h2>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className="px-3 py-1 text-[9px] uppercase tracking-widest font-bold"
                        style={{ backgroundColor: statusColors[payment.status].bg, color: statusColors[payment.status].text }}
                      >
                        {payment.status}
                      </span>
                      {payment.invoiceUrl && (
                        <a
                          href={assetUrl(payment.invoiceUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] tracking-[0.1em] uppercase font-semibold underline"
                          style={{ color: RED, fontFamily: SANS }}
                        >
                          View Invoice ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Client / Service / Description */}
                  <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-[13px] mb-5">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: SANS }}>Client</p>
                      <p className="font-semibold" style={{ fontFamily: BODY }}>{payment.clientName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: SANS }}>Service</p>
                      <p className="font-semibold" style={{ fontFamily: BODY }}>{payment.service}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: SANS }}>Description</p>
                      <p style={{ color: 'rgba(26,10,14,0.7)', fontFamily: BODY }}>{payment.description}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: SANS }}>Due Date</p>
                      <p style={{ fontFamily: BODY }}>{new Date(payment.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                  </div>

                  {/* Installment selector */}
                  {hasInstallments && (
                    <div className="mb-5">
                      <p className="text-[9px] uppercase tracking-widest mb-3" style={{ color: 'rgba(26,10,14,0.4)', fontFamily: SANS }}>Select Installment</p>
                      <div className="grid grid-cols-2 gap-2">
                        {payment.installments!.map((inst, idx) => {
                          const isPaid     = inst.status === 'Paid'
                          const isSelected = selectedInstIdx === idx
                          const isOverdue  = !isPaid && new Date(inst.dueDate) < new Date()
                          return (
                            <button
                              key={idx} type="button" disabled={isPaid}
                              onClick={() => setSelectedInstIdx(idx)}
                              className="text-left p-3 border transition-all"
                              style={{
                                backgroundColor: isPaid ? '#f0fdf4' : isSelected ? RED : '#fff',
                                borderColor: isPaid ? '#86efac' : isSelected ? RED : 'rgba(103,6,38,0.15)',
                                cursor: isPaid ? 'not-allowed' : 'pointer',
                              }}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-bold" style={{ color: isPaid ? '#15803d' : isSelected ? '#FAF8F2' : '#1A0A0E', fontFamily: SANS }}>
                                  {inst.label}
                                </span>
                                {isPaid && <span className="text-[10px]" style={{ color: '#15803d' }}>✓</span>}
                              </div>
                              <p className="text-[15px] font-black" style={{ fontFamily: D, color: isPaid ? '#15803d' : isSelected ? '#FAF8F2' : '#1A0A0E' }}>
                                {fmt(inst.amount)}
                              </p>
                              <p className="text-[9px] mt-0.5" style={{ color: isPaid ? '#15803d' : isOverdue ? '#dc2626' : isSelected ? 'rgba(250,248,242,0.7)' : 'rgba(26,10,14,0.4)' }}>
                                {isPaid && inst.paidOn
                                  ? `Paid ${new Date(inst.paidOn).toLocaleDateString('en-IN')}`
                                  : isOverdue
                                    ? `Overdue · ${new Date(inst.dueDate).toLocaleDateString('en-IN')}`
                                    : `Due ${new Date(inst.dueDate).toLocaleDateString('en-IN')}`}
                              </p>
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] mt-2 pt-2 border-t" style={{ borderColor: 'rgba(103,6,38,0.08)', color: 'rgba(26,10,14,0.5)' }}>
                        <span>{payment.installments!.filter(i => i.status === 'Paid').length} of {payment.installments!.length} paid</span>
                        <span style={{ color: '#dc2626', fontWeight: 600 }}>
                          Remaining: {fmt(payment.remainingAmount ?? Math.max(0, (payment.totalAmount || payment.baseAmount) - (payment.paidAmount || 0)))}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Amount breakdown */}
                  <div className="py-4 space-y-2 text-[13px]" style={{ borderTop: '1px solid rgba(103,6,38,0.08)', borderBottom: '1px solid rgba(103,6,38,0.08)' }}>
                    <div className="flex justify-between" style={{ color: 'rgba(26,10,14,0.55)', fontFamily: BODY }}>
                      <span>{hasInstallments && selectedInstIdx >= 0 ? payment.installments![selectedInstIdx].label : 'Base amount'}</span>
                      <span>{fmt(activeBase)}</span>
                    </div>
                    <div className="flex justify-between" style={{ color: 'rgba(26,10,14,0.55)', fontFamily: BODY }}>
                      <span>Incl. taxes & charges{amountBreakdown.rate > 0 ? ` (GST ${amountBreakdown.rate}%)` : ''}</span>
                      <span>{fmt(amountBreakdown.charges)}</span>
                    </div>
                    <div className="flex justify-between pt-2 font-black text-[18px]" style={{ borderTop: '1px solid rgba(103,6,38,0.08)', fontFamily: D, color: '#1A0A0E' }}>
                      <span>Total Payable</span>
                      <span>{fmt(amountBreakdown.total)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="min-h-[320px] flex items-center justify-center text-center">
                  <div>
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#F2E6EA', border: '1px solid rgba(103,6,38,0.1)' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#670626" strokeWidth="1.5">
                        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                    </div>
                    <h2 className="font-black uppercase mb-2" style={{ fontFamily: D, fontSize: '28px', color: '#1A0A0E' }}>Find Your Invoice</h2>
                    <p className="text-[13px]" style={{ color: 'rgba(26,10,14,0.5)', fontFamily: BODY, maxWidth: '280px' }}>
                      Use the reference ID from your Zovent payment link to load the invoice details.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
