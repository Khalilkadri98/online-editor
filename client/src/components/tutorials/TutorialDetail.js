// components/TutorialDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement

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
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <h2>{tutorial.title}</h2>
      <p>{tutorial.description}</p>
      <div>
        <h3>{tutorial.steps[currentStep - 1].title}</h3>
        <p>{tutorial.steps[currentStep - 1].content}</p>
      </div>
      <Button onClick={handlePrevious} disabled={currentStep === 1}>
        Previous
      </Button>
      <Button onClick={handleNext} disabled={currentStep === tutorial.steps.length}>
        Next
      </Button>
    </Container>
  );
};

export default TutorialDetail;
