const Payment = require('../models/Payment');
const Transaction = require('../models/Transaction');
const Customer = require('../models/Customer');

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Re-derive paidAmount and overall status from installments. */
const syncStatus = (payment) => {
  if (!payment.installments || payment.installments.length === 0) return;
  const paid = payment.installments
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);
  payment.paidAmount = paid;
  const all = payment.installments.length;
  const paidCount = payment.installments.filter((i) => i.status === 'Paid').length;
  if (paidCount === 0)   payment.status = 'Pending';
  else if (paidCount === all) payment.status = 'Paid';
  else                   payment.status = 'Partial';
};

// ─── Public — client fetch by reference ID ────────────────────────────────────

exports.getPaymentById = async (req, res) => {
  const p = await Payment.findOne({ paymentId: req.params.paymentId.toUpperCase() });
  if (!p) return res.status(404).json({ message: 'Payment reference not found.' });
  // A fully-paid record stays viewable (e.g. to view/download the invoice) — only
  // an unpaid, past-due link is blocked.
  if (p.status !== 'Paid' && new Date(p.dueDate) < new Date()) {
    return res.status(410).json({ message: 'This payment link has expired. Please contact the SAY Experiences team.' });
  }
  res.json(p);
};

// ─── Admin — list with optional filters ──────────────────────────────────────

exports.getAllPayments = async (req, res) => {
  const { status, service, search } = req.query;
  const filter = {};
  if (status)  filter.status  = status;
  if (service) filter.service = service;
  if (search)  filter['$or']  = [
    { paymentId:  { $regex: search, $options: 'i' } },
    { clientName: { $regex: search, $options: 'i' } },
    { clientEmail: { $regex: search, $options: 'i' } },
  ];
  res.json(await Payment.find(filter).sort({ createdAt: -1 }));
};

// ─── Admin — create ───────────────────────────────────────────────────────────

exports.createPayment = async (req, res) => {
  const exists = await Payment.findOne({ paymentId: req.body.paymentId?.toUpperCase() });
  if (exists) return res.status(409).json({ message: 'Reference ID already exists.' });

  const body = { ...req.body, paymentId: req.body.paymentId.toUpperCase(), createdBy: req.admin.id };

  // Mirror totalAmount → baseAmount for backwards compat
  if (body.totalAmount) body.baseAmount = body.totalAmount;

  const p = await Payment.create(body);
  res.status(201).json(p);
};

// ─── Admin — update ───────────────────────────────────────────────────────────

exports.updatePayment = async (req, res) => {
  const body = { ...req.body };
  if (body.totalAmount) body.baseAmount = body.totalAmount;

  const filter = req.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: req.params.id }
    : { paymentId: req.params.id.toUpperCase() };
  const p = await Payment.findOneAndUpdate(filter, body, {
    new: true, runValidators: true,
  });
  if (!p) return res.status(404).json({ message: 'Not found.' });
  res.json(p);
};

// ─── Admin — upload invoice file ───────────────────────────────────────────────

exports.uploadInvoice = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

  const filter = req.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: req.params.id }
    : { paymentId: req.params.id.toUpperCase() };

  const p = await Payment.findOneAndUpdate(
    filter,
    { invoiceUrl: `/uploads/invoices/${req.file.filename}`, invoiceFileName: req.file.originalname },
    { new: true }
  );
  if (!p) return res.status(404).json({ message: 'Not found.' });
  res.json(p);
};

// ─── Admin — delete ───────────────────────────────────────────────────────────

exports.deletePayment = async (req, res) => {
  const filter = req.params.id.match(/^[0-9a-fA-F]{24}$/)
    ? { _id: req.params.id }
    : { paymentId: req.params.id.toUpperCase() };
  const p = await Payment.findOne(filter);
  if (!p)                  return res.status(404).json({ message: 'Not found.' });
  if (p.status === 'Paid') return res.status(400).json({ message: 'Cannot delete a paid record.' });
  await p.deleteOne();
  res.json({ message: 'Deleted.' });
};

// ─── Admin — mark a single installment as paid ────────────────────────────────

exports.markInstallmentPaid = async (req, res) => {
  const { id, idx } = req.params;
  const p = await Payment.findById(id);
  if (!p) return res.status(404).json({ message: 'Payment not found.' });

  const index = parseInt(idx, 10);
  if (isNaN(index) || index < 0 || index >= p.installments.length) {
    return res.status(400).json({ message: 'Invalid installment index.' });
  }

  if (p.installments[index].status === 'Paid') {
    return res.status(400).json({ message: 'Installment is already marked paid.' });
  }

  p.installments[index].status = 'Paid';
  p.installments[index].paidOn = new Date();
  syncStatus(p);
  await p.save();
  res.json(p);
};

// ─── Admin — unmark a single installment (reset to Pending) ──────────────────

exports.unmarkInstallment = async (req, res) => {
  const { id, idx } = req.params;
  const p = await Payment.findById(id);
  if (!p) return res.status(404).json({ message: 'Payment not found.' });

  const index = parseInt(idx, 10);
  if (isNaN(index) || index < 0 || index >= p.installments.length) {
    return res.status(400).json({ message: 'Invalid installment index.' });
  }

  p.installments[index].status = 'Pending';
  p.installments[index].paidOn = undefined;
  syncStatus(p);
  await p.save();
  res.json(p);
};

// ─── Public — mock payment (no gateway) ──────────────────────────────────────

exports.mockPay = async (req, res) => {
  const { paymentId, amount, gstApplied, clientName, clientEmail, clientPhone, clientMessage } = req.body;
  const p = await Payment.findOne({ paymentId });
  if (!p || p.status === 'Paid') {
    return res.status(400).json({ message: 'Invalid or already-paid reference.' });
  }

  const customer = await Customer.findOneAndUpdate(
    { email: clientEmail.toLowerCase(), phone: clientPhone },
    { name: clientName, email: clientEmail, phone: clientPhone, notes: clientMessage, lastPaymentId: paymentId },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const orderId = `MOCK-${paymentId}-${Date.now()}`;

  await Transaction.create({
    customer: customer._id,
    paymentId,
    orderId,
    amount,
    baseAmount: p.totalAmount || p.baseAmount,
    gstApplied,
    clientName,
    clientEmail,
    clientPhone,
    clientMessage,
    status: 'paid',
  });

  await Payment.findOneAndUpdate(
    { paymentId },
    { status: 'Paid', paidAmount: parseFloat(amount) }
  );

  res.json({ message: 'Payment successful.', orderId });
};
