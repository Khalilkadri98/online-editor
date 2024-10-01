const express = require('express');
const router = express.Router();
const { executeCode} = require('../controllers/codeController');

// Route for executing regular code
router.post('/execute', executeCode);

// Route for executing React code
//router.post('/execute/react', executeReactCode);

module.exports = router;
