import React from 'react';
import { Box, Typography, Container, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              CrediSure
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Credit dispute letter generator that helps you take control of your credit report.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block">Home</Link>
            <Link href="/letters" color="inherit" display="block">My Letters</Link>
            <Link href="/subscription/plans" color="inherit" display="block">Subscription Plans</Link>
            <Link href="/affiliates" color="inherit" display="block">Credit Services</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="#" color="inherit" display="block">Terms of Service</Link>
            <Link href="#" color="inherit" display="block">Privacy Policy</Link>
            <Link href="#" color="inherit" display="block">Disclaimer</Link>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
              CrediSure
            </Link>{' '}
            {new Date().getFullYear()}
            {'. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
