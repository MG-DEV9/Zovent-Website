import ProtectedRoute from '../components/ProtectedRoute'
import AdminPayments from './AdminPayments'

// ── Admin wrapper — renders without Header/Footer ────────────────────────────
export default function AdminGuard() {
  return (
    <ProtectedRoute>
      <AdminPayments />
    </ProtectedRoute>
  )
}
