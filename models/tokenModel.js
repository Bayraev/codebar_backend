const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  // seems like its just id of user. It refers to 'User' model
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', UserSchema);
