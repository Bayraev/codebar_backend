const jwt = require('jsonwebtoken');
const tokenModel = require('../../models/tokenModel'); // need to save up tokens for user ig

module.exports.TokenService = {
  generateTokens: (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30d' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });
    return {
      refreshToken,
      accessToken,
    };
  },

  validateAccessToken: (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN); // verifing token according hash encrypt data
      return userData; //? returnes obj ig
    } catch (error) {
      return null;
    }
  },

  validateRefreshToken: (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN); // verifing token according hash encrypt data
      return userData; // returned true false ig
    } catch (error) {
      return null;
    }
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

  removeToken: async (refreshToken) => {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  },
};
