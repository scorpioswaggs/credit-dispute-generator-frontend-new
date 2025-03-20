import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Box 
} from '@mui/material';

const CreditorInfoStep = ({ creditorInfo, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Creditor Information
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter the information about the creditor you are disputing with.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="creditorName"
            name="name"
            label="Creditor Name"
            fullWidth
            variant="outlined"
            value={creditorInfo.name}
            onChange={handleChange}
            error={!!errors.creditorName}
            helperText={errors.creditorName}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            id="street"
            name="address.street"
            label="Street Address"
            fullWidth
            variant="outlined"
            value={creditorInfo.address.street}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="address.city"
            label="City"
            fullWidth
            variant="outlined"
            value={creditorInfo.address.city}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <TextField
            id="state"
            name="address.state"
            label="State"
            fullWidth
            variant="outlined"
            value={creditorInfo.address.state}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <TextField
            id="zipCode"
            name="address.zipCode"
            label="ZIP Code"
            fullWidth
            variant="outlined"
            value={creditorInfo.address.zipCode}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="accountNumber"
            name="accountNumber"
            label="Account Number"
            fullWidth
            variant="outlined"
            value={creditorInfo.accountNumber}
            onChange={handleChange}
            error={!!errors.accountNumber}
            helperText={errors.accountNumber}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreditorInfoStep;
