import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import Root from './layouts/Root'
import Home from './pages/Home'
import RouteFallback from './components/RouteFallback'

// ── Lazy-loaded routes — code-split so the initial bundle only ships
// the layout shell and the home page; everything else loads on demand. ──────
const lazyPage = (loader: () => Promise<{ default: ComponentType }>) => async () => {
  const { default: Component } = await loader()
  return { Component }
}

export const router = createBrowserRouter([
  // ── Public site (with Header + Footer) ───────────────────────────────────
  {
    path: '/',
    Component: Root,
    HydrateFallback: RouteFallback,
    children: [
      { index: true, Component: Home },
      { path: 'about', lazy: lazyPage(() => import('./pages/About')) },
      { path: 'services', lazy: lazyPage(() => import('./pages/Services')) },
      { path: 'services/:id', lazy: lazyPage(() => import('./pages/ServiceDetail')) },
      { path: 'blog', lazy: lazyPage(() => import('./pages/Blog')) },
      { path: 'blog/:slug', lazy: lazyPage(() => import('./pages/BlogPost')) },
      { path: 'gallery', lazy: lazyPage(() => import('./pages/Gallery')) },
      { path: 'contact', lazy: lazyPage(() => import('./pages/Contact')) },
      { path: 'privacy', lazy: lazyPage(() => import('./pages/Privacy')) },
      { path: 'terms', lazy: lazyPage(() => import('./pages/Terms')) },
      { path: 'refunds', lazy: lazyPage(() => import('./pages/Refunds')) },
      { path: 'payment', lazy: lazyPage(() => import('./pages/Payment')) },
      { path: 'payment/:paymentId', lazy: lazyPage(() => import('./pages/Payment')) },
      { path: '*', lazy: lazyPage(() => import('./pages/NotFound')) },
    ],
  },
  // ── Admin routes (no Header/Footer) ──────────────────────────────────────
  { path: '/admin/login', HydrateFallback: RouteFallback, lazy: lazyPage(() => import('./pages/AdminLogin')) },
  { path: '/admin', HydrateFallback: RouteFallback, lazy: lazyPage(() => import('./pages/AdminGuard')) },
  { path: '/admin/payments', HydrateFallback: RouteFallback, lazy: lazyPage(() => import('./pages/AdminGuard')) },
])
