const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mailService');
const { TokenService } = require('./tokenService');
const userDto = require('../../dtos/userDto');
const ApiError = require('../../exceptions/api-error');

module.exports.userService = {
  registration: async (email, password) => {
    // for first, we check userModel doesnt it already have this email in it to dont dublicate them
    const candidate = await userModel.findOne({ email });

    // is it possible to regist handler.
    if (candidate) {
      throw ApiError.BadRequest(`User with ${email} already exists`);
    }
    const passwordHash = await bcrypt.hash(password, 3); // password encryption (hashing). Ig hashing better than average encryption
    const activationLink = uuid.v4(); // 23rnu3-44wf4-42t24 lol
    const user = await userModel.create({ email, password: passwordHash, activationLink }); // creating a user
    // Sending email and uuid-activation endpoint to user
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/activate/${activationLink}`,
    );
    // next we're gotta to send user, but without pass. So we need dtos(data-transfer-only). user-dtos
    // so we need import it here
    const userDtoted = new userDto(user); // id, email, isActivated
    const tokens = TokenService.generateTokens({ ...userDtoted }); // and we using spread operator here

    await TokenService.saveToken(userDtoted.id, tokens.refreshToken); // it says do this (await tokens).refreshToken instead of tokens.refreshToken

    // Well we can say that registration finished.
    return { ...tokens, user: userDtoted }; // acces refresh token we put here, spreading tokens, and unformation about user
    // Next all this bullshit is going to Controllers, to be workable
  },

  login: async (email, password) => {
    // compare this with registration function to understand functionality :)

    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User with ${email} email doesn't exist`);
    }

    const IsPasswordEquals = await bcrypt.compare(password, user.password);
    console.log(IsPasswordEquals);
    if (!IsPasswordEquals) {
      throw ApiError.BadRequest('Wrong password');
    }
    const userDtoted = new userDto(user);
    const tokens = TokenService.generateTokens({ ...userDtoted });

    await TokenService.saveToken(userDtoted.id, tokens.refreshToken); // saving token for tokenmodel
    return { ...tokens, user: userDtoted };
  },

  logout: async (refreshToken) => {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  },

  activate: async (activationLink) => {
    const user = await userModel.findOne({ activationLink }); // Ищем пользователя по этой ссылке
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }
    user.isActivated = true; // Меняем значения активейтеда на тру
    await user.save(); // сохраняем юзера
  },

  refresh: async (refreshToken) => {
    if (!refreshToken) {
      throw ApiError.UnaгthorizedError();
    }
    //! error here ig:
    const userData = TokenService.validateRefreshToken(refreshToken); // sent to validation. Gives back token with id etc.
    const tokenFromDb = await TokenService.findToken(refreshToken); // gives back old token (need to check, validated our user or not)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnaгthorizedError();
    }

    const user = await userModel.findById(userData.id); // we took it, cuz if user change his data, we can dinamically upd it.

    //! DUBLICATED CODE:
    const userDtoted = new userDto(user);
    const tokens = TokenService.generateTokens({ ...userDtoted });

    await TokenService.saveToken(userDtoted.id, tokens.refreshToken);
    return { ...tokens, user: userDtoted };
  },
};
