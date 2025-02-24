import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Grid,
  Paper,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { analyticsService } from '../../services/analyticsService';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('daily');
  
  const { data: analytics, isLoading, error } = useQuery(
    'analytics',
    analyticsService.getAnalytics,
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      staleTime: 10000, // Consider data stale after 10 seconds
    }
  );

  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) {
      setTimeframe(newTimeframe);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 2 }}>
        <Alert severity="error">
          Error loading analytics: {error.message || 'Please try again later'}
        </Alert>
      </Box>
    );
  }

  const stats = analytics?.stats?.[timeframe] || {};
  const totalUsers = analytics?.totalUsers || 0;
  const activeUsers = analytics?.activeUsers || 0;

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Contest Analytics</Typography>
        <ToggleButtonGroup
          value={timeframe}
          exclusive
          onChange={handleTimeframeChange}
          aria-label="timeframe"
        >
          <ToggleButton value="daily" aria-label="daily">
            Daily
          </ToggleButton>
          <ToggleButton value="weekly" aria-label="weekly">
            Weekly
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="monthly">
            Monthly
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Overview Stats */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Overview</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Total Users</Typography>
                  <Typography variant="h4">{totalUsers}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Active Users</Typography>
                  <Typography variant="h4">{activeUsers}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Time-based Stats */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Activity</Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="New Pledges" 
                  secondary={stats.pledges || 0}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="New Journals" 
                  secondary={stats.journals || 0}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="New Users" 
                  secondary={stats.newUsers || 0}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Additional Stats */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Engagement</Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Average Pledges per User" 
                  secondary={(stats.pledges / activeUsers || 0).toFixed(2)}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Average Journals per User" 
                  secondary={(stats.journals / activeUsers || 0).toFixed(2)}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="User Growth Rate" 
                  secondary={`${((stats.newUsers / totalUsers || 0) * 100).toFixed(1)}%`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
