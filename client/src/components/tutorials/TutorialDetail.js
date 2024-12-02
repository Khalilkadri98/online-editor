import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Alert, Box, Stepper, Step, StepLabel } from '@mui/material';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement

const TutorialDetail = () => {
  const { tutorialId } = useParams();
  const [userId, setUserId] = useState(null); // Initialize as null
  const [tutorial, setTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserID = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    const fetchTutorialAndProgress = async () => {
      try {
        const tutorialResponse = await axios.get(`http://localhost:5000/api/tutorials/${tutorialId}`);
        setTutorial(tutorialResponse.data);

        if (userId) {
          const progressResponse = await axios.get(`http://localhost:5000/api/tutorials/progress/${userId}/${tutorialId}`);
          if (progressResponse.data) {
            setCurrentStep(progressResponse.data.currentStep);
          }
        }
      } catch (err) {
        setError('Error fetching tutorial or progress');
        console.error(err);
      }
    };

    if (userId) {
      fetchTutorialAndProgress();
    }
  }, [tutorialId, userId]); // Only fetch tutorial when userId is set

  const handleNext = async () => {
    if (currentStep < tutorial.steps.length) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      await saveProgress(newStep);
    }
  };

  const handlePrevious = async () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      await saveProgress(newStep);
    }
  };

  const saveProgress = async (step) => {
    try {
      console.log('Saving progress:', { userId, tutorialId, currentStep: step });
      await axios.post(`http://localhost:5000/api/tutorials/progress/${userId}/${tutorialId}`, { currentStep: step });
      console.log('Progress saved successfully');
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  if (!tutorial) {
    return <Typography variant="h6" color="textSecondary">Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6c5ce7' }}>
        {tutorial.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {tutorial.description}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={currentStep - 1} alternativeLabel>
          {tutorial.steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '60vh',  // Make sure it occupies enough vertical space
          backgroundColor: '#f5f5f5',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6c5ce7' }}>
          {tutorial.steps[currentStep - 1].title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {tutorial.steps[currentStep - 1].content}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          sx={{ width: '48%' }}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={currentStep === tutorial.steps.length}
          sx={{ width: '48%' }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default TutorialDetail;
