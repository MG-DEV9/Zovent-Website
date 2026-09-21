import { type ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router'

/**
 * Wraps admin routes — redirects to /admin/login if not authenticated.
 * Shows a blank screen while the local JWT session is checked (prevents flash).
 */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'authed' | 'guest'>('loading')

  useEffect(() => {
    setStatus(localStorage.getItem('say_token') ? 'authed' : 'guest')
  }, [])

  if (status === 'loading') {
    return (
      <div className="admin-shell min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1A0A0E' }}>
        <div className="w-5 h-5 border-2 border-[#670626] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return status === 'authed' ? <>{children}</> : <Navigate to="/admin/login" replace />
}
