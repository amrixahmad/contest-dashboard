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
  Divider
} from '@mui/material';
import { api } from '../../services/dummyData';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('daily');
  const { data: analytics, isLoading, error } = useQuery('analytics', api.getAnalytics);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading analytics</Typography>;

  const handleTimeframeChange = (event, newTimeframe) => {
    if (newTimeframe !== null) {
      setTimeframe(newTimeframe);
    }
  };

  const stats = analytics?.stats[timeframe] || {};

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
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">Total Users</Typography>
            <Typography variant="h3">{analytics?.totalUsers}</Typography>
            <Typography variant="body2" color="text.secondary">
              {stats.newUsers} new users ({timeframe})
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">Active Users</Typography>
            <Typography variant="h3">{analytics?.activeUsers}</Typography>
            <Typography variant="body2" color="text.secondary">
              Currently participating
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">Pledges Made</Typography>
            <Typography variant="h3">{stats.pledges}</Typography>
            <Typography variant="body2" color="text.secondary">
              Good deeds pledged ({timeframe})
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">Journals Submitted</Typography>
            <Typography variant="h3">{stats.journals}</Typography>
            <Typography variant="body2" color="text.secondary">
              Good deeds completed ({timeframe})
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <List>
              {analytics?.recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`User ${activity.userId} submitted a ${activity.type}`}
                      secondary={new Date(activity.date).toLocaleString()}
                    />
                  </ListItem>
                  {index < analytics.recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
