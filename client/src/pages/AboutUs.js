import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent
} from "@mui/material";
import mission from "../assets/images/aboutUs/mission.svg";
import vision from "../assets/images/aboutUs/vision.avif";
import values from "../assets/images/aboutUs/values.svg";
import ChrisBrown from "../assets/images/aboutUs/ChrisBrown.avif";
import EmilyDavis from "../assets/images/aboutUs/EmilyDavis.avif";
import JohnDoe from "../assets/images/aboutUs/JohnDoe.avif";

const AboutUs = () => {
  const sectionContentStyles = {
    display: "flex",
    alignItems: "center",
    padding: "2rem 0",
    borderBottom: "1px solid #ccc"
  };

  return (
    <section className="about-us">
      <Box sx={{ margin: "2rem 0" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Welcome to our online coding platform! We are dedicated to providing
            the best online code editor experience.
          </Typography>

          <Grid container spacing={4} sx={sectionContentStyles}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1">
                Our mission is to empower developers to collaborate and create
                amazing projects with ease. We strive to provide a seamless and
                efficient coding experience for developers of all levels.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                backgroundImage: `url(${mission})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px"
              }}
            ></Grid>
          </Grid>

          <Grid container spacing={4} sx={sectionContentStyles}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1">
                Our vision is to become the leading online code editor platform,
                where developers from around the world can collaborate, learn,
                and innovate together. We aim to build a vibrant community of
                developers who are passionate about coding and technology.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                backgroundImage: `url(${vision})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px"
              }}
            ></Grid>
          </Grid>

          <Grid container spacing={4} sx={sectionContentStyles}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Our Values
              </Typography>
              <Typography variant="body1">We believe in:</Typography>
              <ul>
                <li>
                  Innovation: Continuously improving and introducing new
                  features to enhance the coding experience.
                </li>
                <li>
                  Collaboration: Encouraging teamwork and knowledge sharing
                  among developers.
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
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                backgroundImage: `url(${values})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "200px"
              }}
            ></Grid>
          </Grid>

          <Box sx={{ my: 5, borderBottom: "1px solid #ccc" }} />

          <Typography variant="h3" align="center" gutterBottom>
            Meet Our Team
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  textAlign: "center",
                  p: 3
                }}
              >
                <CardMedia
                  component="img"
                  alt="John Doe"
                  height="300"
                  image={JohnDoe}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Jane Doe
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Lead Developer
                  </Typography>
                  <Typography variant="body2">
                    John has over 10 years of experience in software development
                    and is passionate about creating efficient and user-friendly
                    applications.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  textAlign: "center",
                  p: 3
                }}
              >
                <CardMedia
                  component="img"
                  alt="Chris Brown"
                  height="300"
                  image={ChrisBrown}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Chris Brown
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Product Manager
                  </Typography>
                  <Typography variant="body2">
                    Chris oversees the product development process, ensuring
                    that our platform meets the needs of our users and stays
                    ahead of industry trends.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  textAlign: "center",
                  p: 3
                }}
              >
                <CardMedia
                  component="img"
                  alt="Emily Davis"
                  height="300"
                  image={EmilyDavis}
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Emily Davis
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    UX/UI Designer
                  </Typography>
                  <Typography variant="body2">
                    Emily is dedicated to creating intuitive and visually
                    appealing interfaces that enhance the user experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </section>
  );
};

export default AboutUs;
