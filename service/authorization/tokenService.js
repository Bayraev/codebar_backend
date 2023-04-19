const jwt = require('jsonwebtoken');
const tokenModel = require('../../models/tokenModel'); // need to save up tokens for user ig

module.exports.TokenService = {
  generateTokens: async (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });
    return {
      refreshToken,
      accessToken,
    };
  },

  saveToken: async (userId, refreshToken) => {
    // WARNING https://www.youtube.com/watch?v=fN25fMQZ2v0&t=2247s
    const tokenData = await tokenModel.findOne({ user: userId });
    // если Токен по такому айди сущетсвует то..
    if (tokenData) {
      tokenData.refreshToken = refreshToken; // ..идет перезапись его Рефреш токена
      return tokenData.save(); // новые данные сохраняются к модели
    }
    // If it isnt exist, we run this code
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  },
};
