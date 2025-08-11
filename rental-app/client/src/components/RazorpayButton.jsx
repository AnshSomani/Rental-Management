// client/src/components/RazorpayButton.jsx
import React from 'react';
import axios from 'axios';

const RazorpayButton = ({ amount, orderId }) => {
  const handlePayment = async () => {
    try {
      // 1. Create a Razorpay order on the back end
      const { data } = await axios.post('/api/payment/create-order', { amount, orderId });
      const razorpayOrder = data;

      const options = {
        key: 'Yrzp_test_RU4KofSwIRBZqQ', // Replace with your test key
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Rental App',
        description: `Rental order #${orderId}`,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          // 2. On successful payment, verify the signature on the back end
          await axios.post('/api/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });
          alert('Payment successful!');
          window.location.reload(); // Or redirect to a success page
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;