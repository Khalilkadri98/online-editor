// routes/programmingLanguageRoutes.js
const express = require('express');
const { createProgrammingLanguage,getProgrammingLanguages } = require('../controllers/programmingLanguagesController');
const router = express.Router();

router.post('/', createProgrammingLanguage);
router.get('/', getProgrammingLanguages);


module.exports = router;
