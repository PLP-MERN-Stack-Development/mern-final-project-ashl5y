import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    if (cartTotal > 5000) {
      setShippingCost(0);
    } else if (cartTotal > 0) {
      setShippingCost(300);
    } else {
      setShippingCost(0);
    }
  }, [cartTotal]);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#1d3309]">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl text-gray-300 mb-4">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary px-8 py-3">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0">
                              <Link to={`/product/${item._id}`}>
                                <img
                                  src={item.imageUrl || '/assets/images/default-product.jpg'}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </Link>
                            </div>
                            <div className="ml-4">
                              <Link
                                to={`/product/${item._id}`}
                                className="text-sm font-medium text-gray-900 hover:text-[#5c95e0]"
                              >
                                {item.name}
                              </Link>
                              <div className="text-sm text-gray-500">
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          KSh {item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <i className="fas fa-minus-circle"></i>
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              className="mx-2 w-16 text-center border rounded-md"
                            />
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <i className="fas fa-plus-circle"></i>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          KSh {(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Link to="/products" className="text-[#5c95e0] hover:underline">
                <i className="fas fa-arrow-left mr-2"></i>
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800"
              >
                <i className="fas fa-trash-alt mr-2"></i>
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-6 text-[#1d3309]">Order Summary</h2>
              <div className="space-y-4">
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
                  <span className="font-medium">KSh {(cartTotal * 0.16).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span className="text-lg">Total</span>
                    <span className="text-lg text-[#5c95e0]">
                      KSh {(cartTotal + shippingCost + cartTotal * 0.16).toFixed(2)}
                    </span>
                  </div>
                </div>
                {cartTotal > 5000 && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
                    <i className="fas fa-check-circle mr-2"></i>
                    You've qualified for free shipping!
                  </div>
                )}
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary w-full py-3 mt-6"
                >
                  Proceed to Checkout
                </button>
                <div className="text-sm text-center text-gray-500 mt-4">
                  <i className="fas fa-lock mr-2"></i>
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;