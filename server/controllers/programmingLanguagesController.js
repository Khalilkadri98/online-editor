// controllers/programmingLanguageController.js
const ProgrammingLanguage = require('../models/ProgrammingLanguage');

const createProgrammingLanguage = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingLanguage = await ProgrammingLanguage.findOne({ name });
    if (existingLanguage) {
      return res.status(400).json({ error: 'Programming language already exists' });
    }

    const newLanguage = new ProgrammingLanguage({ name, description });
    await newLanguage.save();
    res.status(201).json(newLanguage);
  } catch (error) {
    res.status(500).json({ error: 'Error adding programming language' });
  }
};
const getProgrammingLanguages = async (req, res) => {
  try {
    const languages = await ProgrammingLanguage.find();
    res.json(languages);
  } catch (error) {
    console.error('Error fetching programming languages:', error);
    res.status(500).json({ error: 'Error fetching programming languages' });
  }
};

module.exports = { createProgrammingLanguage, getProgrammingLanguages };
