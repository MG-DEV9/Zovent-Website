const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema(
  {
    label:   { type: String, required: true, trim: true },  // e.g. "1st Payment"
    amount:  { type: Number, required: true, min: 0 },
    dueDate: { type: Date,   required: true },
    status:  { type: String, default: 'Pending', enum: ['Pending', 'Paid'] },
    paidOn:  { type: Date },
    razorpayPaymentId: { type: String, default: '' },
  },
  { _id: true }
);

const paymentSchema = new mongoose.Schema(
  {
    // SAY Experiences reference format: SAY-WED-0001
    paymentId: {
      type: String, required: true, unique: true,
      trim: true, uppercase: true,
      match: [/^[A-Z]+-[A-Z0-9-]+$/, 'Use an uppercase payment reference such as ZOV-MICE-001'],
    },

    clientName:    { type: String, required: true, trim: true },
    clientEmail:   { type: String, trim: true, default: '' },
    clientPhone:   { type: String, trim: true, default: '' },

    service: {
      type: String, required: true,
      enum: [
        'Wedding', 'MICE', 'Corporate', 'Travel', 'Social Event', 'Healthcare',
        'Corporate Conferences', 'MICE Events', 'Offsites & Team Building',
        'Brand Activations', 'Award Ceremonies', 'Corporate Travel', 'Other',
      ],
    },
    description: { type: String, required: true },

    // ── Amount fields ──────────────────────────────────────────────────────────
    totalAmount: { type: Number, required: true, min: 1 },

    // Kept for backwards-compat (mirrors totalAmount when set)
    baseAmount:  { type: Number, default: 0 },

    // Sum of paid installment amounts (updated on each installment pay)
    paidAmount:  { type: Number, default: 0 },

    // Razorpay payment ID for the transaction that settled this payment (no-installment case)
    razorpayPaymentId: { type: String, default: '' },

    // ── Invoice ────────────────────────────────────────────────────────────────
    invoiceUrl:      { type: String, default: '' },
    invoiceFileName: { type: String, default: '' },

    // ── Installments ───────────────────────────────────────────────────────────
    installments: { type: [installmentSchema], default: [] },

    // ── Meta ───────────────────────────────────────────────────────────────────
    dueDate:       { type: Date, required: true },
    status: {
      type: String, default: 'Pending',
      enum: ['Pending', 'Partial', 'Paid'],
    },
    gstApplicable: { type: Boolean, default: false },
    gstRate:       { type: Number, default: 0, enum: [0, 5, 12, 18] },
    notes:         { type: String, default: '' },
    createdBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: remaining = total - paid
paymentSchema.virtual('remainingAmount').get(function () {
  return Math.max(0, (this.totalAmount || 0) - (this.paidAmount || 0));
});

module.exports = mongoose.model('Payment', paymentSchema);
