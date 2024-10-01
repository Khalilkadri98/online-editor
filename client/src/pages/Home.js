// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LearnCode from "../assets/images/home.webp";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const Home = () => {
  const token = localStorage.getItem("token");
  const divStyle = {
    backgroundImage: `url(${LearnCode})`,
    backgroundSize: "cover", // This makes sure the image covers the entire div
    backgroundPosition: "right", // Center the image
    backgroundRepeat: "no-repeat",
    height: "500px",
    width: "60%", // Prevent the image from repeating
  };

  return (
    <div>
      <Container className="my-5" />
      <div class="row">
        <div class="col-sm-6" style={divStyle}></div>
        <div class="col-sm-4 my-5 mx-5">
          <h1>"Empowering Developers, One Line at a Time."</h1>
          <p>
            At our online coding platform, we believe every line of code can
            shape the future. Our mission is to provide developers with the
            tools and resources they need to bring their ideas to life. With
            seamless collaboration features and intuitive code editors, we
            create an environment where innovation thrives. Whether you're a
            seasoned programmer or just starting out, our platform supports your
            journey with a range of programming languages and real-time code
            sharing. Join our community of passionate developers and unlock your
            coding potential, one line at a time.
          </p>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-outline-info btn-lg m-3">
              <Nav.Link as={Link} to="/services">
                Services
              </Nav.Link>
            </button>
            <button type="button" class="btn btn-outline-warning btn-lg m-3">
              <Nav.Link as={Link} to="login">
                Get Started
              </Nav.Link>
            </button>
          </div>
          <div className="home-links">
            {token && (
              <Link to="/editor" className="home-link">
                Go to Editor
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
