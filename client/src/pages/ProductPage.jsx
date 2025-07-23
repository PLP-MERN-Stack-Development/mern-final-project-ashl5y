import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
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
            "_id": "4",
            "name": "Omo Washing Powder - 1kg",
            "description": "Powerful stain removal detergent for all your laundry needs.",
            "price": 390.00,
            "category": "detergents",
            "brand": "Omo",
            "imageUrl": "/assets/images/omo-detergent.jpg",
            "countInStock": 75,
            "featured": false,
            "rating": 4.3,
            "numReviews": 29
          },
          {
            "_id": "5",
            "name": "Colgate Toothpaste - 150g",
            "description": "Advanced fluoride formula for cavity protection and fresh breath.",
            "price": 651.00,
            "category": "toiletries",
            "brand": "Colgate",
            "imageUrl": "/assets/images/colgate.jpg",
            "countInStock": 120,
            "featured": true,
            "rating": 4.6,
            "numReviews": 47
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
            "_id": "11",
            "name": "Hisense Double Door Refrigerator - 206Litres",
            "description": "A big enough refrigerator to preserve your foods and drinks for a long time.",
            "price": 42145.00,
            "category": "electronics",
            "brand": "Hisense",
            "imageUrl": "/assets/images/refrigerator.jpg",
            "countInStock": 15,
            "featured": true,
            "rating": 4.4,
            "numReviews": 28
          },
          {
            "_id": "15",
            "name": "Brookside Dairy Best - 12 pieces (500ML)",
            "description": "Farm Fresh, Whole Life Milk.",
            "price": 672.00,
            "category": "groceries",
            "brand": "Brookside",
            "imageUrl": "/assets/images/brookside-milk.jpg",
            "countInStock": 280,
            "featured": true,
            "rating": 4.7,
            "numReviews": 133
          },
          {
            "_id": "16",
            "name": "Ketepa Tea Leaves (500g)",
            "description": "Made with top, sun-ripened tea leaves freshly picked for rich and aromatic flavour.",
            "price": 240.00,
            "category": "groceries",
            "brand": "Ketepa",
            "imageUrl": "/assets/images/tea-leaves.jpg",
            "countInStock": 57,
            "featured": true,
            "rating": 4.6,
            "numReviews": 64
          },
          {
            "_id": "17",
            "name": "Jik Bleach Colours - 750ml",
            "description": "Removes tough stains on your clothes while safely brightening them.",
            "price": 730.00,
            "category": "detergents",
            "brand": "Jik",
            "imageUrl": "/assets/images/jik-detergent.jpg",
            "countInStock": 75,
            "featured": true,
            "rating": 3.2,
            "numReviews": 16
          },
          {
            "_id": "18",
            "name": "Nuvita Glucose Biscuits - 200g",
            "description": "Each piece is loaded with high nutrition giving you instant energy.",
            "price": 96.99,
            "category": "snacks",
            "brand": "Nuvita",
            "imageUrl": "/assets/images/nuvita-biscuits.jpg",
            "countInStock": 16,
            "featured": true,
            "rating": 4.9,
            "numReviews": 173
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

        const foundProduct = sampleProducts.find(p => p._id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          const related = sampleProducts
            .filter(p => p.category === foundProduct.category && p._id !== id)
            .slice(0, 3);
          
          setRelatedProducts(related);
        } else {
          setError('Product not found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => (prev < product.countInStock ? prev + 1 : prev));
  };

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
        <Link to="/products" className="btn btn-primary">
          Go Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-100 text-yellow-600 p-4 rounded-md mb-4">
          Product not found
        </div>
        <Link to="/products" className="btn btn-primary">
          Go Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/products" className="text-[#5c95e0] hover:underline">
          <i className="fas fa-arrow-left mr-2"></i>Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-2/5">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.imageUrl || '/assets/images/default-product.jpg'}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-3/5">
            <h1 className="text-3xl font-bold mb-2 text-[#1d3309]">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fas fa-star ${
                      index < Math.round(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  ></i>
                ))}
              </div>
              <span className="text-gray-500">
                ({product.numReviews} reviews)
              </span>
            </div>
            
            <div className="text-3xl font-bold text-[#5c95e0] mb-4">
              KSh {product.price.toFixed(2)}
            </div>
            
            <div className="mb-4">
              <span className="font-semibold">Brand:</span> {product.brand}
            </div>
            
            <div className="mb-6">
              <span className="font-semibold">Category:</span>{' '}
              <Link
                to={`/products/category/${product.category}`}
                className="text-[#5c95e0] hover:underline"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {product.countInStock > 0 ? (
              <div className="text-green-600 mb-4">
                <i className="fas fa-check-circle mr-2"></i>
                In Stock ({product.countInStock} available)
              </div>
            ) : (
              <div className="text-red-600 mb-4">
                <i className="fas fa-times-circle mr-2"></i>
                Out of Stock
              </div>
            )}
            
            {product.countInStock > 0 && (
              <div className="mb-6">
                <div className="font-semibold mb-2">Quantity:</div>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setQuantity(
                        isNaN(val)
                          ? 1
                          : Math.min(Math.max(val, 1), product.countInStock)
                      );
                    }}
                    className="w-16 text-center border-y border-gray-200 py-1"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`btn px-6 py-2 flex-1 ${
                  product.countInStock === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Add to Cart
              </button>
              
              <button className="btn btn-outline px-6 py-2 flex-1">
                <i className="fas fa-heart mr-2"></i>
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="section-title mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <div key={related._id} className="card h-full">
                <Link to={`/product/${related._id}`} className="block">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={related.imageUrl || '/assets/images/default-product.jpg'}
                      alt={related.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 hover:text-[#5c95e0]">
                      {related.name}
                    </h3>
                    <div className="text-xl font-bold text-[#1d3309]">
                      KSh {related.price.toFixed(2)}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;