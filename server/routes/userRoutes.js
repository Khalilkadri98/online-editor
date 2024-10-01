const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const{register,login,verifyUsers,saveCode,loadCode}= require('../controllers/userController');

router.post('/register', register);

// Test for rendering all users
router.get('/verify-users', verifyUsers);

router.post('/login', login);

router.post('/save-code', auth,saveCode);
router.get('/load-code', auth, loadCode); 


module.exports = router;
