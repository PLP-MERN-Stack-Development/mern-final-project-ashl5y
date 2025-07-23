const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const products = require('../data/products');
const Product = require('../models/Product');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    
    await Product.insertMany(products);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    
    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}