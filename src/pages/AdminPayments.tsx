import { useEffect, useRef, useState, useCallback } from 'react'
import { api, clearAdminSession, assetUrl } from '../lib/api'

// ── Types ──────────────────────────────────────────────────────────────────────
type Installment = {
  label: string
  amount: number
  dueDate: string
  status: 'Pending' | 'Paid'
  paidOn?: string
  razorpayPaymentId?: string
}

type PaymentRecord = {
  paymentId: string
  clientName: string
  clientEmail?: string
  clientPhone?: string
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
  lastPaidAt?: string
  razorpayPaymentId?: string
  invoiceUrl?: string
  invoiceFileName?: string
}

// ── Design tokens ──────────────────────────────────────────────────────────────
const D    = "'Cormorant Garamond', Georgia, serif"
const SANS = "'Manrope', system-ui, sans-serif"
const RED  = '#670626'

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

const SERVICES = [
  'Corporate Conferences', 'MICE Events', 'Offsites & Team Building',
  'Brand Activations', 'Award Ceremonies', 'Corporate Travel', 'Other',
]

const blankForm = (): Omit<PaymentRecord, 'status'> & { status: string } => ({
  paymentId: '', clientName: '', clientEmail: '', clientPhone: '',
  service: 'Corporate Conferences', description: '',
  totalAmount: 0, baseAmount: 0,
  dueDate: new Date().toISOString().slice(0, 10),
  status: 'Pending', gstApplicable: false, gstRate: 18,
  paidAmount: 0, remainingAmount: 0, installments: [],
})

const txnId = (p: PaymentRecord) =>
  p.razorpayPaymentId || p.installments?.slice().reverse().find(i => i.razorpayPaymentId)?.razorpayPaymentId || ''

const statusColor = (s: string) => ({
  Paid:    { bg: '#dcfce7', text: '#15803d' },
  Partial: { bg: '#dbeafe', text: '#1d4ed8' },
  Pending: { bg: '#fef9c3', text: '#a16207' },
}[s] || { bg: '#f3f4f6', text: '#6b7280' })

// ── Input style ────────────────────────────────────────────────────────────────
const inp = 'w-full px-3 py-2 text-sm border outline-none transition-colors bg-[#FAF8F2] border-[rgba(103,6,38,0.2)] text-[#1A0A0E] focus:border-[#670626]'

// ── Row actions dropdown item style ─────────────────────────────────────────────
const menuItemCls = 'block w-full text-left px-4 py-2 text-[11px] tracking-wide transition-colors hover:bg-[#F2E6EA]'

