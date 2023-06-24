const mongoose = require('mongoose');

const snippetSchema = mongoose.Schema({
  ownerId: { type: String, required: true }, // Belongs to [id]
  uniqId: { type: String, required: true },
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  description: { type: String, required: true },
  hidden: { type: Boolean, default: false }, // Able to another people to see it
  tags: Array,
  image: Array,
});

module.exports = mongoose.model('Snippets', snippetSchema);
