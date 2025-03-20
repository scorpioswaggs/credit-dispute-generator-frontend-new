import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Box 
} from '@mui/material';

const PersonalInfoStep = ({ personalInfo, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Your Personal Information
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This information will be used in the header of your dispute letter.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            value={personalInfo.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="street"
            name="address.street"
            label="Street Address"
            fullWidth
            variant="outlined"
            value={personalInfo.address.street}
            onChange={handleChange}
            error={!!errors.street}
            helperText={errors.street}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="address.city"
            label="City"
            fullWidth
            variant="outlined"
            value={personalInfo.address.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="state"
            name="address.state"
            label="State"
            fullWidth
            variant="outlined"
            value={personalInfo.address.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="zipCode"
            name="address.zipCode"
            label="ZIP Code"
            fullWidth
            variant="outlined"
            value={personalInfo.address.zipCode}
            onChange={handleChange}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={personalInfo.phone}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            value={personalInfo.email}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoStep;
