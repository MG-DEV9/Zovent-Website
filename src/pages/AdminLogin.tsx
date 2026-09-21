import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { api, clearAdminSession } from '../lib/api'

const D    = "'Cormorant Garamond', Georgia, serif"
const SANS = "'Manrope', system-ui, sans-serif"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    clearAdminSession()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()

    setLoading(true)
    setError('')
    try {
      const result = await api.login(normalizedEmail, password)
      localStorage.setItem('say_token', result.token)
      localStorage.setItem('say_admin', JSON.stringify(result.admin))
      navigate('/admin', { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="admin-shell min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#1A0A0E' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #670626 0, #670626 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
      }} />

      <div className="relative w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#BAD797', fontFamily: SANS }}>
            [ ADMIN PORTAL ]
          </p>
          <h1 className="font-black uppercase leading-none" style={{ fontFamily: D, fontSize: 'clamp(40px, 8vw, 64px)', color: '#FAF8F2', letterSpacing: '-0.02em' }}>
            ZOVENT.
          </h1>
        </div>

        {/* Card */}
        <div className="p-8" style={{ backgroundColor: 'rgba(250,248,242,0.04)', border: '1px solid rgba(250,248,242,0.08)' }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(250,248,242,0.4)', fontFamily: SANS }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="chiranjeeb@sayexperiences.com"
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  backgroundColor: 'rgba(250,248,242,0.06)',
                  border: '1px solid rgba(250,248,242,0.12)',
                  color: '#FAF8F2',
                  fontFamily: SANS,
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#670626' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(250,248,242,0.12)' }}
              />
            </div>

            <div>
              <label className="block text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(250,248,242,0.4)', fontFamily: SANS }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="sayexperiences"
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  backgroundColor: 'rgba(250,248,242,0.06)',
                  border: '1px solid rgba(250,248,242,0.12)',
                  color: '#FAF8F2',
                  fontFamily: SANS,
                }}
                onFocus={e => { e.currentTarget.style.borderColor = '#670626' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(250,248,242,0.12)' }}
              />
            </div>

            {error && (
              <p className="text-[11px] px-3 py-2 border" style={{ color: '#fca5a5', backgroundColor: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-[11px] tracking-[0.2em] uppercase font-bold transition-colors disabled:opacity-50 mt-2"
              style={{ backgroundColor: '#670626', color: '#FAF8F2', fontFamily: SANS }}
              onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF8F2'; (e.currentTarget as HTMLElement).style.color = '#670626' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#670626'; (e.currentTarget as HTMLElement).style.color = '#FAF8F2' }}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN →'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-[10px]" style={{ color: 'rgba(250,248,242,0.2)', fontFamily: SANS }}>
          Access restricted to Zovent administrators only.
        </p>
      </div>
    </div>
  )
}
