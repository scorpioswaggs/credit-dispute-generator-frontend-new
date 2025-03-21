import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const faqs = [
  {
    question: "What is a credit dispute letter?",
    answer: "A credit dispute letter is a formal document sent to credit bureaus or creditors to challenge inaccurate information on your credit report. It's a right protected under the Fair Credit Reporting Act (FCRA)."
  },
  {
    question: "How does CrediSure help me dispute credit errors?",
    answer: "CrediSure provides professionally crafted letter templates, guides you through the dispute process, and helps you track your disputes. Our system ensures your letters include all necessary information and comply with relevant laws."
  },
  {
    question: "How long does the dispute process take?",
    answer: "Credit bureaus typically have 30 days to investigate and respond to your dispute. However, the complete process, including follow-ups and resolutions, may take 30-90 days depending on the complexity of your case."
  },
  {
    question: "What subscription plan should I choose?",
    answer: "Choose based on your needs: Basic for occasional disputes (3/month), Pro for unlimited disputes and premium features, or Enterprise for credit repair businesses needing multiple accounts and custom branding."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No refunds are provided for partial months."
  },
  {
    question: "Is my information secure?",
    answer: "Yes, we take security seriously. We use bank-level encryption to protect your data, never store complete credit card information, and comply with privacy laws and industry best practices."
  },
  {
    question: "Do you guarantee results?",
    answer: "While we provide powerful tools and professional templates, results depend on various factors including the validity of your dispute and the credit bureau's investigation. We can't guarantee specific outcomes but we help maximize your chances of success."
  },
  {
    question: "How do I track my disputes?",
    answer: "Our dashboard provides real-time tracking of all your disputes, including status updates, response deadlines, and success rates. You can also set up email notifications for important updates."
  }
];

const FAQ = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Find answers to common questions about CrediSure and credit disputes
        </Typography>

        <Paper sx={{ p: { xs: 2, md: 4 } }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ '&:not(:last-child)': { mb: 1 } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography variant="subtitle1" fontWeight="medium">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Can't find what you're looking for?{' '}
            <Typography
              component="a"
              href="/contact"
              color="primary"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Contact our support team
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default FAQ; 