import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    county: user?.address?.county || '',
    postalCode: user?.address?.postalCode || '',
    phoneNumber: user?.phoneNumber || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setTimeout(() => {
          const sampleOrders = [
            {
              _id: '1',
              orderNumber: 485721,
              createdAt: '2023-07-15T10:30:00Z',
              totalPrice: 1009.17,
              isPaid: true,
              isDelivered: false,
              status: 'processing',
              items: 3
            },
            {
              _id: '2',
              orderNumber: 485635,
              createdAt: '2023-06-28T14:15:00Z',
              totalPrice: 3599.50,
              isPaid: true,
              isDelivered: true,
              status: 'delivered',
              items: 2
            },
            {
              _id: '3',
              orderNumber: 485412,
              createdAt: '2023-05-18T09:45:00Z',
              totalPrice: 799.99,
              isPaid: true,
              isDelivered: true,
              status: 'delivered',
              items: 1
            }
          ];
          
          setOrders(sampleOrders);
          setOrdersLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrdersLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters long'
      });
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({
        type: 'success',
        text: 'Password changed successfully!'
      });
      
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to change password'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#1d3309]">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#5c95e0] rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <p className="font-medium">{user?.name}</p>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'profile' 
                    ? 'bg-[#f0f9e8] text-[#1d3309] font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-user-circle mr-3"></i>
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'orders' 
                    ? 'bg-[#f0f9e8] text-[#1d3309] font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-shopping-bag mr-3"></i>
                My Orders
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === 'password' 
                    ? 'bg-[#f0f9e8] text-[#1d3309] font-medium' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-lock mr-3"></i>
                Change Password
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-600 hover:bg-red-50"
              >
                <i className="fas fa-sign-out-alt mr-3"></i>
                Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Profile Information */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#1d3309]">
                  Profile Information
                </h2>

                {message.text && (
                  <div 
                    className={`p-3 rounded-md mb-4 ${
                      message.type === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <label 
                        htmlFor="phoneNumber" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="input"
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="font-medium mb-3 text-[#1d3309]">
                        Address Information
                      </h3>
                    </div>

                    <div className="md:col-span-2">
                      <label 
                        htmlFor="street" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="city" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="county" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        County
                      </label>
                      <input
                        type="text"
                        id="county"
                        value={formData.county}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="postalCode" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* My Orders */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#1d3309]">
                  My Orders
                </h2>

                {ordersLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="loading-spinner"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl text-gray-300 mb-4">
                      <i className="fas fa-shopping-bag"></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't placed any orders yet.
                    </p>
                    <Link to="/products" className="btn btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order #
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-medium">#{order.orderNumber}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              KSh {order.totalPrice.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span 
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <Link 
                                to={`/order/${order._id}`}
                                className="text-[#5c95e0] hover:underline"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Change Password */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-[#1d3309]">
                  Change Password
                </h2>

                {message.text && (
                  <div 
                    className={`p-3 rounded-md mb-4 ${
                      message.type === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label 
                        htmlFor="currentPassword" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="newPassword" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="input"
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Must be at least 6 characters
                      </p>
                    </div>

                    <div>
                      <label 
                        htmlFor="confirmPassword" 
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Updating...
                      </div>
                    ) : (
                      'Change Password'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;