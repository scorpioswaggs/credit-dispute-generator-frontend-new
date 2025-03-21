import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from '@mui/material';

const plans = [
  {
    title: 'Basic',
    price: '9.99',
    description: 'Essential dispute letter features',
    features: [
      '3 dispute letters per month',
      'Basic templates',
      'Email support'
    ]
  },
  {
    title: 'Pro',
    price: '19.99',
    description: 'Advanced features for serious credit repair',
    features: [
      'Unlimited dispute letters',
      'Premium templates',
      'Priority support',
      'Credit score tracking'
    ]
  },
  {
    title: 'Enterprise',
    price: '49.99',
    description: 'Complete solution for credit repair businesses',
    features: [
      'All Pro features',
      'Multiple user accounts',
      'Custom branding',
      'API access',
      'Dedicated support'
    ]
  }
];

const Plans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planTitle) => {
    navigate('/subscription/checkout', { state: { plan: planTitle } });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Select the plan that best fits your needs
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item key={plan.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={plan.title}
                  titleTypographyProps={{ align: 'center' }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${plan.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
                    {plan.description}
                  </Typography>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {plan.features.map((feature) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={feature}
                        sx={{ mb: 1 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={() => handleSubscribe(plan.title)}
                  >
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Plans; 