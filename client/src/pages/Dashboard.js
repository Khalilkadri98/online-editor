import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Welcome Section */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome, {userData.username || 'User'}!
            </Typography>
            <Typography variant="body1">
              You are logged in as {userData.email || 'user@example.com'}
            </Typography>
          </Box>

          {/* Dashboard Cards */}
          <Grid container spacing={3}>
            {/* Statistics Card Example 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Projects
                  </Typography>
                  <Typography variant="h4">
                    {userData.totalProjects || 0}
                  </Typography>
                  <Button variant="outlined" sx={{ marginTop: 2 }}>
                    View Projects
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Statistics Card Example 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Code Saved
                  </Typography>
                  <Typography variant="h4">
                    {userData.totalSavedCode || 0}
                  </Typography>
                  <Button variant="outlined" sx={{ marginTop: 2 }}>
                    View Saved Codes
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Statistics Card Example 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <Typography variant="body1">
                    You have executed 5 code snippets today.
                  </Typography>
                  <Button variant="outlined" sx={{ marginTop: 2 }}>
                    View Activity
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Recent Activity Section */}
          <Box sx={{ marginTop: 5 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                - Completed a JavaScript challenge.
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                - Executed Python code to test new algorithms.
              </Typography>
              <Typography variant="body1">
                - Saved a new project: "React Components Design."
              </Typography>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
