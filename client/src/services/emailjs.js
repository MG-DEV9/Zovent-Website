import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

/**
 * Send payment confirmation email to client via EmailJS.
 * Set up your EmailJS template with these variables:
 *   {{to_email}}, {{client_name}}, {{payment_id}},
 *   {{amount_paid}}, {{service}}, {{transaction_id}}, {{date}}
 */
export const sendConfirmationEmail = ({ toEmail, clientName, paymentId, amount, service, txId }) =>
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      to_email:       toEmail,
      client_name:    clientName,
      payment_id:     paymentId,
      amount_paid:    amount,
      service,
      transaction_id: txId,
      date:           new Date().toLocaleDateString('en-IN', { dateStyle: 'long' }),
      brand:          'SAY Experiences',
    }
  );
