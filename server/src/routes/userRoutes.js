const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(registerUser)
  .get(protect, admin, getUsers);

router.post('/login', loginUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;