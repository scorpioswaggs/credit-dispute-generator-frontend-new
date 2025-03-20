import React from 'react';
import { 
  Typography, 
  Box,
  Paper,
  Button,
  CircularProgress,
  Divider,
  Grid
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import { jsPDF } from 'jspdf';

const LetterPreview = ({ letterData, generatedLetter, isSubmitting }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add content to PDF
    const content = generatedLetter.letterContent;
    const contentLines = content.split('\n');
    
    let y = 20;
    doc.setFontSize(12);
    
    contentLines.forEach(line => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      doc.text(line, 20, y);
      y += 7;
    });
    
    // Save the PDF
    doc.save(`dispute-letter-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Letter Preview
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Review your dispute letter before generating the final version.
      </Typography>
      
      {isSubmitting ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Generating your dispute letter...
          </Typography>
        </Box>
      ) : generatedLetter ? (
        <Box>
          <Paper 
            elevation={0} 
            variant="outlined" 
            sx={{ 
              p: 3, 
              mb: 3, 
              maxHeight: '400px', 
              overflow: 'auto',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap'
            }}
          >
            {generatedLetter.letterContent}
          </Paper>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadPDF}
              >
                Download PDF
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<SaveIcon />}
              >
                Save to My Letters
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Paper elevation={0} variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ my: 4 }}>
              Click "Generate Letter" to create your dispute letter
            </Typography>
          </Paper>
          
          <Typography variant="subtitle1" gutterBottom>
            Letter Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Dispute Category:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {letterData.disputeDetails.category ? 
                  letterData.disputeDetails.category.charAt(0).toUpperCase() + 
                  letterData.disputeDetails.category.slice(1).replace(/([A-Z])/g, ' $1') : 
                  'Not selected'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Letter Format:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {letterData.letterFormat === 'metro2' ? 'Metro 2 Compliant' : 'FCRA, FTC & FDCPA-Based'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Creditor:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {letterData.creditorInfo.name || 'Not provided'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Account Number:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {letterData.creditorInfo.accountNumber || 'Not provided'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default LetterPreview;
