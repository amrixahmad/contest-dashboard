import React from 'react';
import { useQuery } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { leaderboardService } from '../services/leaderboardService';

const Leaderboard = () => {
  const { 
    data: leaderboard, 
    isLoading, 
    error 
  } = useQuery('leaderboard', leaderboardService.getLeaderboard);

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
          Error loading leaderboard: {error.message || 'Please try again later'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Good Deeds Contest Leaderboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Track your progress and see how many oranges you've earned through pledges and journals!
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">🍊 Oranges</TableCell>
              <TableCell align="right">Pledges Made</TableCell>
              <TableCell align="right">Journals Submitted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboard?.map((user, index) => (
              <TableRow 
                key={user.id}
                sx={{ backgroundColor: index < 3 ? 'rgba(255, 215, 0, 0.1)' : 'inherit' }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell align="right">{user.total_oranges}</TableCell>
                <TableCell align="right">{user.pledge_count}</TableCell>
                <TableCell align="right">{user.journal_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3, p: 2, bgcolor: 'info.main', color: 'white', borderRadius: 1 }}>
        <Typography variant="h6">How to Earn Oranges 🍊</Typography>
        <Typography>• Submit a pledge to do a good deed: +1 orange</Typography>
        <Typography>• Complete your pledge and submit a journal: +5 oranges</Typography>
        <Typography variant="caption">Note: Limited to one pledge and one journal per day</Typography>
      </Box>
    </Box>
  );
};

export default Leaderboard;
