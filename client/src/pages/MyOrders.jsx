import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
  const [myorders, setMyorders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyorders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyorders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyorders();
    }
  }, [user]);

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-start mb-8'>
        <p className='text-2xl font-medium uppercase'>My Orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myorders.map((order, index) => (
        <div key={index} className='bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-6 max-w-4xl'>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center text-gray-600 text-sm md:text-base mb-4'>
            <p>OrderId : {order._id}</p>
            <p>Payment : {order.paymentType}</p>
            <p>Total Amount : {currency}{order.amount}</p>
          </div>

          {order.items.map((item, idx) => (
            <div key={idx} className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-4'>
              <div className='flex items-center gap-4'>
                <img src={item.product.image[0]} alt={item.product.name} className='w-16 h-16 object-cover rounded' />
                <div>
                  <h2 className='text-lg font-medium text-gray-800'>{item.product.name}</h2>
                  <p className='text-gray-500'>Category: {item.product.category}</p>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {order.status || "Order Placed"}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <p className='text-primary text-lg font-medium'>
  Amount: {currency}
  {item.product.offerPrice && item.quantity
    ? item.product.offerPrice * item.quantity
    : "0"}
</p>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
