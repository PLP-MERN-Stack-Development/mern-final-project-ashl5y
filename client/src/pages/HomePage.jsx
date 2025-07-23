import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sampleProducts = [
          {
            "_id": "1",
            "name": "Kimbo Cooking Oil - 2L",
            "description": "High quality vegetable cooking oil for all your cooking needs. 100% pure and free from cholesterol.",
            "price": 715.00,
            "category": "cooking-oils",
            "brand": "Kimbo",
            "imageUrl": "/assets/images/kimbo-oil.jpg",
            "countInStock": 25,
            "featured": true,
            "rating": 4.8,
            "numReviews": 42
          },
          {
            "_id": "2",
            "name": "Mumias Sugar - 2kg",
            "description": "Fine-grained white sugar from the best sugarcane in Western Kenya.",
            "price": 314.00,
            "category": "groceries",
            "brand": "Mumias",
            "imageUrl": "/assets/images/mumias-sugar.jpg",
            "countInStock": 50,
            "featured": true,
            "rating": 4.5,
            "numReviews": 38
          },
          {
            "_id": "3",
            "name": "Soko Maize Flour - 2kg",
            "description": "Premium maize flour for making delicious ugali.",
            "price": 159.00,
            "category": "cereals",
            "brand": "Soko",
            "imageUrl": "/assets/images/soko-flour.jpg",
            "countInStock": 100,
            "featured": true,
            "rating": 4.7,
            "numReviews": 65
          },
          {
            "_id": "7",
            "name": "Dormans Coffee - 200g",
            "description": "Premium Kenyan AA coffee beans, ground for the perfect cup.",
            "price": 1485.00,
            "category": "groceries",
            "brand": "Dormans",
            "imageUrl": "/assets/images/dormans-coffee.jpg",
            "countInStock": 40,
            "featured": true,
            "rating": 4.9,
            "numReviews": 55
          },
          {
            "_id": "10",
            "name": "Dettol Soap - 175g (3-Pack)",
            "description": "Antibacterial soap that provides 100% better protection against germs.",
            "price": 800.00,
            "category": "toiletries",
            "brand": "Dettol",
            "imageUrl": "/assets/images/dettol-soap.jpg",
            "countInStock": 95,
            "featured": true,
            "rating": 4.7,
            "numReviews": 63
          },
          {
            "_id": "19",
            "name": "Lyons Hot, Cold and Normal Water Dispenser With Storage Cabinet",
            "description": "With your desired setting, you can get any water temp you desire with upto 1 year warranty.",
            "price": 5899.00,
            "category": "electronics",
            "brand": "Lyons",
            "imageUrl": "/assets/images/water-dispenser.jpg",
            "countInStock": 15,
            "featured": true,
            "rating": 4.4,
            "numReviews": 28
          }
        ];

        const featured = sampleProducts.filter(p => p.featured);
        const topRated = sampleProducts.sort((a, b) => b.rating - a.rating).slice(0, 4);

        setFeaturedProducts(featured);
        setTopProducts(topRated);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryBlocks = [
    { name: 'Groceries', image: '/assets/images/category-groceries.jpg', path: '/products/category/groceries' },
    { name: 'Cereals', image: '/assets/images/category-cereals.jpg', path: '/products/category/cereals' },
    { name: 'Electronics', image: '/assets/images/category-electronics.jpg', path: '/products/category/electronics' },
    { name: 'Toiletries', image: '/assets/images/category-toiletries.jpg', path: '/products/category/toiletries' }
  ];

  return (
    <div>
      {/* Hero section */}
      <section 
        className="bg-cover bg-center h-96 flex items-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/hero-banner.jpg')` 
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quality Products at Great Prices
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Your one-stop shop for all your household needs.
          </p>
          <Link 
            to="/products" 
            className="btn btn-primary text-lg px-8 py-3"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryBlocks.map((category) => (
              <Link 
                key={category.name} 
                to={category.path}
                className="relative overflow-hidden group rounded-lg h-60"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-8">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Top rated products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-8">Top Rated Products</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section className="py-12 bg-[#5c95e0] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find the best deals on your favorite products. Free delivery on orders over KSh 5,000.
          </p>
          <Link to="/products" className="btn bg-white text-[#5c95e0] hover:bg-gray-100 text-lg px-8 py-3">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#f0f9e8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-truck text-2xl text-[#a7bd40]"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery within Nairobi, next-day nationwide.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f0f9e8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-[#a7bd40]"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple payment options with secure processing.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#f0f9e8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-sync text-2xl text-[#a7bd40]"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy for all eligible products.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;