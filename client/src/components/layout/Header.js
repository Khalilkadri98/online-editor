// src/components/layout/Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Avatar, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.avif'; // Your avatar image

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/login'); // Redirect to login page
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#f2ddd5' }}>
      <Toolbar>
        <img
          src={logo}
          width="80"
          height="40"
          alt="My Website Logo"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(token ? "/dashboard" : "/")}
        />
        <div style={{ flexGrow: 1 }}></div>
        <div>
          {!token && (
            <>
              <Button color="inherit" component={Link} to="/services">Services</Button>
              <Button color="inherit" component={Link} to="/aboutus">About Us</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
              <Button color="inherit" component={Link} to="/login">Login</Button>
            </>
          )}
          {token && (
            <>
              <Button color="inherit" component={Link} to="/tutorials">Tutorials</Button>
              <Button color="inherit" component={Link} to="/quizzes">Quizzes</Button>
              <Button color="inherit" component={Link} to="/Editor">Editor</Button>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={avatar} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
