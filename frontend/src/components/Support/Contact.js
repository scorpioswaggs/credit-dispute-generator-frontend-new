import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Snackbar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'urgent', label: 'Urgent' },
];

const INQUIRY_TYPES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'billing', label: 'Billing Issue' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'dispute', label: 'Dispute Assistance' },
  { value: 'other', label: 'Other' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: '',
    priority: 'medium',
    orderId: '',
    preferredContact: 'email',
    attachments: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData for file upload
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'attachments') {
        formDataToSend.append(key, formData[key]);
      }
    });
    formData.attachments.forEach(file => {
      formDataToSend.append('attachments', file);
    });

    try {
      // Here you would typically send the form data to your backend
      // const response = await axios.post('/api/support/tickets', formDataToSend);
      console.log('Form submitted:', formData);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: '',
        priority: 'medium',
        orderId: '',
        preferredContact: 'email',
        attachments: [],
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: 'support@credisure.com',
      link: 'mailto:support@credisure.com',
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: '1-800-CREDISURE',
      link: 'tel:1-800-CREDISURE',
    },
    {
      icon: <LocationIcon />,
      title: 'Address',
      content: '123 Credit Street, Suite 100, Financial District, NY 10004',
    },
    {
      icon: <AccessTimeIcon />,
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          We're here to help! Send us a message or use our support channels.
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Get in Touch
              </Typography>
              <Box sx={{ mt: 3 }}>
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {info.title}
                      </Typography>
                      {info.link ? (
                        <Typography
                          component="a"
                          href={info.link}
                          color="text.secondary"
                          sx={{
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {info.content}
                        </Typography>
                      ) : (
                        <Typography color="text.secondary">
                          {info.content}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Send us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Personal Information */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Preferred Contact Method</InputLabel>
                      <Select
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleInputChange}
                        label="Preferred Contact Method"
                      >
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="phone">Phone</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Inquiry Details */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Inquiry Type</InputLabel>
                      <Select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        label="Inquiry Type"
                      >
                        {INQUIRY_TYPES.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        label="Priority"
                      >
                        {PRIORITY_LEVELS.map((level) => (
                          <MenuItem key={level.value} value={level.value}>
                            {level.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Order/Transaction ID (if applicable)"
                      name="orderId"
                      value={formData.orderId}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* File Attachments */}
                  <Grid item xs={12}>
                    <input
                      accept="image/*,.pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<AttachFileIcon />}
                      >
                        Attach Files
                      </Button>
                    </label>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.attachments.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          onDelete={() => removeAttachment(index)}
                          sx={{ maxWidth: '200px' }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                    >
                      Submit Support Ticket
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Your support ticket has been created successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact; 