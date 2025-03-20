import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          {children}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default MainLayout;
