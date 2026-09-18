const router      = require('express').Router();
const ctrl        = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

router.get('/', protect, asyncHandler(ctrl.getAllTransactions));

module.exports = router;
