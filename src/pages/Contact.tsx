import { useRef, useState, type FormEvent, type ChangeEvent } from "react"
import { Link } from "react-router"
import emailjs from "@emailjs/browser"

const D = "'Cormorant Garamond', Georgia, serif"
const L = "'Manrope', system-ui, sans-serif"
const B = "Georgia, 'Times New Roman', serif"

const eventTypes = [
  "Corporate Conference / Meeting",
  "MICE Programme",
  "Offsite / Team Building",
  "Brand Activation",
  "Award Ceremony / Gala",
  "Corporate Travel",
  "Other",
]
const offices = [
  {
    city: "GURUGRAM",
    // address: "Level 12, One BKC Tower, Bandra Kurla Complex, Mumbai 400051",
    phone: "+918800753816",
    email: "info@zovents.com",
  },
  {
    city: "KOLKATA",
    // address: "Suite 801, DLF Cyber City, Gurugram, Haryana 122002",
    phone: "+918800753816",
    email: "info@zovents.com",
  },
  {
    city: "PUNE",
    // address: "4th Floor, Prestige Tech Park, Outer Ring Road, Bengaluru 560103",
    phone: "+918800753816",
    email: "info@zovents.com",
  },
]

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  fontSize: "13px",
  backgroundColor: "#FAF8F2",
  border: "1px solid rgba(103,6,38,0.2)",
  color: "#1A0A0E",
  outline: "none",
  fontFamily: B,
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    delegates: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)
  const [sendError, setSendError] = useState('')
  const [focused, setFocused]     = useState<string | null>(null)
  const formRef                   = useRef<HTMLFormElement>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setSending(true)
    setSendError('')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
    } catch {
      setSendError('Failed to send your message. Please email us directly at info@zovents.com')
    } finally {
      setSending(false)
    }
  }

  const fieldStyle = (name: string) => ({
    ...inputStyle,
    borderColor: focused === name ? "#670626" : "rgba(103,6,38,0.2)",
    transition: "border-color 0.18s ease",
  })

  return (
    <div style={{ backgroundColor: "#FAF8F2", color: "#1A0A0E", fontFamily: B }}>
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-end px-6 lg:px-12 overflow-hidden"
        style={{
          minHeight: "55vh",
          paddingTop: "68px",
          backgroundColor: "#670626",
          borderBottom: "1px solid rgba(103,6,38,0.1)",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&h=900&fit=crop&auto=format"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18, mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #670626 30%, rgba(103,6,38,0.72) 65%, rgba(103,6,38,0.3) 100%)' }} />
        <div className="relative z-10 max-w-[1440px] mx-auto pb-16 w-full">
          <p
            className="text-[11px] tracking-[0.22em] uppercase mb-5"
            style={{ color: "rgba(250,248,242,0.7)", fontFamily: L }}
          >
            [ GET IN TOUCH ]
          </p>
          <h1
            className="font-black uppercase leading-none"
            style={{ fontFamily: D, fontSize: "clamp(48px, 9vw, 120px)", color: "#FAF8F2" }}
          >
            LET'S PLAN
            <br />
            SOMETHING
            <br />
            EXCEPTIONAL.
          </h1>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <p
              className="text-[11px] tracking-[0.22em] uppercase mb-4"
              style={{ color: "#670626", fontFamily: L }}
            >
              [ REQUEST A PROPOSAL ]
            </p>
            <h2
              className="font-black uppercase leading-none mb-12"
              style={{ fontFamily: D, fontSize: "clamp(32px, 4vw, 56px)", color: "#1A0A0E" }}
            >
              TELL US ABOUT
              <br />
              YOUR EVENT.
            </h2>

            {submitted ? (
              <div
                className="p-12 text-center"
                style={{
                  backgroundColor: "#F2E6EA",
                  border: "1px solid rgba(103,6,38,0.15)",
                }}
              >
                <p
                  className="font-black uppercase mb-3"
                  style={{ fontFamily: D, fontSize: "56px", color: "#670626" }}
                >
                  ✓
                </p>
                <h3
                  className="font-black uppercase mb-3"
                  style={{ fontFamily: D, fontSize: "36px", color: "#1A0A0E" }}
                >
                  ENQUIRY RECEIVED
                </h3>
                <p
                  className="text-[13px]"
                  style={{ color: "rgba(26,10,14,0.45)" }}
                >
                  A Zovent specialist will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "name",
                      label: "Full Name",
                      type: "text",
                      placeholder: "Anjali Roy",
                      required: true,
                    },
                    {
                      name: "company",
                      label: "Company",
                      type: "text",
                      placeholder: "Acme Corp",
                      required: true,
                    },
                  ].map((f) => (
                    <div key={f.name}>
                      <label
                        className="block text-[9px] tracking-[0.2em] uppercase mb-2"
                        style={{
                          color: "#1A0A0E",
                          fontFamily: L,
                        }}
                      >
                        {f.label} {f.required && "*"}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        required={f.required}
                        value={(form as any)[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        style={fieldStyle(f.name)}
                        onFocus={() => setFocused(f.name)}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-[9px] tracking-[0.2em] uppercase mb-2"
                      style={{ color: "#1A0A0E", fontFamily: L }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="anjali@company.com"
                      style={fieldStyle("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[9px] tracking-[0.2em] uppercase mb-2"
                      style={{ color: "#1A0A0E", fontFamily: L }}
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      style={fieldStyle("phone")}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-[9px] tracking-[0.2em] uppercase mb-2"
                      style={{ color: "#1A0A0E", fontFamily: L }}
                    >
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      required
                      value={form.eventType}
                      onChange={handleChange}
                      style={{
                        ...fieldStyle("eventType"),
                        color: form.eventType
                          ? "#1A0A0E"
                          : "rgba(26,10,14,0.3)",
                      }}
                      onFocus={() => setFocused("eventType")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      {eventTypes.map((t) => (
                        <option
                          key={t}
                          value={t}
                          style={{ backgroundColor: "#FAF8F2" }}
                        >
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-[9px] tracking-[0.2em] uppercase mb-2"
                      style={{ color: "#1A0A0E", fontFamily: L }}
                    >
                      Expected Date
                    </label>
                    <input
                      type="month"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      style={fieldStyle("date")}
                      onFocus={() => setFocused("date")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block text-[9px] tracking-[0.2em] uppercase mb-2"
                    style={{ color: "#1A0A0E", fontFamily: L }}
                  >
                    Estimated Delegates
                  </label>
                  <input
                    type="number"
                    name="delegates"
                    value={form.delegates}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    style={fieldStyle("delegates")}
                    onFocus={() => setFocused("delegates")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label
                    className="block text-[9px] tracking-[0.2em] uppercase mb-2"
                    style={{ color: "#1A0A0E", fontFamily: L }}
                  >
                    Tell Us More *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your event, objectives, location preferences..."
                    style={{ ...fieldStyle("message"), resize: "none" }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                {sendError && (
                  <p className="text-[11px] py-2 px-3 border" style={{ color: '#991b1b', backgroundColor: '#fef2f2', borderColor: '#fca5a5' }}>
                    {sendError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 text-[12px] tracking-[0.18em] uppercase font-semibold transition-all disabled:opacity-60"
                  style={{
                    backgroundColor: "#670626",
                    color: "#FAF8F2",
                    fontFamily: L,
                  }}
                  onMouseEnter={(e) => {
                    if (!sending) (e.currentTarget as HTMLElement).style.backgroundColor = "#1A0A0E"
                  }}
                  onMouseLeave={(e) => {
                    ; (e.currentTarget as HTMLElement).style.backgroundColor = "#670626"
                  }}
                >
                  {sending ? '[ SENDING... ]' : '[ SUBMIT ENQUIRY ] →'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p
                className="text-[11px] tracking-[0.22em] uppercase mb-8"
                style={{ color: "#670626", fontFamily: L }}
              >
                [ OUR OFFICES ]
              </p>
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="mb-8 pb-8"
                  style={{ borderBottom: "1px solid rgba(103,6,38,0.1)" }}
                >
                  <h3
                    className="font-black uppercase text-lg mb-3"
                    style={{ fontFamily: D, color: "#1A0A0E" }}
                  >
                    {office.city}
                  </h3>
                  {/* <p
                    className="text-[12px] leading-relaxed mb-2"
                    style={{ color: "rgba(26,10,14,0.4)" }}
                  >
                    {office.address}
                  </p> */}
                  <a
                    href={`tel:${office.phone}`}
                    className="text-[12px] block mb-1 hover:text-[#670626] transition-colors"
                    style={{ color: "rgba(26,10,14,0.55)", fontFamily: "'Times New Roman', Times, serif" }}
                  >
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="text-[12px] hover:text-[#670626] transition-colors"
                    style={{ color: "#670626" }}
                  >
                    {office.email}
                  </a>
                </div>
              ))}
            </div>

            <div
              className="p-6"
              style={{
                backgroundColor: "#F2E6EA",
                border: "1px solid rgba(103,6,38,0.1)",
              }}
            >
              <p
                className="text-[9px] tracking-[0.22em] uppercase mb-3"
                style={{ color: "#670626", fontFamily: L }}
              >
                [ RESPONSE TIME ]
              </p>
              <p
                className="font-black uppercase mb-2"
                style={{ fontFamily: 'Times New Roman', fontSize: "28px", color: "#1A0A0E" }}
              >
                WITHIN 24 HOURS.
              </p>
              <p
                className="text-[12px]"
                style={{ color: "rgba(26,10,14,0.4)" }}
              >
                All enquiries reviewed by a senior event specialist.
              </p>
            </div>

            <div>
              <p
                className="text-[11px] tracking-[0.15em] uppercase mb-3"
                style={{ color: "#670626", fontFamily: L }}
              >
                [ DIRECT LINE ]
              </p>
              <a
                href="tel:+918800753816"
                className="font-black uppercase leading-none hover:text-[#670626] transition-colors"
                style={{
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "clamp(28px, 3vw, 42px)",
                  color: "#1A0A0E",
                }}
              >
                +91 8800753816
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
