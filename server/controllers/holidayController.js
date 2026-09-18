const HolidayPackage = require('../models/HolidayPackage');

// ── Public ────────────────────────────────────────────────────────────────────

/** GET /api/holidays  — list all active packages */
exports.getAll = async (req, res) => {
  const { search, includeInactive } = req.query;

  const filter = {};

  // Admin can request inactive packages too (must be authenticated)
  if (!includeInactive || includeInactive !== 'true') {
    filter.isActive = true;
  }

  if (search) {
    filter.$text = { $search: search };
  }

  const packages = await HolidayPackage.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .lean();

  // Normalize legacy records where category was erroneously set to 'best seller'
  const normalized = packages.map((pkg) => {
    let isBest = Boolean(pkg.isBestSeller);
    let cat = pkg.category;
    if (cat && cat.toLowerCase() === 'best seller') {
      isBest = true;
      cat = 'Domestic';
    }
    return { ...pkg, isBestSeller: isBest, category: cat };
  });

  res.json(normalized);
};

/** GET /api/holidays/:slug */
exports.getOne = async (req, res) => {
  const pkg = await HolidayPackage.findOne({ slug: req.params.slug }).lean();
  if (!pkg) return res.status(404).json({ message: 'Package not found.' });
  
  if (pkg.category && pkg.category.toLowerCase() === 'best seller') {
    pkg.isBestSeller = true;
    pkg.category = 'Domestic';
  }

  res.json(pkg);
};

// ── Admin-Protected ───────────────────────────────────────────────────────────

/** POST /api/holidays  — create */
exports.create = async (req, res) => {
  let {
    slug, title, location, image, category, isBestSeller,
    duration, pricing, amenities, itinerary, isActive, order,
  } = req.body;

  if (!slug || !title || !location || !image || !category) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  if (!pricing || pricing.length === 0) {
    return res.status(400).json({ message: 'At least one pricing tier is required.' });
  }

  if (category.toLowerCase() === 'best seller') {
    category = 'Domestic';
    isBestSeller = true;
  }

  const existing = await HolidayPackage.findOne({ slug });
  if (existing) return res.status(409).json({ message: `Slug "${slug}" already exists.` });

  const pkg = await HolidayPackage.create({
    slug, title, location, image, category, isBestSeller: Boolean(isBestSeller),
    duration, pricing, amenities, itinerary,
    isActive: isActive !== undefined ? isActive : true,
    order: order || 0,
  });

  res.status(201).json(pkg);
};

/** PUT /api/holidays/:id  — update */
exports.update = async (req, res) => {
  const pkg = await HolidayPackage.findById(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found.' });

  if (req.body.category && req.body.category.toLowerCase() === 'best seller') {
    req.body.category = 'Domestic';
    req.body.isBestSeller = true;
  }

  const allowedFields = [
    'slug', 'title', 'location', 'image', 'category', 'isBestSeller',
    'duration', 'pricing', 'amenities', 'itinerary',
    'isActive', 'order'
  ];
  allowedFields.forEach((f) => { if (req.body[f] !== undefined) pkg[f] = req.body[f]; });

  await pkg.save();
  res.json(pkg);
};

/** DELETE /api/holidays/:id */
exports.remove = async (req, res) => {
  const pkg = await HolidayPackage.findByIdAndDelete(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found.' });
  res.json({ message: 'Package deleted.' });
};

/** PATCH /api/holidays/:id/toggle  — toggle active/inactive */
exports.toggle = async (req, res) => {
  const pkg = await HolidayPackage.findById(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found.' });
  pkg.isActive = !pkg.isActive;
  await pkg.save();
  res.json({ isActive: pkg.isActive });
};
