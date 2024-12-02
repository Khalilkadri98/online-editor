import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract token and email from the URL
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/reset-password",
        {
          token,
          email,
          newPassword: password,
        }
      );

      setSuccess(response.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        marginBottom: "200px", // Minimized bottom margin
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 3, fontWeight: "bold", color: "#6c5ce7" }}
        >
          Reset Password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {!success && (
          <form onSubmit={handlePasswordReset}>
            <TextField
              label="New Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputLabelProps={{ style: { color: "#6c5ce7" } }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
              InputLabelProps={{ style: { color: "#6c5ce7" } }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ padding: "12px", borderRadius: 20 }}
            >
              Reset Password
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default ResetPassword;
