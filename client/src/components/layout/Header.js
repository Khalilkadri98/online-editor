// src/components/layout/Header.js
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { FaBell } from 'react-icons/fa';
import avatar from '../../assets/images/avatar.avif'; // Your avatar image

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#f2ddd5' }}>
      <Navbar.Brand as={Link} to={token ? "/dashboard" : "/"}>
        <img
          src={logo}
          width="80"
          height="40"
          className="d-inline-block align-top"
          alt="My Website Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!token && <Nav.Link as={Link} to="/services">Services</Nav.Link>}
          {!token && <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>}
          {!token && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
          {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          {token && <Nav.Link as={Link} to="/Editor">Editor</Nav.Link>}
        </Nav>
        {token && (
          <Nav className="ml-auto d-flex align-items-center">
            <Nav.Link>
              <FaBell size={20} />
            </Nav.Link>
            <Dropdown alignRight>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{
                  backgroundImage: `url(${avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                }}
              >
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
