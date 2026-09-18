import { createOrder, verifyPayment } from './api';

const loadScript = () =>
  new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const s   = document.createElement('script');
    s.src     = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload  = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

export const initiatePayment = async ({
  paymentId, amount, gstApplied,
  clientName, clientEmail, clientPhone, clientMessage,
  onSuccess, onFailure,
}) => {
  const loaded = await loadScript();
  if (!loaded) return onFailure('Razorpay SDK failed to load. Check your internet connection.');

  const { data } = await createOrder({
    paymentId, amount, gstApplied,
    clientName, clientEmail, clientPhone, clientMessage,
  });

  const options = {
    key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:      data.amount,
    currency:    'INR',
    name:        'SAY Experiences',
    description: 'Reference: ' + paymentId,
    image:       'https://www.sayexperiences.com/favicon.ico',
    order_id:    data.orderId,
    prefill:     { name: clientName, email: clientEmail, contact: clientPhone },
    theme:       { color: '#c9a660' },
    modal:       { escape: false },
    handler: async response => {
      try {
        await verifyPayment({ ...response, paymentId, amount });
        onSuccess(response);
      } catch (err) {
        onFailure(err.response?.data?.message || 'Verification failed.');
      }
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', r => onFailure(r.error.description));
  rzp.open();
};
