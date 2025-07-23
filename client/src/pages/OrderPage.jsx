import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrderSuccessPage = ({ orderData }) => {
  return (
    <div className="text-center py-8">
      <div className="text-6xl text-green-500 mb-6">
        <i className="fas fa-check-circle"></i>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-[#1d3309]">
        Order Placed Successfully!
      </h2>
      <p className="text-xl mb-4">
        Thank you for your purchase
      </p>
      <p className="mb-8">
        Your order number: <span className="font-semibold">{orderData.orderNumber}</span>
      </p>
      <div className="mb-8">
        <p>We've sent a confirmation to your email.</p>
        <p>You can track your order status on your profile page.</p>
      </div>
      <div className="flex justify-center gap-4">
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
        <Link to="/profile" className="btn btn-outline">
          View My Orders
        </Link>
      </div>
    </div>
  );
};

const OrderDetailPage = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setTimeout(() => {
          const sampleOrder = {
            _id: orderId,
            orderNumber: 485721,
            createdAt: new Date().toISOString(),
            user: {
              name: 'John Doe',
              email: 'john@example.com'
            },
            orderItems: [
              {
                _id: '1',
                name: 'Kimbo Cooking Oil - 2L',
                price: 715.00,
                quantity: 1,
                imageUrl: '/assets/images/kimbo-oil.jpg'
              },
              {
                _id: '3',
                name: 'Soko Maize Flour - 2kg',
                price: 159.00,
                quantity: 2,
                imageUrl: '/assets/images/soko-flour.jpg'
              }
            ],
            shippingAddress: {
              street: '123 Main St',
              city: 'Nairobi',
              county: 'Nairobi',
              postalCode: '00100'
            },
            paymentMethod: 'mpesa',
            itemsPrice: 1033.00,
            shippingPrice: 0,
            taxPrice: 139.20,
            totalPrice: 1172.20,
            isPaid: true,
            paidAt: new Date().toISOString(),
            isDelivered: false,
            status: 'processing'
          };
          
          setOrder(sampleOrder);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
        <Link to="/profile" className="btn btn-primary">
          Go Back to Profile
        </Link>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-100 text-yellow-600 p-4 rounded-md mb-4">
          Order not found
        </div>
        <Link to="/profile" className="btn btn-primary">
          Go Back to Profile
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/profile" className="text-[#5c95e0] hover:underline">
          <i className="fas fa-arrow-left mr-2"></i>Back to My Orders
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-6 text-[#1d3309]">
        Order #{order.orderNumber}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-[#1d3309]">
              Shipping Information
            </h2>
            <p className="mb-2"><strong>Name:</strong> {order.user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {order.user.email}</p>
            <p className="mb-2"><strong>Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.county}, {order.shippingAddress.postalCode}</p>
            <p className="mb-2">
              <strong>Delivery Status:</strong>{' '}
              <span 
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  order.isDelivered 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
              </span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#1d3309]">
              Payment Information
            </h2>
            <p className="mb-2"><strong>Method:</strong> {order.paymentMethod === 'mpesa' ? 'M-Pesa' : order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
            <p className="mb-2">
              <strong>Status:</strong>{' '}
              <span 
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  order.isPaid 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.isPaid ? 'Paid' : 'Not Paid'}
              </span>
            </p>
            {order.paidAt && (
              <p className="mb-2"><strong>Paid On:</strong> {new Date(order.paidAt).toLocaleDateString()}</p>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6 text-[#1d3309]">
              Order Items
            </h2>
            
            <div className="space-y-4 mb-6">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center">
                    <div className="w-16 h-16 mr-4">
                      <img
                        src={item.imageUrl || '/assets/images/default-product.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <Link 
                        to={`/product/${item._id}`}
                        className="font-medium hover:text-[#5c95e0]"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-500 text-sm">
                        {item.quantity} x KSh {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    KSh {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">KSh {order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {order.shippingPrice === 0 ? 'Free' : `KSh ${order.shippingPrice.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (16% VAT)</span>
                <span className="font-medium">KSh {order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-lg">Total</span>
                  <span className="text-lg text-[#5c95e0]">
                    KSh {order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  
  if (id === 'success' && location.state?.orderData) {
    return <OrderSuccessPage orderData={location.state.orderData} />;
  }
  
  return <OrderDetailPage orderId={id} />;
};

export default OrderPage;