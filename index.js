const express = require('express');
const connectToMongoDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
connectToMongoDB();

// Middleware
app.use(express.json());

// Include the student routes
app.use('/mms/student', studentRoutes);
app.use('/mms/admin', adminRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('mms routes working');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});