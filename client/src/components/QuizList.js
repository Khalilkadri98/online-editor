// src/components/QuizList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
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
    <Container className="mt-5">
      <h2>Select a Quiz</h2>
      <Row>
        {quizzes.map((quiz) => (
          <Col key={quiz._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Card.Text>Difficulty: {quiz.difficulty}</Card.Text>
                <Button onClick={() => handleQuizSelect(quiz._id)}>Take Quiz</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuizList;
