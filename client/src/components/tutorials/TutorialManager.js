import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TutorialForm from './TutorialForm';
import Modal from 'react-modal';
import { Box, Button, Typography, List, ListItem, Card, CardContent, CardActions, Divider } from '@mui/material';

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
    setSelectedTutorial(tutorial);  // Pass selected tutorial to state
    setModalIsOpen(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tutorial Manager
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => openModal()} 
        sx={{ marginBottom: 3 }}
      >
        Create New Tutorial
      </Button>
      <List>
        {tutorials.map((tutorial) => (
          <ListItem key={tutorial._id} sx={{ marginBottom: 2 }}>
            <Card variant="outlined" sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h6">{tutorial.title}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {tutorial.description}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button 
                  size="small" 
                  color="primary" 
                  onClick={() => openModal(tutorial)}
                >
                  Edit
                </Button>
                <Button 
                  size="small" 
                  color="secondary" 
                  onClick={() => handleDelete(tutorial._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
      <TutorialForm
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        tutorial={selectedTutorial}
        onSave={handleSave}
        programmingLanguages={programmingLanguages}
      />
    </Box>
  );
};

export default TutorialManager;
