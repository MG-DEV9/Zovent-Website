import { createBrowserRouter } from 'react-router'
import Root from './layouts/Root'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Refunds from './pages/Refunds'
import Payment from './pages/Payment'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminPayments from './pages/AdminPayments'
import ProtectedRoute from './components/ProtectedRoute'

// ── Admin wrapper — renders without Header/Footer ────────────────────────────
function AdminGuard() {
  return (
    <ProtectedRoute>
      <AdminPayments />
    </ProtectedRoute>
  )
}

export const router = createBrowserRouter([
  // ── Public site (with Header + Footer) ───────────────────────────────────
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'services', Component: Services },
      { path: 'services/:id', Component: ServiceDetail },
      { path: 'blog', Component: Blog },
      { path: 'blog/:slug', Component: BlogPost },
      { path: 'gallery', Component: Gallery },
      { path: 'contact', Component: Contact },
      { path: 'privacy', Component: Privacy },
      { path: 'terms', Component: Terms },
      { path: 'refunds', Component: Refunds },
      { path: 'payment', Component: Payment },
      { path: 'payment/:paymentId', Component: Payment },
      { path: '*', Component: NotFound },
    ],
  },
  // ── Admin routes (no Header/Footer) ──────────────────────────────────────
  { path: '/admin/login', Component: AdminLogin },
  { path: '/admin', Component: AdminGuard },
  { path: '/admin/payments', Component: AdminGuard },
])
