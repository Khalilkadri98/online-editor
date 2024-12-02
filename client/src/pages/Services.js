import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import multiLanguage from '../assets/images/services/multi-language.jpg';
import collaboration from '../assets/images/services/collaboration.webp';
import ide from '../assets/images/services/ide.jpeg';
import security from '../assets/images/services/security.jpeg';
import test from '../assets/images/services/test.webp';
import versionControl from '../assets/images/services/version-control.png';

const Services = () => {
  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Our Online Code Editor Services
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              image: multiLanguage,
              title: 'Multi-Language Support',
              text: 'Code in any language with syntax highlighting and enjoy a clear and readable code experience.',
            },
            {
              image: collaboration,
              title: 'Real-Time Collaboration',
              text: 'Work with teammates in real-time, with changes instantly visible to all collaborators. Share your projects with ease.',
            },
            {
              image: ide,
              title: 'Integrated Development Environment (IDE)',
              text: 'Enjoy code autocompletion, linting, and debugging tools to speed up your development process.',
            },
            {
              image: security,
              title: 'Secure and Reliable',
              text: 'Your projects are stored securely with robust authentication and encryption protocols. Track changes with integrated version control.',
            },
            {
              image: test,
              title: 'Test and Deploy',
              text: 'Execute your code directly in the browser to see instant results. Integrate with popular CI/CD tools for seamless deployment.',
            },
            {
              image: versionControl,
              title: 'Version Control',
              text: 'Track changes and revert to previous versions of your code with integrated version control.',
            },
          ].map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia component="img" alt={service.title} height="200" image={service.image} />
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body1">{service.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
