import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, Button, Alert } from '@mui/material';

const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tutorials');
        setTutorials(response.data);
      } catch (err) {
        setError('Error fetching tutorials');
        console.error(err);
      }
    };

    fetchTutorials();
  }, []);

  const handleTutorialSelect = (tutorialId) => {
    navigate(`/tutorials/${tutorialId}`);
  };

  // Group tutorials by language
  const groupedTutorials = tutorials.reduce((groups, tutorial) => {
    const language = tutorial.programmingLanguage.name;
    if (!groups[language]) {
      groups[language] = [];
    }
    groups[language].push(tutorial);
    return groups;
  }, {});

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#6c5ce7' }}>
        Select a Tutorial:
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {Object.keys(groupedTutorials).map((language) => (
        <div key={language}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px', color: '#6c5ce7' }}>
            {language}
          </Typography>
          
          <Grid container spacing={3}>
            {groupedTutorials[language].map((tutorial) => (
              <Grid item key={tutorial._id} xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {tutorial.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                      {tutorial.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      onClick={() => handleTutorialSelect(tutorial._id)}
                    >
                      Start learning now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Container>
  );
};

export default TutorialList;
