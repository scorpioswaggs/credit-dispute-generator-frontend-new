import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ErrorOutline as ErrorOutlineIcon,
} from '@mui/material';

const SubscriptionStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const success = location.state?.success ?? false;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          {success ? (
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />
          ) : (
            <ErrorOutlineIcon color="error" sx={{ fontSize: 64 }} />
          )}
        </Box>

        <Typography variant="h4" gutterBottom>
          {success ? 'Subscription Successful!' : 'Subscription Failed'}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {success
            ? 'Thank you for subscribing. Your account has been successfully updated.'
            : 'There was an error processing your subscription. Please try again.'}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => navigate(success ? '/dashboard' : '/subscription/plans')}
            sx={{ mr: 2 }}
          >
            {success ? 'Go to Dashboard' : 'Try Again'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/subscription/plans')}
          >
            View Plans
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SubscriptionStatus; 