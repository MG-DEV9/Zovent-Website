const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Allow the production site (apex + www) and local dev servers; reject everything else
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://zovents.com',
  'https://www.zovents.com',
  'http://localhost:8443',
  'http://localhost:5173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
})); // Explicitly handle OPTIONS preflight requests for all endpoints
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/razorpay', require('./routes/razorpayRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/holidays', require('./routes/holidayRoutes'));

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', brand: 'SAY Experiences' })
);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    // Sync indexes to drop the old razorpayOrderId unique index
    const Transaction = require('./models/Transaction');
    await Transaction.syncIndexes();
    
    app.listen(PORT, () => console.log(`SAY Experiences Payment Server - port ${PORT}`));
  })
  .catch(() => {
    console.error('Server not started because MongoDB is unavailable.');
    process.exit(1);
  });
