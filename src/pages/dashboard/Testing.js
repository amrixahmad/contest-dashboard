import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import { contestantService } from '../../services/contestantService';

const Testing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Fetch contestants
  const { 
    data: contestants, 
    isLoading, 
    error 
  } = useQuery('contestants', contestantService.getAllContestants);

  // Delete contestant mutation
  const deleteContestantMutation = useMutation(
    (userId) => contestantService.deleteContestant(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contestants');
      },
    }
  );

  const handleDeleteContestant = async (userId) => {
    if (window.confirm('Are you sure you want to delete this contestant?')) {
      try {
        await deleteContestantMutation.mutateAsync(userId);
      } catch (error) {
        console.error('Error deleting contestant:', error);
        alert(error.message || 'Failed to delete contestant');
      }
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      return 'Invalid date';
    }
  };

  const filteredContestants = contestants?.filter(contestant =>
    contestant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contestant.manychat_id.includes(searchTerm)
  );

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
          Error loading contestants: {error.message || 'Please try again later'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Contestant Management
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Search contestants"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>ManyChat ID</TableCell>
              <TableCell>Subscribed</TableCell>
              <TableCell>Last Interaction</TableCell>
              <TableCell>Total Oranges</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContestants?.map((contestant) => (
              <TableRow key={contestant.id}>
                <TableCell>{contestant.id}</TableCell>
                <TableCell>{contestant.first_name}</TableCell>
                <TableCell>{contestant.manychat_id}</TableCell>
                <TableCell>{formatDate(contestant.subscribed)}</TableCell>
                <TableCell>{formatDate(contestant.last_interaction)}</TableCell>
                <TableCell>{contestant.total_oranges}</TableCell>
                <TableCell>
                  <Chip 
                    label={contestant.subscribed ? "Active" : "Inactive"}
                    color={contestant.subscribed ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteContestant(contestant.id)}
                    disabled={deleteContestantMutation.isLoading}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Testing;
