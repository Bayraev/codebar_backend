const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { mailService } = require('./mailService');
const { TokenService } = require('./tokenService');
const userDto = require('../../dtos/userDto');

module.exports.userService = {
  registration: async (email, password) => {
    // for first, we check userModel doesnt it already have this email in it to dont dublicate them
    const candidate = await userModel.findOne({ email });

    // is it possible to regist handler.
    if (candidate) {
      throw new Error(`User with ${email} already exists`);
    }
    const passwordHash = await bcrypt.hash(password, 3); // password encryption (hashing). Ig hashing better than average encryption
    const activationLink = uuid.v4(); // 23rnu3-44wf4-42t24 lol
    const user = await userModel.create({ email, password: passwordHash, activationLink }); // creating a user
    await mailService.sendActivationMail(email, activationLink); // so after creating mail service, we triggers it to send mail
    // next we're gotta to send user, but without pass. So we need dtos(data-transfer-only). user-dtos
    // so we need import it here
    const userDtoted = new userDto(user); // id, email, isActivated
    console.log('userService dbg, userDtoted', userDtoted);
    const tokens = TokenService.generateTokens({ ...userDtoted }); // and we using spread operator here

    console.log('tokens', tokens);

    await TokenService.saveToken(userDtoted.id, tokens.refreshToken); // it says do this (await tokens).refreshToken instead of tokens.refreshToken

    // Well we can say that registration finished.
    return { ...tokens, user: userDtoted }; // acces refresh token we put here, spreading tokens, and unformation about user
    // Next all this bullshit is going to Controllers, to be workable
  },
};
