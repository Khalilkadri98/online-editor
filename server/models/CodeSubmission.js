// server/models/CodeSubmission.js
const mongoose = require('mongoose');

const CodeSubmissionSchema = new mongoose.Schema({
  language: String,
  code: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CodeSubmission', CodeSubmissionSchema);
