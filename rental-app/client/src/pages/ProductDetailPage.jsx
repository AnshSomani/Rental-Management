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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDateSelect = (startDate, endDate) => {
    setDates({ start: startDate, end: endDate });
    // TODO: Implement pricing logic here
    const calculatedPrice = 1000;
    setTotalPrice(calculatedPrice);
  };
  
  const handleCreateOrder = async () => {
    try {
      const { data } = await axios.post('/api/orders', {
        productId,
        startDate: dates.start,
        endDate: dates.end,
        totalPrice,
      });
      setOrderId(data.orderId);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading product details...</div>;
  }
  
  if (isError) {
      return <div>Failed to load product. Please check the URL or try again later.</div>;
  }

  // The code now assumes 'product' is not null or undefined here
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

          {orderId && (
            <RazorpayButton amount={totalPrice} orderId={orderId} />
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;