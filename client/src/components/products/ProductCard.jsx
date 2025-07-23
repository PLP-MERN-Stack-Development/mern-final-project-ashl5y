import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="card group h-full flex flex-col">
      <Link to={`/product/${product._id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl || '/assets/images/default-product.jpg'}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
            Out of stock
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1 text-sm text-gray-500">{product.category}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-[#5c95e0]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
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
          <span className="ml-2 text-sm text-gray-500">
            ({product.numReviews} reviews)
          </span>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-bold text-[#1d3309]">
            KSh {product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className={`btn ${
              product.countInStock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#a7bd40] hover:bg-[#96ac30]'
            } text-white rounded-full w-10 h-10 flex items-center justify-center`}
          >
            <i className="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;