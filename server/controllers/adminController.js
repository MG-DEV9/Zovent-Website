const Admin       = require('../models/Admin');
const jwt         = require('jsonwebtoken');
const Payment     = require('../models/Payment');
const Transaction = require('../models/Transaction');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password)))
    return res.status(401).json({ message: 'Invalid credentials.' });

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, admin: { name: admin.name, email: admin.email, role: admin.role } });
};

exports.getDashboardStats = async (_req, res) => {
  const [total, pending, paid, partial, revenueAgg] = await Promise.all([
    Payment.countDocuments(),
    Payment.countDocuments({ status: 'Pending' }),
    Payment.countDocuments({ status: 'Paid' }),
    Payment.countDocuments({ status: 'Partial' }),
    Transaction.aggregate([
      { '$match': { status: 'paid' } },
      { '$group': { _id: null, total: { '$sum': '$amount' } } },
    ]),
  ]);
  res.json({ total, pending, paid, partial, revenue: revenueAgg[0]?.total || 0 });
};
