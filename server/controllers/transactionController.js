const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
  const { status, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (search) {
    filter['$or'] = [
      { paymentId: { '$regex': search, '$options': 'i' } },
      { clientName: { '$regex': search, '$options': 'i' } },
      { clientEmail: { '$regex': search, '$options': 'i' } },
      { clientPhone: { '$regex': search, '$options': 'i' } },
    ];
  }

  const transactions = await Transaction.find(filter)
    .populate('customer', 'name email phone lastPaymentId')
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(transactions);
};
