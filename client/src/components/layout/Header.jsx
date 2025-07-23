import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();

  const categories = [
    { name: 'Groceries', path: '/products/category/groceries' },
    { name: 'Cereals', path: '/products/category/cereals' },
    { name: 'Detergents', path: '/products/category/detergents' },
    { name: 'Cooking Oils', path: '/products/category/cooking-oils' },
    { name: 'Snacks', path: '/products/category/snacks' },
    { name: 'Toiletries', path: '/products/category/toiletries' },
    { name: 'Electronics', path: '/products/category/electronics' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#1d3309] text-white px-4 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            <span className="mr-4">
              <i className="fas fa-phone mr-2"></i>+254 700 123 456
            </span>
            <span>
              <i className="fas fa-envelope mr-2"></i>info@rahisishop.co.ke
            </span>
          </div>
          <div className="text-sm">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link to="/profile" className="hover:text-[#c7da91]">
                  <i className="fas fa-user mr-1"></i>
                  {user?.name}
                </Link>
                <button
                  onClick={logout}
                  className="ml-4 hover:text-[#c7da91]"
                >
                  <i className="fas fa-sign-out-alt mr-1"></i>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link to="/login" className="mr-4 hover:text-[#c7da91]">
                  <i className="fas fa-sign-in-alt mr-1"></i>
                  Login
                </Link>
                <Link to="/register" className="hover:text-[#c7da91]">
                  <i className="fas fa-user-plus mr-1"></i>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-2xl text-[#5c95e0]">Rahisi</span>
              <span className="font-bold text-2xl text-[#a7bd40]">Shop</span>
            </Link>
          </div>

          {/* Search */}
          <div className="w-full md:w-2/5 mb-4 md:mb-0">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="input rounded-r-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#5c95e0] text-white px-4 rounded-r-md hover:bg-[#4a84cf]"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Cart icon */}
          <div>
            <Link
              to="/cart"
              className="relative inline-flex items-center px-4 py-2 hover:text-[#5c95e0]"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="ml-2">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#a7bd40] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#5c95e0] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="py-3">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden focus:outline-none"
              >
                <i className={`fas fa-${menuOpen ? 'times' : 'bars'} text-xl`}></i>
              </button>
              <ul className="hidden md:flex space-x-6">
                <li>
                  <Link to="/" className="hover:text-[#1d3309]">
                    Home
                  </Link>
                </li>
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link to={category.path} className="hover:text-[#1d3309]">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="px-4 pb-3">
            <li className="py-2 border-b border-[#4a84cf]">
              <Link
                to="/"
                className="block hover:text-[#1d3309]"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {categories.map((category) => (
              <li
                key={category.name}
                className="py-2 border-b border-[#4a84cf]"
              >
                <Link
                  to={category.path}
                  className="block hover:text-[#1d3309]"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;