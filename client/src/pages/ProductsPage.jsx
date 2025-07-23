import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';

const ProductsPage = () => {
  const { category, keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    price: [0, 50000],
    sort: 'default'
  });

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
            "_id": "6",
            "name": "Pembe Wheat Flour - 2kg",
            "description": "Premium wheat flour for baking bread, chapati, and other pastries.",
            "price": 165.00,
            "category": "cereals",
            "brand": "Pembe",
            "imageUrl": "/assets/images/pembe-flour.jpg",
            "countInStock": 85,
            "featured": false,
            "rating": 4.4,
            "numReviews": 32
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
            "_id": "8",
            "name": "Tropical Heat Potato Crisps - 50g",
            "description": "Crunchy and flavorful potato crisps with a blend of Kenyan spices.",
            "price": 79.99,
            "category": "snacks",
            "brand": "Tropical Heat",
            "imageUrl": "/assets/images/tropical-heat-crisps.jpg",
            "countInStock": 150,
            "featured": false,
            "rating": 4.2,
            "numReviews": 73
          },
          {
            "_id": "9",
            "name": "Tusker Malt Lager - 500ml",
            "description": "Premium Kenyan beer brewed with 100% malt for a rich, smooth taste.",
            "price": 210.00,
            "category": "groceries",
            "subcategory": "beverages",
            "brand": "EABL",
            "imageUrl": "/assets/images/tusker-malt.jpg",
            "countInStock": 60,
            "featured": false,
            "rating": 4.5,
            "numReviews": 87
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
            "_id": "12",
            "name": "Ramtons Silver Microwave - 20Litres",
            "description": "With 10 power levels, you can warm food at a low setting while maintaining their moisture.",
            "price": 14600.00,
            "category": "electronics",
            "brand": "Ramtons",
            "imageUrl": "/assets/images/microwave.jpg",
            "countInStock": 8,
            "featured": false,
            "rating": 4.1,
            "numReviews": 19
          },
          {
            "_id": "13",
            "name": "SunGold Sunflower Cooking Oil - 3L",
            "description": "A light and refreshing healthy option that aids in preventing heart disease.",
            "price": 419.00,
            "category": "cooking-oils",
            "brand": "SunGold",
            "imageUrl": "/assets/images/sungold-oil.jpg",
            "countInStock": 82,
            "featured": true,
            "rating": 3.8,
            "numReviews": 21
          },
          {
            "_id": "14",
            "name": "Fresh Fry Cooking Oil - 2L",
            "description": "Cholestrol free oil that is great for your whole cookery requirements for happy, healthy living.",
            "price": 679.00,
            "category": "cooking-oils",
            "brand": "Fresh Fry",
            "imageUrl": "/assets/images/freshfry-oil.jpg",
            "countInStock": 137,
            "featured": true,
            "rating": 4.7,
            "numReviews": 64
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

        let filteredProducts = sampleProducts;
        
        if (category) {
          filteredProducts = sampleProducts.filter(p => p.category === category);
        }

        if (keyword) {
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(keyword.toLowerCase()) || 
            p.description.toLowerCase().includes(keyword.toLowerCase())
          );
        }

        filteredProducts = filteredProducts.filter(p => 
          p.price >= filters.price[0] && p.price <= filters.price[1]
        );

        switch (filters.sort) {
          case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            break;
          default:
            filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, keyword, filters]);

  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value });
  };

  const handlePriceChange = (e, index) => {
    const newPrice = [...filters.price];
    newPrice[index] = Number(e.target.value);
    setFilters({ ...filters, price: newPrice });
  };

  const getCategoryName = () => {
    if (!category) return 'All Products';
    return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#1d3309]">
        {keyword ? `Search Results for: ${keyword}` : getCategoryName()}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#1d3309]">Filters</h2>
            
            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price (KSh)</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  className="input w-full"
                  placeholder="Min" 
                  value={filters.price[0]} 
                  onChange={(e) => handlePriceChange(e, 0)}
                  min={0}
                />
                <span>to</span>
                <input 
                  type="number" 
                  className="input w-full"
                  placeholder="Max" 
                  value={filters.price[1]} 
                  onChange={(e) => handlePriceChange(e, 1)}
                  min={0}
                />
              </div>
            </div>
            
            {/* Sorting */}
            <div>
              <h3 className="font-medium mb-2">Sort By</h3>
              <select 
                className="input w-full"
                value={filters.sort}
                onChange={handleSortChange}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center">
              <div className="loading-spinner"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-10">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <h2 className="text-2xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-500">
                Try adjusting your filters or search for something else.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-gray-500">
                Showing {products.length} {products.length === 1 ? 'product' : 'products'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;