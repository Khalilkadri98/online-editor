// scripts/addProgrammingLanguages.js
const mongoose = require('mongoose');
const ProgrammingLanguage = require('../models/ProgrammingLanguage');

mongoose.connect('mongodb://localhost:27017/code-editor', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const languages = [
      { name: 'Java', description: 'A high-level, class-based, object-oriented programming language.' },
      { name: 'JavaScript', description: 'A programming language commonly used in web development.' },
      { name: 'Python', description: 'A high-level, interpreted, general-purpose programming language.' },
      { name: 'Ruby', description: 'A dynamic, open-source programming language with a focus on simplicity and productivity.' },
      { name: 'C', description: 'A general-purpose, procedural programming language used for system and application software.' },
      { name: 'React', description: 'A JavaScript library for building user interfaces, particularly for single-page applications.' }
    ];

    await ProgrammingLanguage.insertMany(languages);
    console.log('Programming languages added successfully!');
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error adding programming languages:', error);
    mongoose.disconnect();
  });
