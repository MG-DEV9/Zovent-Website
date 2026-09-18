const mongoose = require('mongoose');

const pricingTierSchema = new mongoose.Schema({
  persons: { type: Number, required: true },
  price:   { type: Number, required: true },
}, { _id: false });

const itineraryDaySchema = new mongoose.Schema({
  day:        { type: Number, required: true },
  title:      { type: String, required: true, trim: true },
  activities: [{ type: String, trim: true }],
}, { _id: false });

const holidayPackageSchema = new mongoose.Schema({
  slug:      { type: String, required: true, unique: true, trim: true, lowercase: true },
  title:     { type: String, required: true, trim: true },
  location:  { type: String, required: true, trim: true },
  image:     { type: String, required: true, trim: true },
  category:     { type: String, enum: ['Domestic', 'International', 'Best Seller', 'best seller'], default: 'Domestic', required: true, trim: true },
  isBestSeller: { type: Boolean, default: false },
  duration: {
    nights: { type: Number, required: true, min: 1 },
    days:   { type: Number, required: true, min: 1 },
  },
  pricing:   { type: [pricingTierSchema],   required: true },
  amenities: [{ type: String, trim: true }],
  itinerary: { type: [itineraryDaySchema], default: [] },
  isActive:  { type: Boolean, default: true },
  order:     { type: Number, default: 0 },          // for display ordering
}, { timestamps: true });

// Text index for search
holidayPackageSchema.index({ title: 'text', location: 'text', category: 'text' });

module.exports = mongoose.model('HolidayPackage', holidayPackageSchema);
