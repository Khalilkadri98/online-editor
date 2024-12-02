// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LearnCode from "../assets/images/home.png";
import "./styles/Home.css";

const Home = () => {
  const token = localStorage.getItem("token");

  const divStyle = {
    backgroundImage: `url(${LearnCode})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "500px",
    width: "100%",
  };

  return (
      <Container>
        <Grid container spacing={4} alignItems="center" style={{ marginTop: "2rem" }}>
          <Grid item xs={12} md={6} style={divStyle}></Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              "Empowering Developers, One Line at a Time."
            </Typography>
            <Typography variant="body1" paragraph>
              At our online coding platform, we believe every line of code can shape the future. Our mission is to provide developers with the tools and resources they need to bring their ideas to life. With seamless collaboration features and intuitive code editors, we create an environment where innovation thrives. Whether you're a seasoned programmer or just starting out, our platform supports your journey with a range of programming languages and real-time code sharing. Join our community of passionate developers and unlock your coding potential, one line at a time.
            </Typography>
            <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="outlined" color="primary" size="large" component={Link} to="/services" style={{ marginRight: "1rem" }}>
                Services
              </Button>
              <Button variant="outlined" color="secondary" size="large" component={Link} to="/login">
                Get Started
              </Button>
            </Box>
            {token && (
              <Box mt={3}>
                <Link to="/editor" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary" size="large">
                    Go to Editor
                  </Button>
                </Link>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
  );
};

export default Home;
