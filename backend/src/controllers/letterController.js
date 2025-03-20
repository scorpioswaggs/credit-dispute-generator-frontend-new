const DisputeLetter = require('../models/DisputeLetter');
const DisputeTemplate = require('../models/DisputeTemplate');

// @desc    Get all letters for current user
// @route   GET /api/letters
// @access  Private
exports.getLetters = async (req, res) => {
  try {
    const letters = await DisputeLetter.find({ userId: req.user._id });
    
    res.status(200).json({
      success: true,
      count: letters.length,
      data: letters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single letter
// @route   GET /api/letters/:id
// @access  Private
exports.getLetter = async (req, res) => {
  try {
    const letter = await DisputeLetter.findById(req.params.id);
    
    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found'
      });
    }
    
    // Check if letter belongs to user
    if (letter.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this letter'
      });
    }
    
    res.status(200).json({
      success: true,
      data: letter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new letter
// @route   POST /api/letters
// @access  Private
exports.createLetter = async (req, res) => {
  try {
    // Add user ID to request body
    req.body.userId = req.user._id;
    
    // Create letter
    const letter = await DisputeLetter.create(req.body);
    
    res.status(201).json({
      success: true,
      data: letter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update letter
// @route   PUT /api/letters/:id
// @access  Private
exports.updateLetter = async (req, res) => {
  try {
    let letter = await DisputeLetter.findById(req.params.id);
    
    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found'
      });
    }
    
    // Check if letter belongs to user
    if (letter.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this letter'
      });
    }
    
    // Update letter
    letter = await DisputeLetter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: letter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete letter
// @route   DELETE /api/letters/:id
// @access  Private
exports.deleteLetter = async (req, res) => {
  try {
    const letter = await DisputeLetter.findById(req.params.id);
    
    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found'
      });
    }
    
    // Check if letter belongs to user
    if (letter.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this letter'
      });
    }
    
    await letter.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate letter content
// @route   POST /api/letters/:id/generate
// @access  Private
exports.generateLetter = async (req, res) => {
  try {
    const letter = await DisputeLetter.findById(req.params.id);
    
    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found'
      });
    }
    
    // Check if letter belongs to user
    if (letter.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to generate this letter'
      });
    }
    
    // Check if premium format is requested by non-premium user
    if (letter.letterFormat === 'legal' && req.user.accountType !== 'premium') {
      return res.status(403).json({
        success: false,
        message: 'Premium subscription required for legal format letters'
      });
    }
    
    // Find appropriate template
    const template = await DisputeTemplate.findOne({
      category: letter.disputeDetails.category,
      subCategory: letter.disputeDetails.subCategory,
      format: letter.letterFormat
    });
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'No template found for the selected dispute type and format'
      });
    }
    
    // Generate letter content
    const letterContent = generateLetterContent(letter, template);
    
    // Update letter with generated content
    letter.letterContent = letterContent;
    letter.status = 'generated';
    await letter.save();
    
    res.status(200).json({
      success: true,
      data: letter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to generate letter content
const generateLetterContent = (letter, template) => {
  const { personalInfo, creditorInfo, disputeDetails } = letter;
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
  
  // Replace placeholders in template content
  let templateContent = template.templateContent;
  templateContent = templateContent.replace('{{DISPUTE_CATEGORY}}', disputeDetails.category);
  templateContent = templateContent.replace('{{DISPUTE_SUBCATEGORY}}', disputeDetails.subCategory);
  templateContent = templateContent.replace('{{DISPUTE_REASON}}', disputeDetails.reason);
  
  if (disputeDetails.additionalDetails) {
    templateContent = templateContent.replace('{{ADDITIONAL_DETAILS}}', disputeDetails.additionalDetails);
  } else {
    templateContent = templateContent.replace('{{ADDITIONAL_DETAILS}}', '');
  }
  
  content += templateContent;
  content += `\n\nSincerely,\n\n\n${personalInfo.fullName}`;
  
  return content;
};
