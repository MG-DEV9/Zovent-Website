/**
 * Razorpay type declarations and script loader utility.
 * Razorpay Checkout.js is loaded on-demand (not bundled) to keep initial JS small.
 */

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  image?: string
  order_id: string
  prefill?: { name?: string; email?: string; contact?: string }
  theme?: { color?: string }
  modal?: { escape?: boolean; ondismiss?: () => void }
  handler?: (response: RazorpaySuccessResponse) => void
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface RazorpayFailedResponse {
  error: { description: string; code?: string }
}

export interface RazorpayInstance {
  open(): void
  on(event: 'payment.failed', handler: (response: RazorpayFailedResponse) => void): void
}

// Window.Razorpay is declared in Payment copy.tsx — no duplicate global needed here.
// Use (window as any).Razorpay in consuming code to avoid merge conflicts.

/** Dynamically load Razorpay Checkout.js once, then resolve. */
export function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Razorpay SDK failed to load. Check your network connection.'))
    document.body.appendChild(script)
  })
}
