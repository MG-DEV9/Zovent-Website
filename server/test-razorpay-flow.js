const crypto = require('crypto');
const http = require('http');
require('dotenv').config({ path: './.env' });

function request(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      },
      (res) => {
        let body = '';
        res.on('data', (c) => body += c);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch(e) {
            resolve({ status: res.statusCode, data: body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getRequest(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: 5000,
        path,
        method: 'GET'
      },
      (res) => {
        let body = '';
        res.on('data', (c) => body += c);
        res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function runTest() {
  console.log('1. Creating Order...');
  const createRes = await request('/api/razorpay/create-order', {
    paymentId: 'SAY-MICE-001',
    clientName: 'Test Integration',
    clientEmail: 'test@example.com',
    clientPhone: '9999999999',
    clientMessage: 'Testing gateway'
  });

  console.log('Create Order Response:', createRes.data);
  if (createRes.status !== 200) {
    console.error('Failed to create order');
    return;
  }

  const orderId = createRes.data.orderId;
  const paymentId = 'pay_fakeTest' + Date.now();

  console.log('\n2. Generating Signature for Verification...');
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  console.log('Signature generated. Sending verification...');
  const verifyRes = await request('/api/razorpay/verify', {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature
  });

  console.log('Verify Response:', verifyRes.data);

  console.log('\n3. Checking if payment record is updated to Paid...');
  const paymentRes = await getRequest('/api/payments/SAY-MICE-001');
  console.log('Payment Status:', paymentRes.data.status);
  console.log('Paid Amount:', paymentRes.data.paidAmount);
}

runTest().catch(console.error);
