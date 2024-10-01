import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Services.css';
import multiLanguage from '../assets/images/services/multi-language.jpg';
import collaboration from '../assets/images/services/collaboration.webp';
import ide from '../assets/images/services/ide.jpeg';
import security from '../assets/images/services/security.jpeg';
import test from '../assets/images/services/test.webp';
import versionControl from '../assets/images/services/version-control.png';
const Services = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Our Online Code Editor Services</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={multiLanguage} alt="Multi-Language Support" />
            <Card.Body>
              <Card.Title>Multi-Language Support</Card.Title>
              <Card.Text>
                Code in any language with syntax highlighting and enjoy a clear and readable code experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={collaboration} alt="Real-Time Collaboration" />
            <Card.Body>
              <Card.Title>Real-Time Collaboration</Card.Title>
              <Card.Text>
                Work with teammates in real-time, with changes instantly visible to all collaborators. Share your projects with ease.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={ide} alt="Integrated Development Environment" />
            <Card.Body>
              <Card.Title>Integrated Development Environment (IDE)</Card.Title>
              <Card.Text>
                Enjoy code autocompletion, linting, and debugging tools to speed up your development process.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={security} alt="Secure and Reliable" />
            <Card.Body>
              <Card.Title>Secure and Reliable</Card.Title>
              <Card.Text>
                Your projects are stored securely with robust authentication and encryption protocols. Track changes with integrated version control.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={test} alt="Test and Deploy" />
            <Card.Body>
              <Card.Title>Test and Deploy</Card.Title>
              <Card.Text>
                Execute your code directly in the browser to see instant results. Integrate with popular CI/CD tools for seamless deployment.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={versionControl} alt="Version Control" />
            <Card.Body>
              <Card.Title>Version Control</Card.Title>
              <Card.Text>
                Track changes and revert to previous versions of your code with integrated version control.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
