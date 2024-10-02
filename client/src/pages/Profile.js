// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/images/avatar.avif'; // Your avatar image

const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
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
        setFormData(response.data);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options); // 'en-GB' locale for DD/MM/YYYY format
  };

  return (
    <Container className="mt-5">
      <Card style={{ width: '18rem', margin: 'auto' }}>
        <Card.Img variant="top" src={avatar} alt="User Avatar" />
        <Card.Body>
          {isEditing ? (
            <>
              <Form>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" name="gender" value={formData.gender} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company</Form.Label>
                  <Form.Control type="text" name="company" value={formData.company} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Years of Experience</Form.Label>
                  <Form.Control type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
                </Form.Group>
              </Form>
              <Button variant="primary" onClick={handleSave}>Save</Button>
              <Button variant="secondary" className="mt-2" onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <>
              <Card.Title>{user.username || 'User Name'}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email || 'user@example.com'}
              </Card.Text>
              <Card.Text>
                <strong>Member since:</strong> {user.inscriptionDate? formatDate(user.inscriptionDate) : 'Date'}
              </Card.Text>
              <Card.Text>
                <strong>Gender:</strong> {user.gender || 'Not specified'}
              </Card.Text>
              <Card.Text>
                <strong>Phone Number:</strong> {user.phoneNumber || 'Not specified'}
              </Card.Text>
              <Card.Text>
                <strong>Company:</strong> {user.company || 'Not specified'}
              </Card.Text>
              <Card.Text>
                <strong>Years of Experience:</strong> {user.yearsOfExperience !== undefined ? user.yearsOfExperience : 'Not specified'}
              </Card.Text>
              <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
              <Button variant="danger" className="mt-2" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
