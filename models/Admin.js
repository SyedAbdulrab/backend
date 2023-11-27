const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hostel: { type: String, required: true },
  phone: { type: String },
  otp: { type: String }, // You may want to implement OTP verification
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;