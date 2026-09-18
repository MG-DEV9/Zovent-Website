'use strict';
const crypto      = require('crypto');
const Razorpay    = require('razorpay');
const Payment     = require('../models/Payment');
const Transaction = require('../models/Transaction');
const Customer    = require('../models/Customer');

const getRazorpay = () => {
  const key_id     = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials are not configured on the server.');
  }
  return new Razorpay({ key_id, key_secret });
};

/** Re-sync paidAmount and status from installments array */
const syncStatus = (payment) => {
  if (!payment.installments || payment.installments.length === 0) return;
  const paid = payment.installments
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);
  payment.paidAmount = paid;
  const all       = payment.installments.length;
  const paidCount = payment.installments.filter((i) => i.status === 'Paid').length;
  if (paidCount === 0)    payment.status = 'Pending';
  else if (paidCount === all) payment.status = 'Paid';
  else                    payment.status = 'Partial';
};

/**
 * POST /api/razorpay/create-order
 *
 * Accepts an optional `installmentIdx` so a client can pay a specific
 * installment. The amount is taken from the request body (already calculated
 * by the frontend), and the installment index is stored in the Transaction
 * for later marking on verify.
 */
exports.createOrder = async (req, res) => {
  const {
    paymentId,
    amount,
    gstApplied,
    clientName,
    clientEmail,
    clientPhone,
    clientMessage,
    installmentIdx,   // optional – index into payment.installments[]
  } = req.body;

  // Validate amount (Razorpay minimum is ₹1 = 100 paise)
  const amountPaise = Math.round(amount * 100);
  if (!amountPaise || amountPaise < 100) {
    return res.status(400).json({ message: 'Amount must be at least ₹1.' });
  }

  const payment = await Payment.findOne({ paymentId });
  if (!payment || payment.status === 'Paid') {
    return res.status(400).json({ message: 'Invalid or already-paid reference.' });
  }

  // If an installment index is supplied, validate it
  if (installmentIdx !== undefined && installmentIdx !== null) {
    const idx = parseInt(installmentIdx, 10);
    if (isNaN(idx) || idx < 0 || idx >= payment.installments.length) {
      return res.status(400).json({ message: 'Invalid installment index.' });
    }
    if (payment.installments[idx].status === 'Paid') {
      return res.status(400).json({ message: 'This installment has already been paid.' });
    }
  }

  const razorpay = getRazorpay();

  const order = await razorpay.orders.create({
    amount:   amountPaise,
    currency: 'INR',
    receipt:  `rcpt_${paymentId}_${Date.now()}`,
    notes: {
      paymentId,
      clientName,
      gstApplied:     String(gstApplied),
      installmentIdx: installmentIdx !== undefined ? String(installmentIdx) : '',
    },
  });

  const customer = await Customer.findOneAndUpdate(
    { email: clientEmail.toLowerCase(), phone: clientPhone },
    {
      name:          clientName,
      email:         clientEmail,
      phone:         clientPhone,
      notes:         clientMessage,
      lastPaymentId: paymentId,
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  await Transaction.create({
    customer:       customer._id,
    paymentId,
    orderId:        order.id,
    amount,
    baseAmount:     payment.totalAmount || payment.baseAmount,
    gstApplied,
    clientName,
    clientEmail,
    clientPhone,
    clientMessage,
    installmentIdx: (installmentIdx !== undefined && installmentIdx !== null) ? parseInt(installmentIdx, 10) : null,
    status:         'created',
  });

  res.json({
    orderId:  order.id,
    amount:   order.amount,
    currency: order.currency,
  });
};

/**
 * POST /api/razorpay/verify
 *
 * Verifies the Razorpay signature. On success, marks the specific installment
 * (if supplied) as Paid, then re-syncs overall payment status.
 * Falls back to marking the whole payment Paid if no installments exist.
 */
exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paymentId,
    amount,
    installmentIdx,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: 'Missing required payment fields.' });
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) {
    return res.status(500).json({ message: 'Payment gateway is not configured on the server.' });
  }

  // HMAC-SHA256 signature verification
  const generatedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ message: 'Payment verification failed: signature mismatch.' });
  }

  // Mark Transaction as paid with Razorpay ID
  await Transaction.findOneAndUpdate(
    { orderId: razorpay_order_id },
    { status: 'paid', razorpayPaymentId: razorpay_payment_id }
  );

  // Update payment record
  const payment = await Payment.findOne({ paymentId });
  if (!payment) {
    return res.status(404).json({ message: 'Payment record not found.' });
  }

  const idx = installmentIdx !== undefined && installmentIdx !== null
    ? parseInt(installmentIdx, 10)
    : null;

  if (idx !== null && !isNaN(idx) && payment.installments && payment.installments[idx]) {
    // Mark this specific installment as paid
    payment.installments[idx].status = 'Paid';
    payment.installments[idx].paidOn = new Date();
    syncStatus(payment);
  } else {
    // No installments — mark whole payment as paid (legacy / simple payment)
    payment.status    = 'Paid';
    payment.paidAmount = parseFloat(amount);
  }

  await payment.save();

  res.json({ message: 'Payment verified successfully.', razorpay_payment_id });
};
