import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Alert } from 'react-bootstrap';

const Tutorial = () => {
  const { tutorialId } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tutorials/${tutorialId}`);
        setTutorial(response.data);
      } catch (error) {
        console.error('Error fetching tutorial:', error);
        setError('Error fetching tutorial');
      }
    };

    const fetchProgress = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/tutorials/user-progress/${tutorialId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgress(response.data);
        setCurrentStep(response.data.currentStep || 1);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchTutorial();
    fetchProgress();
  }, [tutorialId]);

  const handleNextStep = async () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    await updateProgress(nextStep);
  };

  const handlePreviousStep = async () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    await updateProgress(prevStep);
  };

  const updateProgress = async (step) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/tutorials/user-progress',
        {
          tutorialId,
          currentStep: step,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!tutorial) {
    return <div>Loading...</div>;
  }

  const currentStepData = tutorial.steps.find(step => step.stepNumber === currentStep);

  return (
    <Container className="mt-5">
      <h2>{tutorial.title}</h2>
      {currentStepData && (
        <div>
          <h3>Step {currentStep}: {currentStepData.title}</h3>
          <p>{currentStepData.content}</p>
        </div>
      )}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={handlePreviousStep} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleNextStep} disabled={currentStep === tutorial.steps.length}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Tutorial;
