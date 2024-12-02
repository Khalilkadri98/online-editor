// src/components/QuizList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Select a Quiz
      </Typography>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item key={quiz._id} xs={12} sm={6} md={4}>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6">{quiz.title}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {quiz.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Difficulty: {quiz.difficulty}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleQuizSelect(quiz._id)}
                sx={{ marginTop: 2 }}
              >
                Take Quiz
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QuizList;
