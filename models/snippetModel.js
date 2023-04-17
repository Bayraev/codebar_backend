const mongoose = require('mongoose');

const snippetSchema = mongoose.Schema({
  snippet: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: Array,
  image: Array,
});

module.exports = mongoose.model('Question', questionSchema);
