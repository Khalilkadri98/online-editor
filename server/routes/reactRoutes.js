const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { loadFiles, saveFiles} = require('../controllers/reactController');

router.get('/files', auth, loadFiles);
router.post('/save', auth,saveFiles);

module.exports = router;
