const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  content: String,
  dateSent: {type: Date, default:Date.now()}
});

module.exports = mongoose.model('articles', articleSchema);
