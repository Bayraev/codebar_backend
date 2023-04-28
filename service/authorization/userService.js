const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mailService');
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
    // Sending email and uuid-activation endpoint to user
    console.log('debugg 1');
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/activate/${activationLink}`,
    );
    console.log('debugg 2');
    // next we're gotta to send user, but without pass. So we need dtos(data-transfer-only). user-dtos
    // so we need import it here
    const userDtoted = new userDto(user); // id, email, isActivated
    const tokens = TokenService.generateTokens({ ...userDtoted }); // and we using spread operator here

    await TokenService.saveToken(userDtoted.id, tokens.refreshToken); // it says do this (await tokens).refreshToken instead of tokens.refreshToken

    // Well we can say that registration finished.
    return { ...tokens, user: userDtoted }; // acces refresh token we put here, spreading tokens, and unformation about user
    // Next all this bullshit is going to Controllers, to be workable
  },

  activate: async (activationLink) => {
    const user = await userModel.findOne({ activationLink }); // Ищем пользователя по этой ссылке
    if (!user) {
      throw new Error('Некорректная ссылка активации');
    }
    user.isActivated = true; // Меняем значения активейтеда на тру
    await user.save(); // сохраняем юзера
  },
};
