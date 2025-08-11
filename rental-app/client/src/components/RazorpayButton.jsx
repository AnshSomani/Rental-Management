// client/src/components/RazorpayButton.jsx
import React from 'react';
import api from '../lib/api';

const RazorpayButton = ({ amount, orderId, onSuccess }) => {
  const handlePayment = async () => {
    try {
      const { data } = await api.post('/api/payment/create-order', { amount, orderId });
      const razorpayOrder = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Rental App',
        description: `Rental order #${orderId}`,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          await api.post('/api/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
            amount,
          });
          if (onSuccess) onSuccess();
          else window.location.reload();
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <button onClick={handlePayment} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;