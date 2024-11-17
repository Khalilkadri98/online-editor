const express = require('express');
const router = express.Router();
const {
  createTutorial,
  getTutorialById,
  getAllTutorials,
  updateTutorial,
  deleteTutorial,
  getUserProgress,
  updateUserProgress
} =  require('../controllers/tutorialController');

// Create a new tutorial
router.post('/', createTutorial);

// Get a tutorial by ID
router.get('/:id', getTutorialById);

// Update a tutorial by ID
router.put('/:id', updateTutorial);

// Get all tutorials
router.get('/', getAllTutorials);

// Delete a tutorial by ID
router.delete('/:id', deleteTutorial);

// Get user progress for a specific tutorial
router.get('/progress/:userId/:tutorialId', getUserProgress);

// Update user progress for a specific tutorial
router.post('/progress/:userId/:tutorialId', updateUserProgress);

module.exports = router;
