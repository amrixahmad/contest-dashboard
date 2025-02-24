import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const isProtectedRoute = location.pathname.startsWith('/dashboard');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contest Dashboard
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Leaderboard
          </Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate('/dashboard/analytics')}>
                Analytics
              </Button>
              <Button color="inherit" onClick={() => navigate('/dashboard/testing')}>
                Testing
              </Button>
              <Button 
                color="inherit" 
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            !isProtectedRoute && (
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            )
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
