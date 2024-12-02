import React, { useState } from 'react';
import { Container, TextField, Button, Alert, Paper, Typography } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response.data.error);
      setMessage('');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '200px', // Minimized bottom margin
      }}
    >
      <Paper elevation={6} sx={{ padding: '24px 24px 16px', borderRadius: 3, backgroundColor: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#6c5ce7' }}>
          Forgot Password
        </Typography>
        
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            InputLabelProps={{ style: { color: '#6c5ce7' } }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ padding: '12px', borderRadius: 20 }}>
            Request Password Reset
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
