// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/images/avatar.avif'; // Your avatar image

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token) {
      fetchUserProfile();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <Card style={{ width: '18rem', margin: 'auto' }}>
        <Card.Img variant="top" src={avatar} alt="User Avatar" />
        <Card.Body>
          <Card.Title>{user.name || 'User Name'}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email || 'user@example.com'}
          </Card.Text>
          <Card.Text>
            <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString() || 'Date'}
          </Card.Text>
          <Button variant="primary" onClick={() => navigate('/edit-profile')}>
            Edit Profile
          </Button>
          <Button variant="danger" className="mt-2" onClick={handleLogout}>
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
