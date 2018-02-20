const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String
});

module.exports = mongoose.model('uploads', uploadSchema);
