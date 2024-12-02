import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, Checkbox, FormControlLabel, Typography } from "@mui/material";
import signup from "../assets/images/signup.avif"; // Adjust the path accordingly
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [company, setCompany] = useState("");
  const [agb, setAgb] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long, contain one capital letter, and one special character");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agb) {
      setError("You must agree to the terms and conditions");
      return;
    }

    const userData = {
      email,
      password,
      username,
      gender,
      phoneNumber,
      company,
      yearsOfExperience,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);

      if (response.status === 201) {
        setSuccess(true);
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={signup}
              alt="signup"
              style={{ width: "100%", height: "auto", maxHeight: "100%", objectFit: "cover", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Sign up successful! Redirecting to sign-in...
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Grid>
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
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      label="Gender"
                      required
                    >
                      <MenuItem value="">Select your gender</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Years of Experience</InputLabel>
                    <Select
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                      label="Years of Experience"
                      required
                    >
                      <MenuItem value="">Select years of experience</MenuItem>
                      <MenuItem value="0 to 2">From 0 to 2 years</MenuItem>
                      <MenuItem value="2 to 5">From 2 to 5 years</MenuItem>
                      <MenuItem value="5 to 10">From 5 to 10 years</MenuItem>
                      <MenuItem value="10 years or more">10 years or more</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company"
                    variant="outlined"
                    fullWidth
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agb}
                        onChange={(e) => setAgb(e.target.checked)}
                        required
                      />
                    }
                    label="I agree to the terms and conditions"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Sign Up
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;
