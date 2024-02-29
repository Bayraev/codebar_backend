const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    from: { type: String, required: true }, // shows from which service we got request
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Contacts', messageSchema);
