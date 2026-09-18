const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  customer:           { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  paymentId:          { type: String, required: true },
  orderId:               { type: String, required: true, unique: true },
  amount:                { type: Number, required: true },
  baseAmount:            { type: Number, required: true },
  gatewayFee:            { type: Number, default: 0 },
  razorpayPaymentId:     { type: String, sparse: true },
  gstAmount:          { type: Number, default: 0 },
  gstApplied:         { type: Boolean, default: false },
  status: {
    type: String, default: 'created',
    enum: ['created', 'paid', 'failed']
  },
  clientName:    String,
  clientEmail:   String,
  clientPhone:   String,
  clientMessage: String,
  installmentIdx: { type: Number, default: null },  // which installment this txn covers
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
