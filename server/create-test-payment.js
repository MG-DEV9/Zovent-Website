const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Payment = require('./models/Payment');

const connectDB = require('./config/db');

async function run() {
  await connectDB();
  // Clean up if it exists
  await Payment.deleteOne({ paymentId: 'SAY-MICE-001' });

  await Payment.create({
    paymentId: 'SAY-MICE-001',
    clientName: 'Test User',
    service: 'MICE',
    description: 'Test Gateway Payment',
    baseAmount: 100,
    totalAmount: 100,
    dueDate: new Date(Date.now() + 86400000),
    status: 'Pending',
    gstApplicable: true,
    createdBy: new mongoose.Types.ObjectId()
  });
  console.log('Test payment created: SAY-MICE-001');
  process.exit(0);
}
run().catch(console.error);
