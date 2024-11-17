const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial', required: true },
  currentStep: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
