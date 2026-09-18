const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

dotenv.config();

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'SAY Admin';

  if (!email || !password) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before running this script.');
  }

  await connectDB();

  let admin = await Admin.findOne({ email });

  if (admin) {
    admin.password = password;
    admin.name = name;
    admin.role = 'superadmin';
    await admin.save();
  } else {
    admin = await Admin.create({ email, password, name, role: 'superadmin' });
  }

  console.log(`Admin ready: ${admin.email}`);
  process.exit(0);
};

createAdmin().catch(error => {
  console.error(error.message);
  process.exit(1);
});
