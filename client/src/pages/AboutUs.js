import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/AboutUs.css"; // Import your custom CSS file
import mission from "../assets/images/aboutUs/mission.svg";
import vision from "../assets/images/aboutUs/vision.avif";
import values from "../assets/images/aboutUs/values.svg";
import ChrisBrown from "../assets/images/aboutUs/ChrisBrown.avif";
import EmilyDavis from "../assets/images/aboutUs/EmilyDavis.avif";
import JohnDoe from "../assets/images/aboutUs/JohnDoe.avif";

const AboutUs = () => {
  return (
    <section className="about-us">
      <Container>
        <h2 className="text-center">About Us</h2>
        <p className="text-center mb-5">
          Welcome to our online coding platform! We are dedicated to providing
          the best online code editor experience.
        </p>

        <Row className="section-content custom-border">
          <Col md={8}>
            <h3 className="section-title">Our Mission</h3>
            <p>
              Our mission is to empower developers to collaborate and create
              amazing projects with ease. We strive to provide a seamless and
              efficient coding experience for developers of all levels.
            </p>
          </Col>
          <Col
            md={4}
            style={{
              backgroundImage: `url(${mission})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></Col>
        </Row>

        <Row className="section-content custom-border">
          <Col md={8}>
            <h3 className="section-title">Our Vision</h3>
            <p>
              Our vision is to become the leading online code editor platform,
              where developers from around the world can collaborate, learn, and
              innovate together. We aim to build a vibrant community of
              developers who are passionate about coding and technology.
            </p>
          </Col>
          <Col
            md={4}
            style={{
              backgroundImage: `url(${vision})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></Col>
        </Row>

        <Row className="section-content custom-border">
          <Col md={8}>
            <h3 className="section-title">Our Values</h3>
            <p>We believe in:</p>
            <ul>
              <li>
                Innovation: Continuously improving and introducing new features
                to enhance the coding experience.
              </li>
              <li>
                Collaboration: Encouraging teamwork and knowledge sharing among
                developers.
              </li>
              <li>
                Integrity: Maintaining the highest standards of security and
                reliability.
              </li>
              <li>
                Community: Building a supportive and inclusive community for
                developers of all backgrounds.
              </li>
            </ul>
          </Col>
          <Col
            md={4}
            style={{
              backgroundImage: `url(${values})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></Col>
        </Row>

        {/* Divider Before Team Section */}
        <hr className="my-5" style={{ border: "1px solid #ccc" }} />

        {/* Team Section */}
        <h2 className="text-center">Meet Our Team</h2>

        <Row className="justify-content-center section-content">
          <Col md={4} className="team-member">
            <Card className="text-center p-3">
              <div className="d-flex justify-content-center">
                <Card.Img variant="top" src={JohnDoe} alt="Team Member 1" />
              </div>
              <Card.Body>
                <Card.Title>Jane Doe</Card.Title>
                <Card.Text>Lead Developer</Card.Text>
                <Card.Text>
                  John has over 10 years of experience in software development
                  and is passionate about creating efficient and user-friendly
                  applications.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="team-member">
            <Card className="text-center p-3">
              <div className="d-flex justify-content-center">
                <Card.Img variant="top" src={ChrisBrown} alt="Team Member 2" />
              </div>
              <Card.Body>
                <Card.Title>Chris Brown</Card.Title>
                <Card.Text>Product Manager</Card.Text>
                <Card.Text>
                  Chris oversees the product development process, ensuring that
                  our platform meets the needs of our users and stays ahead of
                  industry trends.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="team-member">
            <Card className="text-center p-3">
              <div className="d-flex justify-content-center">
                <Card.Img variant="top" src={EmilyDavis} alt="Emily Davis" />
              </div>
              <Card.Body>
                <Card.Title>Emily Davis</Card.Title>
                <Card.Text>UX/UI Designer</Card.Text>
                <Card.Text>
                  Emily is dedicated to creating intuitive and visually
                  appealing interfaces that enhance the user experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </section>
  );
};

export default AboutUs;
