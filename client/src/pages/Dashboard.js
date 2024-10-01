import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Dashboard.css';  // Import your custom CSS file

const Dashboard = () => {
  return (
    <section className="dashboard">
      <Container>
        <h2 className="text-center">User Dashboard</h2>

        {/* User Information */}
        <section className="user-info">
          <Row>
            <Col md={6}>
              <Card>
                <Card.Header>User Information</Card.Header>
                <Card.Body>
                  <Card.Title>John Doe</Card.Title>
                  <Card.Text>Email: john.doe@example.com</Card.Text>
                  <Card.Text>Joined: January 1, 2024</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header>Account Details</Card.Header>
                <Card.Body>
                  <Card.Text>Subscription: Premium</Card.Text>
                  <Card.Text>Status: Active</Card.Text>
                  <Button variant="primary">Manage Subscription</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Recent Activity */}
        <section className="recent-activity">
          <Row>
            <Col md={12}>
              <Card>
                <Card.Header>Recent Activity</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Edited "project1.js" on September 25, 2024</ListGroup.Item>
                  <ListGroup.Item>Created "project2.js" on September 24, 2024</ListGroup.Item>
                  <ListGroup.Item>Joined a collaborative session with Jane Doe on September 23, 2024</ListGroup.Item>
                  <ListGroup.Item>Upgraded to Premium on September 22, 2024</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Start New Project</Card.Title>
                  <Button variant="success" block>Create Project</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>View Projects</Card.Title>
                  <Button variant="info" block>Go to Projects</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Join Collaboration</Card.Title>
                  <Button variant="warning" block>Join Now</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </section>
  );
};

export default Dashboard;
