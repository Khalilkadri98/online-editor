import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Programming Language</label>
          <select
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
            required
          >
            <option value="">Select Language</option>
            {programmingLanguages.map((lang) => (
              <option key={lang._id} value={lang._id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Steps</label>
          {steps.map((step, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Step ${index + 1} Title`}
                value={step.title}
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                required
              />
              <textarea
                placeholder={`Step ${index + 1} Content`}
                value={step.content}
                onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                required
              ></textarea>
            </div>
          ))}
          <button type="button" onClick={handleAddStep}>
            Add Step
          </button>
        </div>
        <button type="submit">Save Tutorial</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default TutorialForm;
