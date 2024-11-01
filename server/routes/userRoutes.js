const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const{register,login,getUserProfile,verifyUsers, updateUserProfile,saveCode,loadCode, verifyEmail, resetPassword, forgotPassword}= require('../controllers/userController');

router.post('/register', register);

// Test for rendering all users
router.get('/verify-users', verifyUsers);

router.post('/login', login);
// Route to fetch user profile
router.get('/profile', auth, getUserProfile);

// Route to update user profile
router.put('/profile', auth, updateUserProfile);
router.get('/verify/:token', verifyEmail);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password', resetPassword);

router.post('/save-code', auth,saveCode);
router.get('/load-code', auth, loadCode); 


module.exports = router;