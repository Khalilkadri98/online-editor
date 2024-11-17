// components/TutorialList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

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
    <Container className="mt-5">
      <h2>Select a Tutorial:</h2>
      {error && <p>{error}</p>}
      {Object.keys(groupedTutorials).map((language) => (
        <div key={language}>
          <h3>{language}</h3>
          <Row>
            {groupedTutorials[language].map((tutorial) => (
              <Col key={tutorial._id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{tutorial.title}</Card.Title>
                    <Card.Text>{tutorial.description}</Card.Text>
                    <Button onClick={() => handleTutorialSelect(tutorial._id)}>
                      Start learning now.
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default TutorialList;
