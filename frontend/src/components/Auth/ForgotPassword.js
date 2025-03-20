import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Link, 
  Box, 
  Avatar, 
  Paper,
  Alert
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // In a real implementation, this would call an API endpoint
        // await axios.post('/api/auth/forgot-password', { email: values.email });
        setSubmitted(true);
      } catch (error) {
        setSubmitError(error.response?.data?.message || 'Failed to process request. Please try again.');
      }
    },
  });

  if (submitted) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Check Your Email
            </Typography>
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
              If an account exists for {formik.values.email}, we've sent instructions to reset your password.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              component={RouterLink}
              to="/login"
            >
              Return to Login
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Typography sx={{ mt: 2, textAlign: 'center' }}>
            Enter your email address and we'll send you instructions to reset your password.
          </Typography>
          
          {submitError && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {submitError}
            </Alert>
          )}
          
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              Send Reset Instructions
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Back to Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
