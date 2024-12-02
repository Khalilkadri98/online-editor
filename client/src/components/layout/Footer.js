// src/components/Footer.js
import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f2ddd5', padding: '1rem 0', marginTop: 'auto' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2" paragraph>
              We are a team of passionate developers creating awesome web experiences.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2" paragraph>
              <Link href="mailto:online@coding.com" color="inherit">
                <FontAwesomeIcon icon={faEnvelope} className="mx-2" />
                online@coding.com
              </Link>
            </Typography>
            <Typography variant="body2" paragraph>
              <Link href="tel:+4368181554967" color="inherit">
                <FontAwesomeIcon icon={faPhone} className="mx-2" />
                +4368181554967
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Follow Us</Typography>
            <div>
              <IconButton
                component="a"
                href="https://www.facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.twitter.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Online Coding. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
