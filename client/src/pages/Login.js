import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import login from '../assets/images/login.avif'; // Adjust the path accordingly
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Track login success
  const navigate = useNavigate();

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
    <div>
      <div className="row">
        <div className="col-sm-6">
          <img src={login} alt="My login" />
        </div>
        <div className="col-sm-4">
          <Container className="mt-5">
            <h2>Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success" className="mt-3">
                Sign in successful! Redirecting...
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Sign In
              </Button>
            </Form>
            <div className="mt-3">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div className="mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Sign up here.</Link>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Login;
