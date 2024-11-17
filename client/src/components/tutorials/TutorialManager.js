import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TutorialForm from './TutorialForm';
import Modal from 'react-modal';

const TutorialManager = () => {
  const [tutorials, setTutorials] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchTutorials();
    fetchProgrammingLanguages();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tutorials');
      setTutorials(response.data);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    }
  };

  const fetchProgrammingLanguages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/programming-languages');
      setProgrammingLanguages(response.data);
    } catch (error) {
      console.error('Error fetching programming languages:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tutorials/${id}`);
      fetchTutorials();
    } catch (error) {
      console.error('Error deleting tutorial:', error);
    }
  };

  const handleSave = () => {
    setSelectedTutorial(null);
    setModalIsOpen(false);
    fetchTutorials();
  };

  const openModal = (tutorial = null) => {
    setSelectedTutorial(tutorial);
    setModalIsOpen(true);
  };

  return (
    <div>
      <h1>Tutorial Manager</h1>
      <button onClick={() => openModal()}>Create New Tutorial</button>
      <ul>
        {tutorials.map((tutorial) => (
          <li key={tutorial._id}>
            <h2>{tutorial.title}</h2>
            <p>{tutorial.description}</p>
            <button onClick={() => openModal(tutorial)}>Edit</button>
            <button onClick={() => handleDelete(tutorial._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <TutorialForm
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        tutorial={selectedTutorial}
        onSave={handleSave}
        programmingLanguages={programmingLanguages}
      />
    </div>
  );
};

export default TutorialManager;
