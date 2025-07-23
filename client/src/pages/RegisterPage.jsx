import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const result = await register({
      name,
      email,
      password
    });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="py-8 px-6">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#1d3309]">
            Create an Account
          </h1>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="name" 
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleChange}
                className="input"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-4">
              <label 
                htmlFor="email" 
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="input"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-4">
              <label 
                htmlFor="password" 
                className="block text-gray-700 font-medium mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                className="input"
                placeholder="Create a password (min. 6 characters)"
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="confirmPassword" 
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="input"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#5c95e0] hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;