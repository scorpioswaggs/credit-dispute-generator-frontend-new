import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const AffiliateLinks = () => {
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);
  
  // Mock data - in real app, this would come from your backend
  const affiliateData = {
    referralCode: 'REF123456',
    referralLink: 'https://credisure.com/ref/REF123456',
    stats: {
      clicks: 145,
      signups: 23,
      earnings: 460.00,
      conversionRate: '15.86%'
    },
    recentReferrals: [
      {
        id: 1,
        date: '2024-03-20',
        status: 'Completed',
        commission: 20.00
      },
      {
        id: 2,
        date: '2024-03-19',
        status: 'Pending',
        commission: 20.00
      },
      {
        id: 3,
        date: '2024-03-18',
        status: 'Completed',
        commission: 20.00
      }
    ]
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateData.referralLink);
    setShowCopiedAlert(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join CrediSure',
          text: 'Check out this amazing credit dispute letter generator!',
          url: affiliateData.referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Affiliate Dashboard
        </Typography>

        {/* Referral Link Section */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Referral Link
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body1"
              sx={{
                flex: 1,
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 1,
                fontFamily: 'monospace'
              }}
            >
              {affiliateData.referralLink}
            </Typography>
            <IconButton onClick={handleCopyLink} title="Copy link">
              <ContentCopyIcon />
            </IconButton>
            <IconButton onClick={handleShare} title="Share link">
              <ShareIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Stats Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 4 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Total Clicks</Typography>
            <Typography variant="h4">{affiliateData.stats.clicks}</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Signups</Typography>
            <Typography variant="h4">{affiliateData.stats.signups}</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Earnings</Typography>
            <Typography variant="h4">${affiliateData.stats.earnings}</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Conversion Rate</Typography>
            <Typography variant="h4">{affiliateData.stats.conversionRate}</Typography>
          </Paper>
        </Box>

        {/* Recent Referrals Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Referrals
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Commission</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {affiliateData.recentReferrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell>{referral.date}</TableCell>
                    <TableCell>
                      <Typography
                        component="span"
                        sx={{
                          color: referral.status === 'Completed' ? 'success.main' : 'warning.main',
                          fontWeight: 'medium'
                        }}
                      >
                        {referral.status}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">${referral.commission.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Snackbar
        open={showCopiedAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopiedAlert(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Referral link copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AffiliateLinks; 