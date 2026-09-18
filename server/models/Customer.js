const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, lowercase: true, trim: true },
  phone:   { type: String, required: true, trim: true },
  notes:   String,
  lastPaymentId: String,
}, { timestamps: true });

customerSchema.index({ email: 1, phone: 1 }, { unique: true });

module.exports = mongoose.model('Customer', customerSchema);