// ────────────────────────────────────────────────────────────────────────────────
export default function AdminPayments() {
  const [payments, setPayments]     = useState<PaymentRecord[]>([])
  const [loading, setLoading]       = useState(true)
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState('')
  const [search, setSearch]         = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  // Form state
  const [showForm, setShowForm]     = useState(false)
  const [editId, setEditId]         = useState<string | null>(null)
  const [form, setForm]             = useState(blankForm())
  const [instForm, setInstForm]     = useState<Installment[]>([])

  // Row actions menu + invoice upload
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null)
  const [uploadingFor, setUploadingFor] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadTargetRef = useRef<string | null>(null)

  // Dashboard stats
  const stats = {
    total:   payments.length,
    pending: payments.filter(p => p.status === 'Pending').length,
    partial: payments.filter(p => p.status === 'Partial').length,
    paid:    payments.filter(p => p.status === 'Paid').length,
    revenue: payments.filter(p => p.status === 'Paid').reduce((s, p) => s + (p.totalAmount || 0), 0),
  }

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchPayments = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const records = await api.listPayments({ status: statusFilter, search })
      setPayments(records)
    } catch (err) {
      console.error('API Fetch Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load payments.')
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => { fetchPayments() }, [fetchPayments])

  // ── Save (create / update) ─────────────────────────────────────────────────
  const handleSave = async () => {
    const id = form.paymentId.trim().toUpperCase()
    if (!id) { setError('Payment ID is required.'); return }
    if (!form.clientName.trim()) { setError('Client name is required.'); return }
    if (!form.totalAmount || form.totalAmount <= 0) { setError('Total amount must be greater than 0.'); return }

    setSaving(true); setError(''); setSuccess('')
    try {
      const record: PaymentRecord = {
        ...form,
        paymentId:       id,
        totalAmount:     Number(form.totalAmount),
        baseAmount:      Number(form.baseAmount) || Number(form.totalAmount),
        gstRate:         form.gstApplicable ? Number(form.gstRate || 18) : 0,
        paidAmount:      Number(form.paidAmount || 0),
        remainingAmount: Number(form.remainingAmount || form.totalAmount),
        status:          form.status as PaymentRecord['status'],
        installments:    instForm,
      }
      if (editId) await api.updatePayment(editId, record)
      else await api.createPayment(record)
      setSuccess(`Payment "${id}" ${editId ? 'updated' : 'created'} successfully.`)
      setShowForm(false)
      setEditId(null)
      setForm(blankForm())
      setInstForm([])
      fetchPayments()
    } catch (err) {
      console.error('API Save Error:', err)
      setError(err instanceof Error ? err.message : 'Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!window.confirm(`Delete payment "${id}"? This cannot be undone.`)) return
    try {
      await api.deletePayment(id)
      setSuccess(`Payment "${id}" deleted.`)
      fetchPayments()
    } catch {
      setError('Failed to delete.')
    }
  }

  // ── Mark Paid ──────────────────────────────────────────────────────────────
  const markPaid = async (p: PaymentRecord) => {
    if (!window.confirm(`Mark "${p.paymentId}" as fully Paid?`)) return
    try {
      await api.updatePayment(p.paymentId, {
        status: 'Paid', paidAmount: p.totalAmount, remainingAmount: 0,
        lastPaidAt: new Date().toISOString(),
      })
      setSuccess(`"${p.paymentId}" marked as Paid.`)
      fetchPayments()
    } catch {
      setError('Failed to update status.')
    }
  }

  // ── Open edit form ─────────────────────────────────────────────────────────
  const openEdit = (p: PaymentRecord) => {
    setForm({ ...p, gstRate: p.gstRate ?? 18 })
    setInstForm(p.installments || [])
    setEditId(p.paymentId)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Copy link ──────────────────────────────────────────────────────────────
  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/payment/${id}`)
    setSuccess(`Link for "${id}" copied to clipboard!`)
    setTimeout(() => setSuccess(''), 3000)
  }

  // ── Invoice upload ────────────────────────────────────────────────────────
  const triggerInvoiceUpload = (id: string) => {
    uploadTargetRef.current = id
    fileInputRef.current?.click()
  }

  const handleInvoiceFileChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const id = uploadTargetRef.current
    e.target.value = ''
    if (!file || !id) return

    setUploadingFor(id); setError(''); setSuccess('')
    try {
      await api.uploadInvoice(id, file)
      setSuccess(`Invoice uploaded for "${id}".`)
      fetchPayments()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload invoice.')
    } finally {
      setUploadingFor(null)
    }
  }

  // ── Installment helpers ────────────────────────────────────────────────────
  const addInstallment = () => setInstForm(prev => [...prev, { label: `Installment ${prev.length + 1}`, amount: 0, dueDate: form.dueDate, status: 'Pending' }])
  const updateInst = (idx: number, field: keyof Installment, value: string | number) => {
    setInstForm(prev => prev.map((inst, i) => i === idx ? { ...inst, [field]: value } : inst))
  }
  const removeInst = (idx: number) => setInstForm(prev => prev.filter((_, i) => i !== idx))

  // ── Filter ────────────────────────────────────────────────────────────────
  const filtered = payments.filter(p => {
    const matchSearch = !search || [p.paymentId, p.clientName, p.service].some(v => v?.toLowerCase().includes(search.toLowerCase()))
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="admin-shell min-h-screen" style={{ backgroundColor: '#FAF8F2', fontFamily: SANS }}>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 px-6 flex items-center justify-between h-14" style={{ backgroundColor: '#1A0A0E', borderBottom: '1px solid rgba(103,6,38,0.3)' }}>
        <div className="flex items-center gap-4">
          <span className="font-black uppercase" style={{ fontFamily: D, fontSize: '22px', color: '#FAF8F2' }}>ZOVENT</span>
          <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5" style={{ backgroundColor: 'rgba(103,6,38,0.4)', color: '#BAD797' }}>Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] hidden sm:block" style={{ color: 'rgba(250,248,242,0.4)' }}>
            {(JSON.parse(localStorage.getItem('say_admin') || '{}') as { email?: string }).email}
          </span>
          <button
            onClick={async () => {
              localStorage.removeItem('say_token')
              localStorage.removeItem('say_admin')
              clearAdminSession()
              window.location.assign('/admin/login')
            }}
            className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 transition-colors"
            style={{ border: '1px solid rgba(250,248,242,0.15)', color: 'rgba(250,248,242,0.5)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#670626'; (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,248,242,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,248,242,0.5)' }}
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-350 mx-auto px-6 py-10">

        {/* ── Alerts ── */}
        {error && <div className="mb-4 px-4 py-3 text-sm border" style={{ backgroundColor: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}>{error} <button onClick={() => setError('')} className="ml-2 opacity-60">✕</button></div>}
        {success && <div className="mb-4 px-4 py-3 text-sm border" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#15803d' }}>✓ {success}</div>}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {[
            { label: 'Total', value: stats.total, sub: 'records' },
            { label: 'Pending', value: stats.pending, sub: 'invoices', color: '#a16207' },
            { label: 'Partial', value: stats.partial, sub: 'payments', color: '#1d4ed8' },
            { label: 'Paid', value: stats.paid, sub: 'invoices', color: '#15803d' },
            { label: 'Revenue', value: fmt(stats.revenue), sub: 'collected', color: RED },
          ].map(s => (
            <div key={s.label} className="p-4" style={{ backgroundColor: '#fff', border: '1px solid rgba(103,6,38,0.08)' }}>
              <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.4)' }}>{s.label}</p>
              <p className="font-black text-[22px]" style={{ fontFamily: D, color: s.color || '#1A0A0E' }}>{s.value}</p>
              <p className="text-[10px]" style={{ color: 'rgba(26,10,14,0.4)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Create / Edit Form ── */}
        {showForm && (
          <div className="mb-8 p-6" style={{ backgroundColor: '#fff', border: `2px solid ${RED}` }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black uppercase" style={{ fontFamily: D, fontSize: '24px', color: '#1A0A0E' }}>
                {editId ? `Edit — ${editId}` : 'New Payment Record'}
              </h2>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(blankForm()); setInstForm([]) }} style={{ color: 'rgba(26,10,14,0.4)' }}>✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Payment ID */}
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: RED }}>Payment ID *</label>
                <input className={inp} value={form.paymentId} onChange={e => setForm(f => ({ ...f, paymentId: e.target.value.toUpperCase() }))} placeholder="ZOV-MICE-0001" disabled={!!editId} />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Client Name *</label>
                <input className={inp} value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} placeholder="Acme Corp" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Client Email</label>
                <input className={inp} type="email" value={form.clientEmail || ''} onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))} placeholder="client@company.com" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Client Phone</label>
                <input className={inp} value={form.clientPhone || ''} onChange={e => setForm(f => ({ ...f, clientPhone: e.target.value }))} placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Service</label>
                <select className={inp} value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Status</label>
                <select className={inp} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  {['Pending', 'Partial', 'Paid'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Description *</label>
                <input className={inp} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="MICE programme for 200 delegates — Annual Sales Conference 2025" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Total Amount (₹) *</label>
                <input className={inp} type="number" value={form.totalAmount || ''} onChange={e => setForm(f => ({ ...f, totalAmount: Number(e.target.value), baseAmount: Number(e.target.value), remainingAmount: Number(e.target.value) - (f.paidAmount || 0) }))} placeholder="500000" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Paid Amount (₹)</label>
                <input className={inp} type="number" value={form.paidAmount || ''} onChange={e => setForm(f => ({ ...f, paidAmount: Number(e.target.value), remainingAmount: (f.totalAmount || 0) - Number(e.target.value) }))} placeholder="0" />
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(26,10,14,0.5)' }}>Due Date</label>
                <input className={inp} type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="gst" checked={!!form.gstApplicable} onChange={e => setForm(f => ({ ...f, gstApplicable: e.target.checked }))} className="accent-cherry" />
                <label htmlFor="gst" className="text-[11px] uppercase tracking-wide" style={{ color: 'rgba(26,10,14,0.7)' }}>Apply GST</label>
                {form.gstApplicable && (
                  <input className={`${inp} w-24`} type="number" value={form.gstRate || 18} onChange={e => setForm(f => ({ ...f, gstRate: Number(e.target.value) }))} placeholder="18" />
                )}
              </div>
            </div>

            {/* ── Installments ── */}
            <div className="border-t pt-5 mb-5" style={{ borderColor: 'rgba(103,6,38,0.1)' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: RED }}>Installments (optional)</p>
                <button onClick={addInstallment} className="text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors" style={{ border: `1px solid ${RED}`, color: RED }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = RED; (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = RED }}
                >
                  + Add
                </button>
              </div>
              {instForm.length === 0 && <p className="text-[12px]" style={{ color: 'rgba(26,10,14,0.4)' }}>No installments — full amount due at once.</p>}
              {instForm.map((inst, idx) => (
                <div key={idx} className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 items-end">
                  <input className={inp} value={inst.label} onChange={e => updateInst(idx, 'label', e.target.value)} placeholder="Label" />
                  <input className={inp} type="number" value={inst.amount || ''} onChange={e => updateInst(idx, 'amount', Number(e.target.value))} placeholder="Amount ₹" />
                  <input className={inp} type="date" value={inst.dueDate} onChange={e => updateInst(idx, 'dueDate', e.target.value)} />
                  <div className="flex gap-2">
                    <select className={`${inp} flex-1`} value={inst.status} onChange={e => updateInst(idx, 'status', e.target.value)}>
                      <option>Pending</option><option>Paid</option>
                    </select>
                    <button onClick={() => removeInst(idx)} className="px-2 text-red-400 hover:text-red-600">✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-60"
                style={{ backgroundColor: RED, color: '#FAF8F2' }}
                onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLElement).style.backgroundColor = '#1A0A0E' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = RED }}
              >
                {saving ? 'SAVING...' : editId ? 'UPDATE RECORD' : 'CREATE RECORD'}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); setForm(blankForm()); setInstForm([]) }} className="px-6 py-3 text-[11px] tracking-[0.15em] uppercase" style={{ border: '1px solid rgba(103,6,38,0.2)', color: 'rgba(26,10,14,0.5)' }}>
                CANCEL
              </button>
            </div>
          </div>
        )}

        {/* ── Header + Controls ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <h1 className="font-black uppercase" style={{ fontFamily: D, fontSize: '32px', color: '#1A0A0E' }}>
            Payment Records
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <input
              className="px-3 py-2 text-sm border outline-none w-48"
              style={{ border: '1px solid rgba(103,6,38,0.2)', backgroundColor: '#fff' }}
              placeholder="Search ID / client..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="px-3 py-2 text-sm border outline-none"
              style={{ border: '1px solid rgba(103,6,38,0.2)', backgroundColor: '#fff' }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              {['Pending', 'Partial', 'Paid'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={fetchPayments} className="px-3 py-2 text-[10px] tracking-widest uppercase" style={{ border: '1px solid rgba(103,6,38,0.2)' }}>↻ Refresh</button>
            <button
              onClick={() => { setShowForm(true); setEditId(null); setForm(blankForm()); setInstForm([]) }}
              className="px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-bold transition-colors"
              style={{ backgroundColor: RED, color: '#FAF8F2' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1A0A0E' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = RED }}
            >
              + New Payment
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        {loading ? (
          <div className="py-20 text-center" style={{ color: 'rgba(26,10,14,0.4)' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center border border-dashed" style={{ borderColor: 'rgba(103,6,38,0.15)', color: 'rgba(26,10,14,0.4)' }}>
            <p className="font-black uppercase mb-2" style={{ fontFamily: D, fontSize: '28px' }}>No Records Found</p>
            <p className="text-sm">Create your first payment record to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(103,6,38,0.15)' }}>
                  {['Reference', 'Client', 'Service', 'Amount', 'Due', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-3 py-3 text-[9px] uppercase tracking-widest font-bold" style={{ color: 'rgba(26,10,14,0.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.paymentId}
                    style={{ borderBottom: '1px solid rgba(103,6,38,0.06)', backgroundColor: i % 2 === 0 ? '#fff' : '#FAF8F2' }}
                  >
                    <td className="px-3 py-3">
                      <span className="font-black text-[13px]" style={{ fontFamily: D, color: '#1A0A0E' }}>{p.paymentId}</span>
                      {p.installments?.length ? <span className="ml-2 text-[9px] px-1.5 py-0.5" style={{ backgroundColor: '#F2E6EA', color: RED }}>{p.installments.length} inst.</span> : null}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-semibold">{p.clientName}</p>
                      <p className="text-[10px]" style={{ color: 'rgba(26,10,14,0.4)' }}>{p.clientEmail}</p>
                    </td>
                    <td className="px-3 py-3 text-[12px]" style={{ color: 'rgba(26,10,14,0.6)', maxWidth: '160px' }}>{p.service}</td>
                    <td className="px-3 py-3">
                      <p className="font-black" style={{ fontFamily: D, fontSize: '16px' }}>{fmt(p.totalAmount)}</p>
                      {p.paidAmount != null && p.paidAmount > 0 && (
                        <p className="text-[10px]" style={{ color: '#15803d' }}>Paid: {fmt(p.paidAmount)}</p>
                      )}
                    </td>
                    <td className="px-3 py-3 text-[12px]" style={{ color: 'rgba(26,10,14,0.6)' }}>
                      {new Date(p.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-1 text-[9px] uppercase tracking-widest font-bold" style={{ backgroundColor: statusColor(p.status).bg, color: statusColor(p.status).text }}>
                        {p.status}
                      </span>
                      {txnId(p) && (
                        <p
                          className="mt-1.5 text-[10px] font-mono cursor-pointer hover:underline"
                          style={{ color: 'rgba(26,10,14,0.4)' }}
                          title="Click to copy Razorpay payment ID"
                          onClick={() => { navigator.clipboard.writeText(txnId(p)); setSuccess(`Transaction ID copied: ${txnId(p)}`); setTimeout(() => setSuccess(''), 3000) }}
                        >
                          {txnId(p)}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-3 relative">
                      <button
                        onClick={() => setMenuOpenFor(menuOpenFor === p.paymentId ? null : p.paymentId)}
                        title="Actions"
                        className="w-8 h-8 flex items-center justify-center text-lg leading-none transition-colors"
                        style={{ border: '1px solid rgba(103,6,38,0.2)', color: '#1A0A0E' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F2E6EA' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                      >
                        ⋮
                      </button>

                      {menuOpenFor === p.paymentId && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setMenuOpenFor(null)} />
                          <div
                            className="absolute right-3 top-full mt-1 z-20 py-1"
                            style={{ backgroundColor: '#fff', border: '1px solid rgba(103,6,38,0.15)', boxShadow: '0 8px 24px rgba(26,10,14,0.14)', minWidth: '180px' }}
                          >
                            <button onClick={() => { copyLink(p.paymentId); setMenuOpenFor(null) }} className={menuItemCls}>
                              Copy Link
                            </button>
                            <button onClick={() => { openEdit(p); setMenuOpenFor(null) }} className={menuItemCls}>
                              Edit
                            </button>
                            {p.status !== 'Paid' && (
                              <button onClick={() => { markPaid(p); setMenuOpenFor(null) }} className={menuItemCls} style={{ color: '#15803d' }}>
                                Mark Paid
                              </button>
                            )}
                            <button
                              onClick={() => { triggerInvoiceUpload(p.paymentId); setMenuOpenFor(null) }}
                              disabled={uploadingFor === p.paymentId}
                              className={`${menuItemCls} disabled:opacity-50`}
                            >
                              {uploadingFor === p.paymentId ? 'Uploading…' : p.invoiceUrl ? 'Replace Invoice' : 'Upload Invoice'}
                            </button>
                            {p.invoiceUrl && (
                              <a
                                href={assetUrl(p.invoiceUrl)}
                                target="_blank" rel="noopener noreferrer"
                                onClick={() => setMenuOpenFor(null)}
                                className={menuItemCls}
                              >
                                View Invoice
                              </a>
                            )}
                            <button onClick={() => { handleDelete(p.paymentId); setMenuOpenFor(null) }} className={menuItemCls} style={{ color: '#dc2626' }}>
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-[10px]" style={{ color: 'rgba(26,10,14,0.3)' }}>
          {filtered.length} of {payments.length} records shown
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleInvoiceFileChosen}
        />
      </div>
    </div>
  )
}
