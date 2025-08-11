const Razorpay = require('razorpay');

let razorpayInstance;

function getRazorpayInstance() {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn('Razorpay keys are not set. Payment features will not work until RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are configured.');
    }

    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_secret_placeholder',
    });
  }
  return razorpayInstance;
}

module.exports = { getRazorpayInstance };