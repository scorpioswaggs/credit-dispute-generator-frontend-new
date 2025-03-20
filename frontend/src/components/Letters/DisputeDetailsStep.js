import React from 'react';
import { 
  Grid, 
  TextField, 
  Typography, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

const DisputeDetailsStep = ({ disputeDetails, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  // Define dispute categories and their subcategories
  const disputeCategories = [
    {
      value: 'latePayment',
      label: 'Late Payment Disputes',
      subcategories: [
        { value: 'goodwill', label: 'Goodwill Adjustment' },
        { value: 'compliance', label: 'Compliance-Based Dispute' },
        { value: 'reportingError', label: 'Reporting Error' }
      ]
    },
    {
      value: 'collection',
      label: 'Collection Disputes',
      subcategories: [
        { value: 'debtValidation', label: 'Debt Validation' },
        { value: 'ceaseDesist', label: 'Cease & Desist' },
        { value: 'unverifiableDebt', label: 'Unverifiable Debt' }
      ]
    },
    {
      value: 'personalInfo',
      label: 'Personal Information Disputes',
      subcategories: [
        { value: 'incorrectName', label: 'Incorrect Name' },
        { value: 'incorrectSSN', label: 'Incorrect SSN' },
        { value: 'incorrectAddress', label: 'Incorrect Address' }
      ]
    },
    {
      value: 'account',
      label: 'Account Disputes',
      subcategories: [
        { value: 'fraudulentAccount', label: 'Fraudulent Account' },
        { value: 'chargeOff', label: 'Charge-Off Dispute' },
        { value: 'repossession', label: 'Repossession Dispute' }
      ]
    }
  ];

  // Get subcategories based on selected category
  const getSubcategories = () => {
    const category = disputeCategories.find(cat => cat.value === disputeDetails.category);
    return category ? category.subcategories : [];
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dispute Details
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Select the type of dispute and provide details about your situation.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.category}>
            <InputLabel id="category-label">Dispute Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={disputeDetails.category}
              label="Dispute Category"
              onChange={handleChange}
            >
              {disputeCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <FormControl fullWidth disabled={!disputeDetails.category} error={!!errors.subCategory}>
            <InputLabel id="subCategory-label">Dispute Sub-Category</InputLabel>
            <Select
              labelId="subCategory-label"
              id="subCategory"
              name="subCategory"
              value={disputeDetails.subCategory}
              label="Dispute Sub-Category"
              onChange={handleChange}
            >
              {getSubcategories().map((subcat) => (
                <MenuItem key={subcat.value} value={subcat.value}>
                  {subcat.label}
                </MenuItem>
              ))}
            </Select>
            {errors.subCategory && <FormHelperText>{errors.subCategory}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            id="reason"
            name="reason"
            label="Dispute Reason"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Explain why you are disputing this item on your credit report"
            value={disputeDetails.reason}
            onChange={handleChange}
            error={!!errors.reason}
            helperText={errors.reason}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            id="additionalDetails"
            name="additionalDetails"
            label="Additional Details (Optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Provide any additional information that may support your dispute"
            value={disputeDetails.additionalDetails}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisputeDetailsStep;
