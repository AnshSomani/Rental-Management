// client/src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// Assume you have a calendar component
import RentalCalendar from '../components/RentalCalendar';
import RazorpayButton from '../components/RazorpayButton';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [dates, setDates] = useState({ start: null, end: null });
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  // Handle date selection from the calendar and calculate price
  const handleDateSelect = (startDate, endDate) => {
    setDates({ start: startDate, end: endDate });
    // TODO: Implement pricing logic here
    // For now, a placeholder
    const calculatedPrice = 1000;
    setTotalPrice(calculatedPrice);
  };
  
  const handleCreateOrder = async () => {
    // API call to create a rental quotation/order on the back end
    const { data } = await axios.post('/api/orders', {
      productId,
      startDate: dates.start,
      endDate: dates.end,
      totalPrice,
    });
    setOrderId(data.orderId);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      
      <RentalCalendar onDateSelect={handleDateSelect} />
      
      {dates.start && dates.end && (
        <>
          <p>Selected Dates: {dates.start.toDateString()} to {dates.end.toDateString()}</p>
          <p>Total Price: ₹{totalPrice}</p>
          
          <button onClick={handleCreateOrder}>
            Proceed to Payment
          </button>

          {/* {orderId && (
            <RazorpayButton amount={totalPrice} orderId={orderId} />
          )} */}
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;