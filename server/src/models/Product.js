const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: [
      'groceries',
      'cereals',
      'detergents',
      'cooking-oils',
      'snacks',
      'toiletries',
      'electronics'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    default: '/assets/images/default-product.jpg'
  },
  countInStock: {
    type: Number,
    required: [true, 'Please provide count in stock'],
    min: [0, 'Stock count cannot be negative'],
    default: 0
  },
  brand: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;