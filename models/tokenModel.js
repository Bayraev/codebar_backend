const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  // seems like its just id of user. It refers to 'User' model
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

module.exports = mongoose.model('Token', TokenSchema);
