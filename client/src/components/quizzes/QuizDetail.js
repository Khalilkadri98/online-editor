import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Alert, Typography, LinearProgress, Box, Card, CardContent } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const QuizDetail = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [quizPassed, setQuizPassed] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Error fetching quiz');
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (quiz && quiz.questions && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(10);
    } else if (quiz && quiz.questions && currentQuestionIndex === quiz.questions.length - 1) {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User not authenticated');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    try {
      const response = await axios.post('http://localhost:5000/api/quizzes/submit', {
        quizId,
        answers,
        userId,
      });

      setScore(response.data.score);
      setQuizPassed(response.data.passed);

      // Redirect to /quizzes after 5 seconds
      setTimeout(() => {
        navigate('/quizzes');
      }, 5000);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Error submitting quiz');
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

  // Calculate progress as a percentage
  const progress = (timeLeft / 10) * 100;

  return (
    <Container sx={{ mt: 5, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        {quiz.title}
      </Typography>

      {/* Box for the question, answers, timer, and button */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        minHeight: '50vh',
      }}>
        {quizPassed !== null ? (
          quizPassed ? (
            <Alert severity="success">
              Congratulations! You passed the quiz with a score of {score} out of {quiz.questions.length}. You will be redirected to the quizzes page shortly.
            </Alert>
          ) : (
            <Alert severity="error">
              You did not pass the quiz. Your score is {score} out of {quiz.questions.length}. Please try again. You will be redirected to the quizzes page shortly.
            </Alert>
          )
        ) : (
          <>
            {/* Timer as Progress Bar */}
            <Typography variant="h6">Time left: {timeLeft} seconds</Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ width: '100%', mt: 2 }} />
            
            <FormControl component="fieldset" sx={{ mt: 3 }}>
              <FormLabel component="legend">{quiz.questions[currentQuestionIndex].questionText}</FormLabel>
              <RadioGroup
                value={answers[currentQuestionIndex] || ''}
                onChange={handleAnswerChange}
              >
                {quiz.questions[currentQuestionIndex].options.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        )}
        
        {/* Next/Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          sx={{ mt: 3, position: 'relative' }}
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
        </Button>
      </Box>
    </Container>
  );
};

export default QuizDetail;
