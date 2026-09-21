const router          = require('express').Router();
const ctrl            = require('../controllers/paymentController');
const { protect }     = require('../middleware/auth');
const asyncHandler    = require('../utils/asyncHandler');
const { invoiceUpload } = require('../middleware/upload');

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

// Invoice upload
router.post('/:id/invoice', protect, (req, res, next) => {
  invoiceUpload.single('invoice')(req, res, err => {
    if (err) return res.status(400).json({ message: err.message || 'Upload failed.' });
    next();
  });
}, asyncHandler(ctrl.uploadInvoice));

module.exports = router;
