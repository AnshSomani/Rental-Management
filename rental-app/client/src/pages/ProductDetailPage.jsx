import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import RazorpayButton from '../components/RazorpayButton';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [availability, setAvailability] = useState(null);
  const [quote, setQuote] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [amountDue, setAmountDue] = useState(null);
  const [paymentType, setPaymentType] = useState('full');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await api.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (e) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [productId]);

  const canCheck = useMemo(() => !!(startDate && endDate), [startDate, endDate]);

  useEffect(() => {
    const check = async () => {
      if (!canCheck) return;
      try {
        const { data } = await api.get(`/api/products/${productId}/availability`, { params: { startDate, endDate } });
        setAvailability(data);
      } catch (e) {
        setAvailability(null);
      }
    };
    check();
  }, [productId, startDate, endDate, canCheck]);

  useEffect(() => {
    const quotePrice = async () => {
      if (!canCheck) return;
      try {
        const { data } = await api.post('/api/pricing/quote', { productId, startDate, endDate, quantity, paymentType });
        setQuote(data);
      } catch (e) {
        setQuote(null);
      }
    };
    quotePrice();
  }, [productId, startDate, endDate, quantity, paymentType, canCheck]);

  const handleCreateOrder = async () => {
    try {
      const { data } = await api.post('/api/orders', { productId, startDate, endDate, quantity, paymentType });
      setOrderId(data.orderId);
      setAmountDue(data.amountDue);
      alert('Order created. Proceed to payment.');
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to create order');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!product) return null;

  const imageUrl = product.images?.[0] || 'https://placehold.co/800x600/e2e8f0/64748b?text=Product';

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <img src={imageUrl} alt={product.name} className="w-full h-[420px] object-cover rounded-xl border border-gray-200" />
          <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start date</label>
              <input type="datetime-local" className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End date</label>
              <input type="datetime-local" className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input type="number" min={1} className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment type</label>
              <select value={paymentType} onChange={e => setPaymentType(e.target.value)} className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3">
                <option value="full">Full upfront</option>
                <option value="deposit">Deposit</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            {availability && (
              <p>Available: <span className="font-semibold">{availability.available}</span> of {availability.stock}</p>
            )}
            {quote && (
              <p className="mt-1">Estimated total: <span className="font-semibold">₹{quote.total}</span> {paymentType === 'deposit' ? `(Pay now ₹${quote.amountDue})` : ''}</p>
            )}
          </div>

          {!orderId ? (
            <button disabled={!canCheck} onClick={handleCreateOrder} className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${canCheck ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400'}`}>
              Reserve
            </button>
          ) : (
            <div className="mt-6">
              <RazorpayButton amount={amountDue} orderId={orderId} onSuccess={() => navigate('/dashboard')} />
            </div>
          )}
          <div className="mt-6 text-sm text-gray-500">
            <Link to="/rental-shop" className="text-indigo-700">← Back to shop</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
