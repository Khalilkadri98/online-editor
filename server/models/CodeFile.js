const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeFileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  files: [
    {
      filename: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
        default: '',
      },
    },
  ],
});

const CodeFile = mongoose.model('CodeFile', CodeFileSchema);

module.exports = CodeFile;
