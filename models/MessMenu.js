const mongoose = require('mongoose');

// Define the Meal schema
const mealSchema = new mongoose.Schema({
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  dinner: { type: String, required: true },
});

// Define the MessMenu schema
const messMenuSchema = new mongoose.Schema({
  dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true, unique: true },
  menu: { type: mealSchema, required: true },
});

// Set default mess menu for a week
const defaultMessMenu = [
  { dayOfWeek: 'Monday', menu: { breakfast: '...', lunch: '...', dinner: '...' } },
  // Repeat for other days of the week
];

const MessMenu = mongoose.model('MessMenu', messMenuSchema);

module.exports = MessMenu;
