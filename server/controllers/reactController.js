const CodeFile = require('../models/CodeFile'); // Adjust the path as needed

const saveFiles= async (req, res) => {
    const { files } = req.body;
    const userId = req.user.id;
  
    if (!files || !Array.isArray(files)) {
      console.log('No files data provided or data is not an array'); // Log
      return res.status(400).json({ message: 'No files data provided or data is not an array' });
    }
  
    try {
      console.log('User ID:', userId); // Log
      console.log('Files to save:', files); // Log
  
      let codeFile = await CodeFile.findOne({ userId });
  
      if (codeFile) {
        console.log('Existing code file found:', codeFile); // Log
        codeFile.files = files;
      } else {
        console.log('No existing code file, creating new'); // Log
        codeFile = new CodeFile({ userId, files });
      }
  
      await codeFile.save();
      console.log('Files saved successfully'); // Log
      res.status(200).json({ message: 'Files saved successfully' });
    } catch (err) {
      console.error('Error saving files:', err);
      res.status(500).send('Error saving files');
    }
  };
  
  
 const loadFiles=async (req, res) => {
    try {
      const userId = req.user.id;
      const codeFile = await CodeFile.findOne({ userId });
  
      if (!codeFile) {
        return res.status(404).json({ message: 'No files found for this user.' });
      }
  
      res.json({ files: codeFile.files });
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { saveFiles, loadFiles };
