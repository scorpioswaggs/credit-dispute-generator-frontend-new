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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        setLoginError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
      }
    },
  });

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          {loginError && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {loginError}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
