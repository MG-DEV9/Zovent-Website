'use strict';
const router       = require('express').Router();
const ctrl         = require('../controllers/razorpayController');
const asyncHandler = require('../utils/asyncHandler');

// Public — called from the frontend before opening the checkout modal
router.post('/create-order', asyncHandler(ctrl.createOrder));

// Public — called from the frontend after a successful payment
router.post('/verify', asyncHandler(ctrl.verifyPayment));

module.exports = router;
