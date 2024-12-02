import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, TextField, Button, Alert, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import login from '../assets/images/login.avif'; // Adjust the path accordingly
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Track login success
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    if (message) {
      setMessage(message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state on new submission
    setSuccess(false); // Reset success state

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setSuccess(true); // Set success state to true
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        setError(response.data.message || 'Login failed. Please try again.'); // Improved error message handling
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="stretch">
          {/* Image Section */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={login}
              alt="Login"
            
            />
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Sign in successful! Redirecting...
              </Alert>
            )}
            {message && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>

            <div className="mt-3">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div className="mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Sign up here.</Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
