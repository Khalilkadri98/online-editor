const mongoose = require('mongoose');

const userQuizProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  startTime: { type: Date, default: Date.now },
  endTime: Date,
}, { timestamps: true });

// Create a compound index to ensure userId and quizId are unique together
userQuizProgressSchema.index({ userId: 1, quizId: 1 }, { unique: true });

module.exports = mongoose.model('UserQuizProgress', userQuizProgressSchema);
