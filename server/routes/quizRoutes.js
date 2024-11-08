// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const{getQuizzesList,getQuizById,submitAnswers,getUserQuizProgress}= require('../controllers/quizController');

// GET /api/quizzes - Fetch all quizzes
router.get('/',getQuizzesList);
router.get('/:id',getQuizById);
router.post('/submit',submitAnswers);


module.exports = router;
