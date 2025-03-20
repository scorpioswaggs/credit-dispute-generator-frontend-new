const express = require('express');
const router = express.Router();
const { 
  getLetters, 
  getLetter, 
  createLetter, 
  updateLetter, 
  deleteLetter, 
  generateLetter 
} = require('../controllers/letterController');
const { protect, isPremium } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Basic letter routes
router.route('/')
  .get(getLetters)
  .post(createLetter);

router.route('/:id')
  .get(getLetter)
  .put(updateLetter)
  .delete(deleteLetter);

// Letter generation route
router.post('/:id/generate', generateLetter);

module.exports = router;
