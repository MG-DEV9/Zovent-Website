const router     = require('express').Router();
const ctrl       = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

router.post('/login',              asyncHandler(ctrl.login));
router.get('/dashboard',  protect,  asyncHandler(ctrl.getDashboardStats));

module.exports = router;
