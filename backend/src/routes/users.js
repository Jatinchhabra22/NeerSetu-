const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadProfilePicture, handleUploadError } = require('../utils/upload');

// Get user profile
router.get('/profile', authenticate, userController.getProfile);

// Update user profile
router.put('/profile', authenticate, userController.updateProfile);

// Upload profile picture
router.post('/profile/picture', authenticate, uploadProfilePicture, handleUploadError, userController.uploadProfilePicture);

// Get all users (admin only)
router.get('/', authenticate, authorize(['admin']), userController.getAllUsers);

// Get user by ID (admin/official only)
router.get('/:id', authenticate, authorize(['official', 'admin']), userController.getUserById);

// Update user (admin only)
router.put('/:id', authenticate, authorize(['admin']), userController.updateUser);

// Delete user (admin only)
router.delete('/:id', authenticate, authorize(['admin']), userController.deleteUser);

// Get users by role
router.get('/role/:role', authenticate, authorize(['official', 'admin']), userController.getUsersByRole);

// Get users by village
router.get('/village/:village', authenticate, authorize(['official', 'admin']), userController.getUsersByVillage);

module.exports = router;
