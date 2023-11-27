const mongoose = require('mongoose');

// Define the Calendar schema
const calendarSchema = new mongoose.Schema({
  days: [
    {
      day: { type: Number, required: true },
      breakfast: { type: String, enum: ['P', 'A'], default: 'P' },
      lunch: { type: String, enum: ['P', 'A'], default: 'P' },
      dinner: { type: String, enum: ['P', 'A'], default: 'P' },
    },
  ],
});

// Set default calendar for 31 days
const defaultCalendar = Array.from({ length: 31 }, (_, index) => ({
  day: index + 1,
  breakfast: 'P',
  lunch: 'P',
  dinner: 'P',
}));

// Define the Student schema with Calendar included
const studentSchema = new mongoose.Schema({
  cms: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  mealsnottaken: { type: Number, default: 0 },
  imageUrl: { type: String },
  email:{type:String},
  hostel: { type: String, required: true },
  batch:{type: String,required: true },
  room:{type: String,required:true},
  phone: { type: String },
  calendar: { type: calendarSchema, default: { days: defaultCalendar } }, // Include the Calendar schema here
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
