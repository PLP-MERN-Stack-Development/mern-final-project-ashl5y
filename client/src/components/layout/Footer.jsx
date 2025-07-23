import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1d3309] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              <span className="text-[#5c95e0]">Rahisi</span>
              <span className="text-[#a7bd40]">Shop</span>
            </h3>
            <p className="mb-4 text-gray-300">
              Your one-stop shop for all your groceries, electronics, and household needs. 
              Shop with confidence with our quality products and excellent service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#5c95e0]">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#5c95e0]">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#5c95e0]">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#5c95e0]">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/products/category/groceries" className="hover:text-[#a7bd40]">
                  Groceries
                </Link>
              </li>
              <li>
                <Link to="/products/category/cereals" className="hover:text-[#a7bd40]">
                  Cereals
                </Link>
              </li>
              <li>
                <Link to="/products/category/detergents" className="hover:text-[#a7bd40]">
                  Detergents
                </Link>
              </li>
              <li>
                <Link to="/products/category/cooking-oils" className="hover:text-[#a7bd40]">
                  Cooking Oils
                </Link>
              </li>
              <li>
                <Link to="/products/category/electronics" className="hover:text-[#a7bd40]">
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-[#a7bd40]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#a7bd40]">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#a7bd40]">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#a7bd40]">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#a7bd40]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#a7bd40]"></i>
                <span>123 Moi Avenue, Nairobi, Kenya</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-[#a7bd40]"></i>
                <span>+254 700 123 456</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-[#a7bd40]"></i>
                <span>info@rahisishop.co.ke</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-[#a7bd40]"></i>
                <span>Mon-Sat: 8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-gray-300">
          <p>
            &copy; {currentYear} RahisiShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;