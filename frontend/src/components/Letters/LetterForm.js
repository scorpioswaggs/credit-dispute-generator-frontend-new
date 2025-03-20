import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper
} from '@mui/material';
import PersonalInfoStep from './PersonalInfoStep';
import CreditorInfoStep from './CreditorInfoStep';
import DisputeDetailsStep from './DisputeDetailsStep';
import FormatSelectionStep from './FormatSelectionStep';
import LetterPreview from './LetterPreview';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const steps = [
  'Personal Information',
  'Creditor Information',
  'Dispute Details',
  'Letter Format',
  'Preview & Generate'
];

const LetterForm = () => {
  const navigate = useNavigate();
  const { currentUser, isPremium } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [letterData, setLetterData] = useState({
    personalInfo: {
      fullName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '',
      address: currentUser?.address || {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      phone: currentUser?.phone || '',
      email: currentUser?.email || ''
    },
    creditorInfo: {
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      accountNumber: ''
    },
    disputeDetails: {
      category: '',
      subCategory: '',
      reason: '',
      additionalDetails: ''
    },
    letterFormat: 'metro2',
    letterContent: '',
    status: 'draft'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState(null);

  const handleNext = () => {
    if (validateStep(activeStep)) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = (step) => {
    let stepErrors = {};
    let isValid = true;

    switch (step) {
      case 0: // Personal Information
        if (!letterData.personalInfo.fullName) {
          stepErrors.fullName = 'Full name is required';
          isValid = false;
        }
        if (!letterData.personalInfo.address.street) {
          stepErrors.street = 'Street address is required';
          isValid = false;
        }
        if (!letterData.personalInfo.address.city) {
          stepErrors.city = 'City is required';
          isValid = false;
        }
        if (!letterData.personalInfo.address.state) {
          stepErrors.state = 'State is required';
          isValid = false;
        }
        if (!letterData.personalInfo.address.zipCode) {
          stepErrors.zipCode = 'ZIP code is required';
          isValid = false;
        }
        break;
      case 1: // Creditor Information
        if (!letterData.creditorInfo.name) {
          stepErrors.creditorName = 'Creditor name is required';
          isValid = false;
        }
        if (!letterData.creditorInfo.accountNumber) {
          stepErrors.accountNumber = 'Account number is required';
          isValid = false;
        }
        break;
      case 2: // Dispute Details
        if (!letterData.disputeDetails.category) {
          stepErrors.category = 'Dispute category is required';
          isValid = false;
        }
        if (!letterData.disputeDetails.subCategory) {
          stepErrors.subCategory = 'Dispute sub-category is required';
          isValid = false;
        }
        if (!letterData.disputeDetails.reason) {
          stepErrors.reason = 'Dispute reason is required';
          isValid = false;
        }
        break;
      case 3: // Letter Format
        if (!letterData.letterFormat) {
          stepErrors.letterFormat = 'Letter format is required';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In a real implementation, this would call an API endpoint
      // const response = await axios.post('/api/letters', letterData);
      // setGeneratedLetter(response.data);
      
      // For now, simulate a successful response
      setTimeout(() => {
        setGeneratedLetter({
          ...letterData,
          id: 'temp-' + Date.now(),
          letterContent: generateSampleLetterContent(letterData),
          status: 'generated'
        });
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating letter:', error);
      setIsSubmitting(false);
    }
  };

  const generateSampleLetterContent = (data) => {
    const { personalInfo, creditorInfo, disputeDetails, letterFormat } = data;
    const date = new Date().toLocaleDateString();
    
    let content = `${personalInfo.fullName}\n`;
    content += `${personalInfo.address.street}\n`;
    content += `${personalInfo.address.city}, ${personalInfo.address.state} ${personalInfo.address.zipCode}\n\n`;
    content += `${date}\n\n`;
    content += `${creditorInfo.name}\n`;
    if (creditorInfo.address.street) {
      content += `${creditorInfo.address.street}\n`;
      content += `${creditorInfo.address.city}, ${creditorInfo.address.state} ${creditorInfo.address.zipCode}\n`;
    }
    content += `\nRe: Account Number: ${creditorInfo.accountNumber}\n\n`;
    content += `To Whom It May Concern:\n\n`;
    
    if (letterFormat === 'metro2') {
      content += `I am writing to dispute information that appears on my credit report. After reviewing my credit report, I noticed an error regarding the above-referenced account.\n\n`;
      content += `The following information is being disputed:\n`;
      content += `Dispute Category: ${disputeDetails.category}\n`;
      content += `Specific Issue: ${disputeDetails.subCategory}\n`;
      content += `Reason: ${disputeDetails.reason}\n\n`;
      content += `According to the Fair Credit Reporting Act (FCRA), you are required to report accurate information to the credit bureaus. I request that you investigate this matter and correct the reporting according to Metro 2 Format standards.\n\n`;
      if (disputeDetails.additionalDetails) {
        content += `Additional information: ${disputeDetails.additionalDetails}\n\n`;
      }
      content += `Please investigate this matter and update your records accordingly. I look forward to your prompt resolution of this issue.\n\n`;
    } else {
      content += `I am writing to dispute information that appears on my credit report in accordance with my rights under the Fair Credit Reporting Act (FCRA), 15 U.S.C. § 1681 et seq., the Fair Debt Collection Practices Act (FDCPA), 15 U.S.C. § 1692 et seq., and applicable FTC regulations.\n\n`;
      content += `I dispute the following information in my file:\n`;
      content += `Dispute Category: ${disputeDetails.category}\n`;
      content += `Specific Issue: ${disputeDetails.subCategory}\n`;
      content += `Reason: ${disputeDetails.reason}\n\n`;
      content += `This information is inaccurate because: ${disputeDetails.reason}\n\n`;
      if (disputeDetails.additionalDetails) {
        content += `Additional information: ${disputeDetails.additionalDetails}\n\n`;
      }
      content += `Under Section 611(a) of the FCRA, you are required to conduct a reasonable investigation and to remove or correct any information that is found to be inaccurate, incomplete, or unverifiable.\n\n`;
      content += `I request that you reinvestigate this matter and correct or delete the disputed information as required by the FCRA.\n\n`;
    }
    
    content += `Sincerely,\n\n\n`;
    content += `${personalInfo.fullName}`;
    
    return content;
  };

  const handleInputChange = (step, field, value) => {
    switch (step) {
      case 0: // Personal Information
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          setLetterData({
            ...letterData,
            personalInfo: {
              ...letterData.personalInfo,
              address: {
                ...letterData.personalInfo.address,
                [child]: value
              }
            }
          });
        } else {
          setLetterData({
            ...letterData,
            personalInfo: {
              ...letterData.personalInfo,
              [field]: value
            }
          });
        }
        break;
      case 1: // Creditor Information
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          setLetterData({
            ...letterData,
            creditorInfo: {
              ...letterData.creditorInfo,
              address: {
                ...letterData.creditorInfo.address,
                [child]: value
              }
            }
          });
        } else {
          setLetterData({
            ...letterData,
            creditorInfo: {
              ...letterData.creditorInfo,
              [field]: value
            }
          });
        }
        break;
      case 2: // Dispute Details
        setLetterData({
          ...letterData,
          disputeDetails: {
            ...letterData.disputeDetails,
            [field]: value
          }
        });
        break;
      case 3: // Letter Format
        setLetterData({
          ...letterData,
          letterFormat: value
        });
        break;
      default:
        break;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            personalInfo={letterData.personalInfo}
            onChange={(field, value) => handleInputChange(0, field, value)}
            errors={errors}
          />
        );
      case 1:
        return (
          <CreditorInfoStep
            creditorInfo={letterData.creditorInfo}
            onChange={(field, value) => handleInputChange(1, field, value)}
            errors={errors}
          />
        );
      case 2:
        return (
          <DisputeDetailsStep
            disputeDetails={letterData.disputeDetails}
            onChange={(field, value) => handleInputChange(2, field, value)}
            errors={errors}
          />
        );
      case 3:
        return (
          <FormatSelectionStep
            letterFormat={letterData.letterFormat}
            onChange={(value) => handleInputChange(3, 'letterFormat', value)}
            isPremium={isPremium}
            errors={errors}
          />
        );
      case 4:
        return (
          <LetterPreview
            letterData={letterData}
            generatedLetter={generatedLetter}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Create Dispute Letter
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {activeStep === steps.length - 1 ? 'Generate Letter' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LetterForm;
