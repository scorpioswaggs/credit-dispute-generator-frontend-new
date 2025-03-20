const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const DisputeTemplate = require('../models/DisputeTemplate');

// Register Handlebars helpers
Handlebars.registerHelper('if', function(conditional, options) {
  if (conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Load templates from files
const loadTemplateFromFile = (templateName) => {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}_template.txt`);
  return fs.readFileSync(templatePath, 'utf8');
};

// Initialize templates in database
exports.initializeTemplates = async () => {
  try {
    // Check if templates already exist
    const templatesCount = await DisputeTemplate.countDocuments();
    if (templatesCount > 0) {
      console.log('Templates already initialized');
      return;
    }

    // Load template content from files
    const metro2Template = loadTemplateFromFile('metro2');
    const legalTemplate = loadTemplateFromFile('legal');

    // Create template variations for different dispute categories
    const disputeCategories = [
      {
        category: 'latePayment',
        subcategories: [
          { value: 'goodwill', label: 'Goodwill Adjustment' },
          { value: 'compliance', label: 'Compliance-Based Dispute' },
          { value: 'reportingError', label: 'Reporting Error' }
        ]
      },
      {
        category: 'collection',
        subcategories: [
          { value: 'debtValidation', label: 'Debt Validation' },
          { value: 'ceaseDesist', label: 'Cease & Desist' },
          { value: 'unverifiableDebt', label: 'Unverifiable Debt' }
        ]
      },
      {
        category: 'personalInfo',
        subcategories: [
          { value: 'incorrectName', label: 'Incorrect Name' },
          { value: 'incorrectSSN', label: 'Incorrect SSN' },
          { value: 'incorrectAddress', label: 'Incorrect Address' }
        ]
      },
      {
        category: 'account',
        subcategories: [
          { value: 'fraudulentAccount', label: 'Fraudulent Account' },
          { value: 'chargeOff', label: 'Charge-Off Dispute' },
          { value: 'repossession', label: 'Repossession Dispute' }
        ]
      }
    ];

    // Create templates for each category and subcategory
    const templatePromises = [];

    disputeCategories.forEach(categoryObj => {
      categoryObj.subcategories.forEach(subcategory => {
        // Create Metro 2 template
        templatePromises.push(
          DisputeTemplate.create({
            category: categoryObj.category,
            subCategory: subcategory.value,
            format: 'metro2',
            templateTitle: `Metro 2 ${subcategory.label} Template`,
            templateContent: metro2Template,
            isPremium: false
          })
        );

        // Create Legal template (premium)
        templatePromises.push(
          DisputeTemplate.create({
            category: categoryObj.category,
            subCategory: subcategory.value,
            format: 'legal',
            templateTitle: `Legal ${subcategory.label} Template`,
            templateContent: legalTemplate,
            isPremium: true
          })
        );
      });
    });

    await Promise.all(templatePromises);
    console.log('Templates initialized successfully');
  } catch (error) {
    console.error('Error initializing templates:', error);
  }
};

// Generate letter content based on template and data
exports.generateLetterContent = (letterData, templateContent) => {
  try {
    const { personalInfo, creditorInfo, disputeDetails } = letterData;
    const date = new Date().toLocaleDateString();
    
    // Create header
    let header = `${personalInfo.fullName}\n`;
    header += `${personalInfo.address.street}\n`;
    header += `${personalInfo.address.city}, ${personalInfo.address.state} ${personalInfo.address.zipCode}\n\n`;
    header += `${date}\n\n`;
    header += `${creditorInfo.name}\n`;
    
    if (creditorInfo.address.street) {
      header += `${creditorInfo.address.street}\n`;
      header += `${creditorInfo.address.city}, ${creditorInfo.address.state} ${creditorInfo.address.zipCode}\n`;
    }
    
    header += `\nRe: Account Number: ${creditorInfo.accountNumber}\n\n`;
    
    // Create signature
    const signature = `Sincerely,\n\n\n${personalInfo.fullName}`;
    
    // Prepare template data
    const templateData = {
      HEADER: header,
      DISPUTE_CATEGORY: formatCategoryName(disputeDetails.category),
      DISPUTE_SUBCATEGORY: formatSubcategoryName(disputeDetails.subCategory),
      DISPUTE_REASON: disputeDetails.reason,
      ADDITIONAL_DETAILS: disputeDetails.additionalDetails,
      SIGNATURE: signature
    };
    
    // Compile and render template
    const template = Handlebars.compile(templateContent);
    return template(templateData);
  } catch (error) {
    console.error('Error generating letter content:', error);
    throw new Error('Failed to generate letter content');
  }
};

// Helper function to format category name
const formatCategoryName = (category) => {
  switch (category) {
    case 'latePayment':
      return 'Late Payment';
    case 'collection':
      return 'Collection';
    case 'personalInfo':
      return 'Personal Information';
    case 'account':
      return 'Account';
    default:
      return category;
  }
};

// Helper function to format subcategory name
const formatSubcategoryName = (subcategory) => {
  switch (subcategory) {
    case 'goodwill':
      return 'Goodwill Adjustment';
    case 'compliance':
      return 'Compliance-Based Dispute';
    case 'reportingError':
      return 'Reporting Error';
    case 'debtValidation':
      return 'Debt Validation';
    case 'ceaseDesist':
      return 'Cease & Desist';
    case 'unverifiableDebt':
      return 'Unverifiable Debt';
    case 'incorrectName':
      return 'Incorrect Name';
    case 'incorrectSSN':
      return 'Incorrect SSN';
    case 'incorrectAddress':
      return 'Incorrect Address';
    case 'fraudulentAccount':
      return 'Fraudulent Account';
    case 'chargeOff':
      return 'Charge-Off Dispute';
    case 'repossession':
      return 'Repossession Dispute';
    default:
      return subcategory;
  }
};
