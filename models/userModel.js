const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false }, // Activated user or not, default - false, ofc
  activationLink: { type: String }, // contains Link for activation
});

module.exports = mongoose.model('User', UserSchema);
