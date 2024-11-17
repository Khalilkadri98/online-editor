const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  programmingLanguage: { type: Schema.Types.ObjectId, ref: 'ProgrammingLanguage', required: true },
  steps: [
    {
      stepNumber: Number,
      title: String,
      content: String,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tutorial', tutorialSchema);
