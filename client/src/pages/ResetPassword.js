import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Extract the token from URL
    const token = searchParams.get('token');
    // Extract the email from URL
    const email = searchParams.get('email');

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/reset-password', { 
                token, 
                email,
                newPassword: password 
            });
            
            setSuccess(response.data.message);
            setError('');
            setTimeout(() => navigate('/login'), 3000);  // Redirect after 3 seconds
        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong');
            setSuccess('');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {!success && (
                <Form onSubmit={handlePasswordReset}>
                    <Form.Group controlId="formNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword" className="mt-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Reset Password
                    </Button>
                </Form>
            )}
        </Container>
    );
};

export default ResetPassword;
