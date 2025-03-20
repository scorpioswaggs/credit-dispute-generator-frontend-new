import React from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
  Chip,
  Alert
} from '@mui/material';

const FormatSelectionStep = ({ letterFormat, onChange, isPremium, errors }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Letter Format Selection
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose the format for your dispute letter. Each format uses different legal approaches.
      </Typography>
      
      {errors.letterFormat && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.letterFormat}
        </Alert>
      )}
      
      <RadioGroup
        name="letterFormat"
        value={letterFormat}
        onChange={handleChange}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <FormControlLabel 
                value="metro2" 
                control={<Radio />} 
                label={
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Metro 2 Compliant Dispute
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Uses Metro 2 data compliance codes, reporting standards, and FCRA laws.
                    </Typography>
                  </Box>
                } 
                sx={{ width: '100%' }}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                This format focuses on technical compliance with credit reporting standards. It references specific Metro 2 
                format requirements that creditors must follow when reporting to credit bureaus.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">Key Features:</Typography>
                <ul>
                  <li>References Metro 2 Format compliance requirements</li>
                  <li>Focuses on data furnisher responsibilities</li>
                  <li>Uses technical reporting standards language</li>
                  <li>Effective for reporting errors and technical violations</li>
                </ul>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2, position: 'relative' }}>
              {!isPremium && (
                <Chip 
                  label="Premium" 
                  color="secondary" 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10,
                  }} 
                />
              )}
              <FormControlLabel 
                value="legal" 
                control={<Radio />} 
                disabled={!isPremium}
                label={
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      FCRA, FTC & FDCPA-Based Dispute
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Challenges violations under consumer protection laws.
                    </Typography>
                  </Box>
                } 
                sx={{ width: '100%' }}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                This format leverages consumer protection laws to challenge credit reporting violations. It cites specific 
                sections of the FCRA, FDCPA, and FTC regulations to strengthen your dispute.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">Key Features:</Typography>
                <ul>
                  <li>Cites specific sections of consumer protection laws</li>
                  <li>Includes statutory references to strengthen your case</li>
                  <li>Uses legal terminology for maximum impact</li>
                  <li>Effective for serious disputes requiring legal backing</li>
                </ul>
              </Box>
              
              {!isPremium && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Upgrade to premium to access this enhanced letter format with stronger legal arguments.
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </RadioGroup>
    </Box>
  );
};

export default FormatSelectionStep;
