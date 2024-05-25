const express = require('express');
const fontRoutes = require('./routes/fontRoutes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', fontRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

