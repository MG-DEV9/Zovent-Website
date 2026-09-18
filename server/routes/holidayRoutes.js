const router       = require('express').Router();
const ctrl         = require('../controllers/holidayController');
const { protect }  = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

// ── Public ──────────────────────────────────────────────────────────────────
router.get('/',      asyncHandler(ctrl.getAll));
router.get('/:slug', asyncHandler(ctrl.getOne));

// ── Admin-Protected ──────────────────────────────────────────────────────────
router.post('/',              protect, asyncHandler(ctrl.create));
router.put('/:id',            protect, asyncHandler(ctrl.update));
router.delete('/:id',         protect, asyncHandler(ctrl.remove));
router.patch('/:id/toggle',   protect, asyncHandler(ctrl.toggle));

module.exports = router;
