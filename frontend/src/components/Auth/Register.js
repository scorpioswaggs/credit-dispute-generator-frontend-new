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
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required'),
  lastName: yup
    .string()
    .required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  street: yup
    .string()
    .required('Street address is required'),
  city: yup
    .string()
    .required('City is required'),
  state: yup
    .string()
    .required('State is required'),
  zipCode: yup
    .string()
    .required('ZIP code is required')
    .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  phone: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in format XXX-XXX-XXXX')
});

const steps = ['Account Information', 'Personal Details'];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [registerError, setRegisterError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          address: {
            street: values.street,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode
          },
          phone: values.phone
        };
        
        await register(userData);
        navigate('/');
      } catch (error) {
        setRegisterError(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    },
  });

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate only first step fields
      const errors = {};
      ['firstName', 'lastName', 'email', 'password', 'confirmPassword'].forEach(field => {
        try {
          validationSchema.fields[field].validateSync(formik.values[field]);
        } catch (error) {
          errors[field] = error.message;
        }
      });
      
      if (Object.keys(errors).length === 0) {
        setActiveStep(1);
      } else {
        // Set touched for fields with errors
        formik.setTouched({
          ...formik.touched,
          ...Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
        });
      }
    } else {
      formik.handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ width: '100%', mt: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {registerError && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {registerError}
            </Alert>
          )}
          
          <Box component="form" sx={{ mt: 3, width: '100%' }}>
            {activeStep === 0 ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="street"
                    label="Street Address"
                    name="street"
                    autoComplete="street-address"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={formik.touched.street && Boolean(formik.errors.street)}
                    helperText={formik.touched.street && formik.errors.street}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="address-level2"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    autoComplete="address-level1"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="zipCode"
                    label="ZIP Code"
                    name="zipCode"
                    autoComplete="postal-code"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone Number (XXX-XXX-XXXX)"
                    name="phone"
                    autoComplete="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
              </Grid>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={formik.isSubmitting}
              >
                {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
              </Button>
            </Box>
            
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
