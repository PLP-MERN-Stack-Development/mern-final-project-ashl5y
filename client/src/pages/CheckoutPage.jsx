import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    county: user?.address?.county || '',
    postalCode: user?.address?.postalCode || ''
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [loading, setLoading] = useState(false);

  const shippingCost = cartTotal > 5000 ? 0 : 300;
  const taxAmount = cartTotal * 0.16;
  const totalAmount = cartTotal + shippingCost + taxAmount;

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      clearCart();
      navigate('/order/success', { 
        state: { 
          orderData: {
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            shippingPrice: shippingCost,
            taxPrice: taxAmount,
            totalPrice: totalAmount,
            isPaid: false,
            orderNumber: Math.floor(100000 + Math.random() * 900000)
          } 
        }
      });
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#1d3309]">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 text-[#1d3309]">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label 
                    htmlFor="street" 
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="street"
                    value={shippingAddress.street}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="123 Main St"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="city" 
                    className="block text-gray-700 font-medium mb-2"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="Nairobi"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="county" 
                    className="block text-gray-700 font-medium mb-2"
                  >
                    County <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="county"
                    value={shippingAddress.county}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="Nairobi"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="postalCode" 
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    className="input"
                    required
                    placeholder="00100"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6 text-[#1d3309]">
                Payment Method
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={paymentMethod === 'mpesa'}
                      onChange={() => setPaymentMethod('mpesa')}
                      className="mr-2 text-[#5c95e0]"
                    />
                    <span className="text-gray-700">M-Pesa</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mr-2 text-[#5c95e0]"
                    />
                    <span className="text-gray-700">Credit / Debit Card</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={() => setPaymentMethod('cash-on-delivery')}
                      className="mr-2 text-[#5c95e0]"
                    />
                    <span className="text-gray-700">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6 text-[#1d3309]">Order Summary</h2>

            <div className="mb-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center mb-3 pb-3 border-b">
                  <div className="flex items-center">
                    <div className="w-16 h-16 mr-4">
                      <img
                        src={item.imageUrl || '/assets/images/default-product.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.quantity} x KSh {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    KSh {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">KSh {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Free' : `KSh ${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (16% VAT)</span>
                <span className="font-medium">KSh {taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-lg">Total</span>
                  <span className="text-lg text-[#5c95e0]">
                    KSh {totalAmount.toFixed(2)}
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

export default CheckoutPage;