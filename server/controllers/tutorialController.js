const Tutorial = require("../models/Tutorial");
const ProgrammingLanguage = require("../models/ProgrammingLanguage");
const UserTutorialProgress = require("../models/UserTutorialProgress");

// Create a new tutorial
const createTutorial = async (req, res) => {
    try {
      const { title, description, languageId, steps } = req.body;
      const language = await ProgrammingLanguage.findById(languageId);
      if (!language) {
        return res.status(404).json({ error: "Programming language not found" });
      }
      const tutorial = new Tutorial({
        title,
        description,
        programmingLanguage: languageId,
        steps
      });
      await tutorial.save();
      res.status(201).json(tutorial);
    } catch (error) {
      console.error("Error creating tutorial:", error);
      res.status(500).json({ error: "Error creating tutorial" });
    }
  };
  
  // Update a tutorial by ID
  const updateTutorial = async (req, res) => {
    try {
      const { title, description, languageId, steps } = req.body;
      const language = await ProgrammingLanguage.findById(languageId);
      if (!language) {
        return res.status(404).json({ error: "Programming language not found" });
      }
      const tutorial = await Tutorial.findByIdAndUpdate(
        req.params.id,
        { title, description, programmingLanguage: languageId, steps },
        { new: true }
      );
      if (!tutorial) {
        return res.status(404).json({ error: "Tutorial not found" });
      }
      res.json(tutorial);
    } catch (error) {
      console.error("Error updating tutorial:", error);
      res.status(500).json({ error: "Error updating tutorial" });
    }
  };
  
  // Delete a tutorial by ID
  const deleteTutorial = async (req, res) => {
    try {
      const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
      if (!tutorial) {
        return res.status(404).json({ error: "Tutorial not found" });
      }
      res.json({ message: "Tutorial deleted successfully" });
    } catch (error) {
      console.error("Error deleting tutorial:", error);
      res.status(500).json({ error: "Error deleting tutorial" });
    }
  };

// Get tutorial by id
const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id).populate(
      "programmingLanguage"
    );
    if (!tutorial) {
      return res.status(404).json({ error: "Tutorial not found" });
    }
    res.json(tutorial);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
    res.status(500).json({ error: "Error fetching tutorial" });
  }
};

// Get all tutorials
const getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().populate("programmingLanguage");
    res.json(tutorials);
  } catch (error) {
    console.error("Error fetching tutorials:", error);
    res.status(500).json({ error: "Error fetching tutorials" });
  }
};

// Get user progress for a tutorial
const getUserProgress = async (req, res) => {
    const { userId, tutorialId } = req.params;

    try {
      const progress = await UserTutorialProgress.findOne({ user: userId, tutorial: tutorialId });
      if (!progress) {
        return res.status(404).json({ error: 'Progress not found' });
      }
      res.status(200).json(progress);
    } catch (error) {
      console.error('Error fetching progress:', error);
      res.status(500).json({ error: 'Error fetching progress' });
    }
  };
// Save or update tutorial progress
const updateUserProgress = async (req, res) => {
    const { userId, tutorialId } = req.params;
    const { currentStep } = req.body;
  
    try {
      let progress = await UserTutorialProgress.findOne({ user: userId, tutorial: tutorialId });
  
      if (progress) {
        progress.currentStep = currentStep;
        await progress.save();
      } else {
        progress = new UserTutorialProgress({ user: userId, tutorial: tutorialId, currentStep });
        await progress.save();
      }
  
      res.status(200).json({ message: 'Progress saved successfully' });
    } catch (error) {
      console.error('Error saving progress:', error);
      res.status(500).json({ error: 'Error saving progress' });
    }
};

module.exports = {
  createTutorial,
  getTutorialById,
  getAllTutorials,
  updateTutorial,
  deleteTutorial,
  getUserProgress,
  updateUserProgress,
};
