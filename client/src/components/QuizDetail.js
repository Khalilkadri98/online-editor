// src/components/QuizDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement

const QuizDetail = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [quizPassed, setQuizPassed] = useState(null); // To track if the user passed the quiz

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
      setQuizPassed(response.data.passed); // Set the passed state
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
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!quiz) {
    return <div>Loading...</div>;
  }

 
  return (
    <Container className="mt-5">
      <h2>{quiz.title}</h2>
      {quizPassed !== null ? (
        quizPassed ? (
          <Alert variant="success">
            Congratulations! You passed the quiz with a score of {score} out of {quiz.questions.length}. You will be redirected to the quizzes page shortly.
          </Alert>
        ) : (
          <Alert variant="danger">
            You did not pass the quiz. Your score is {score} out of {quiz.questions.length}. Please try again. You will be redirected to the quizzes page shortly.
          </Alert>
        )
      ) : (
        <>
          <p>Time left: {timeLeft} seconds</p>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label>{quiz.questions[currentQuestionIndex].questionText}</Form.Label>
              {quiz.questions[currentQuestionIndex].options.map((option, i) => (
                <Form.Check
                  key={i}
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  label={option}
                  value={option}
                  onChange={handleAnswerChange}
                />
              ))}
            </Form.Group>
            <Button variant="primary" onClick={handleNextQuestion}>
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default QuizDetail;
