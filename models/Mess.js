const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
  messmenu: { type: Object }, // You may want to define a specific schema for the messmenu object
});

const Mess = mongoose.model('Mess', messSchema);

module.exports = Mess;