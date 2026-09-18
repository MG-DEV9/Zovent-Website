const router       = require('express').Router();
const ctrl         = require('../controllers/paymentController');
const { protect }  = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

// ── Public ────────────────────────────────────────────────────────────────────
router.get('/:paymentId',   asyncHandler(ctrl.getPaymentById));   // fetch by ref
router.post('/mock-pay',    asyncHandler(ctrl.mockPay));           // mock gateway

// ── Admin ─────────────────────────────────────────────────────────────────────
router.get('/',             protect, asyncHandler(ctrl.getAllPayments));
router.post('/',            protect, asyncHandler(ctrl.createPayment));
router.put('/:id',          protect, asyncHandler(ctrl.updatePayment));
router.delete('/:id',       protect, asyncHandler(ctrl.deletePayment));

// Installment actions
router.patch('/:id/installments/:idx/pay',   protect, asyncHandler(ctrl.markInstallmentPaid));
router.patch('/:id/installments/:idx/unpay', protect, asyncHandler(ctrl.unmarkInstallment));

module.exports = router;
