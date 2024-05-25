const express = require('express');
const router = express.Router();
const fontController = require('../controllers/fontController');

// Define font routes
router.get('/fonts', fontController.getAllFonts);
router.get('/fonts/:fontId', fontController.getFontById);
router.post('/fonts/upload', fontController.uploadFont); 

module.exports = router;
