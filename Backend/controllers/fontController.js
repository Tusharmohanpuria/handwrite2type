const db = require('../config/databaseConfig');

// Controller functions for handling font-related requests

// Get all fonts
const getAllFonts = (req, res) => {
  const sql = 'SELECT * FROM Fonts';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching fonts: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result);
  });
};

// Get a specific font by ID
const getFontById = (req, res) => {
  const fontId = req.params.fontId;
  const sql = 'SELECT * FROM Fonts WHERE font_id = ?';
  db.query(sql, [fontId], (err, result) => {
    if (err) {
      console.error('Error fetching font: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (result.length === 0) {
      res.status(404).send('Font not found');
      return;
    }
    const fontData = result[0];
    const font = {
      font_id: fontData.font_id,
      font_name: fontData.font_name,
      description: fontData.description,
      font_file: fontData.font_file,
      upload_date: fontData.upload_date
    };
    res.json(font);
  });
};

// Upload a font
const uploadFont = (req, res) => {
  // Extract font details from the request body
  const { font_name, description, font_file } = req.body;

  // Check if all required fields are provided
  if (!font_name || !font_file) {
    return res.status(400).json({ message: 'Font name and file are required' });
  }

  let fileData;
  try {
    // Convert base64 string back to binary data
    fileData = Buffer.from(font_file, 'base64');
  } catch (err) {
    console.error('Error decoding font file:', err);
    return res.status(400).json({ message: 'Invalid font file format' });
  }

  // Save the font to the database
  const sql = 'INSERT INTO Fonts (font_name, description, font_file) VALUES (?, ?, ?)';
  db.query(sql, [font_name, description, fileData], (err, result) => {
    if (err) {
      console.error('Error uploading font: ' + err.message);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).json({ message: 'Font uploaded successfully' });
  });
};

module.exports = {
  getAllFonts,
  getFontById,
  uploadFont,
};



