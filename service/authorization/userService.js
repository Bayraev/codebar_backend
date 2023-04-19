const userModel = require('../../models/userModel');

module.exports.userService = {
  registration: async (email, password) => {
    // for first, we check userModel doesnt it already have this email in it to dont dublicate them
    const condidate = await userModel.findOne({ email });
  },
};
