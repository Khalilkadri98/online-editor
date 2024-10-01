const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
});

module.exports = mongoose.model('Code', CodeSchema);
