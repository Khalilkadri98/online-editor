// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="text-dark mt-5 p-4" expand="lg" style={{ backgroundColor: '#f2ddd5' }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a team of passionate developers creating awesome web experiences.
            </p>
          </Col>
          <Col md={4}>
          <h5>Contact Us</h5>
          <p>
              <a href={`mailto:contact@cashflow.com`} className="text-dark">
                <FontAwesomeIcon icon={faEnvelope} className='mx-2' />online@coding.com
              </a>
            </p>
            <p>
              <a href={`tel:+4368181554967`} className="text-dark">
              <FontAwesomeIcon icon={faPhone} className='mx-2' />+4368181554967
              </a>
            </p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <p>
              <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="https://www.twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-dark mx-2">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} Online Coding. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
