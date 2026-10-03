require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const User = require('./models/User');
const Case = require('./models/Case');

// --- User Routes ---
// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from response
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- Case Routes ---
// Create a new case
app.post('/api/cases', async (req, res) => {
  try {
    let filedBy = req.body.filedBy;
    // If the frontend sends a mock user ID, we create/find a real MongoDB user to satisfy the schema
    if (!mongoose.Types.ObjectId.isValid(filedBy)) {
       let defaultUser = await User.findOne({ email: 'citizen@example.com' });
       if (!defaultUser) {
           defaultUser = await User.create({ name: 'Citizen User', email: 'citizen@example.com', password: 'password', role: 'citizen' });
       }
       req.body.filedBy = defaultUser._id;
    }

    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Get all cases (includes populated user info)
app.get('/api/cases', async (req, res) => {
  try {
    // Populate replaces the ObjectId with the actual user document fields
    const cases = await Case.find()
      .populate('filedBy', 'name email role')
      .populate('assignedLawyer', 'name email role');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Basic route to test the API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Serve frontend in production (or when built)
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
