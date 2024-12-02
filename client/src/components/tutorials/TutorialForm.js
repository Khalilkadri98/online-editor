import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Box, Button, TextField, Typography } from '@mui/material';
import Draggable from 'react-draggable'; // Import react-draggable

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
  },
};

const TutorialForm = ({ isOpen, onClose, tutorial, onSave, programmingLanguages }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languageId, setLanguageId] = useState('');
  const [steps, setSteps] = useState([{ stepNumber: 1, title: '', content: '' }]);

  useEffect(() => {
    if (tutorial) {
      setTitle(tutorial.title);
      setDescription(tutorial.description);
      setLanguageId(tutorial.programmingLanguage);
      setSteps(tutorial.steps);
    } else {
      setTitle('');
      setDescription('');
      setLanguageId('');
      setSteps([{ stepNumber: 1, title: '', content: '' }]);
    }
  }, [tutorial]);

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { stepNumber: steps.length + 1, title: '', content: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tutorialData = { title, description, languageId, steps };
    try {
      if (tutorial) {
        await axios.put(`http://localhost:5000/api/tutorials/${tutorial._id}`, tutorialData);
      } else {
        await axios.post('http://localhost:5000/api/tutorials', tutorialData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving tutorial:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Tutorial Form"
    >
      <Draggable>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" gutterBottom>
            {tutorial ? 'Edit Tutorial' : 'Create New Tutorial'}
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
            fullWidth
          />

          <TextField
            label="Programming Language"
            select
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
            required
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select Language</option>
            {programmingLanguages.map((lang) => (
              <option key={lang._id} value={lang._id}>
                {lang.name}
              </option>
            ))}
          </TextField>

          <Typography variant="subtitle1" gutterBottom>
            Steps
          </Typography>
          {steps.map((step, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label={`Step ${index + 1} Title`}
                value={step.title}
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                required
                fullWidth
              />
              <TextField
                label={`Step ${index + 1} Content`}
                value={step.content}
                onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                required
                multiline
                rows={4}
                fullWidth
              />
            </Box>
          ))}

          <Button variant="outlined" onClick={handleAddStep}>
            Add Step
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 3 }}>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Tutorial
            </Button>
          </Box>
        </Box>
      </Draggable>
    </Modal>
  );
};

export default TutorialForm;
