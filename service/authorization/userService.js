const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports.userService = {
  registration: async (email, password) => {
    // for first, we check userModel doesnt it already have this email in it to dont dublicate them
    const candidate = await userModel.findOne({ email });
    // is it possible to regist handler.
    if (candidate) {
      throw new Error(`User with ${email} already exists`);
    }
    const passwordHash = bcrypt.hash(password, 3); // password encryption (hashing). Ig hashing better than average encryption
    const activationLink = uuid.v4(); // 23rnu3-44wf4-42t24 lol
    const user = await userModel.create({ email, passwordHash, activationLink }); // creating a user
  },
};
