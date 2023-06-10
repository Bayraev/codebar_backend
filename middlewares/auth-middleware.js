const ApiError = require('../exceptions/api-error');
const { TokenService } = require('../service/authorization/tokenService');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization; // getting access token from header (`bearer ${accessToken}`)
    if (!authorizationHeader) {
      return next(ApiError.UnaгthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1]; // taking only token from that key - authorization: `bearer ${accessToken}`
    if (!accessToken) {
      return next(ApiError.UnaгthorizedError());
    }

    // проблема отсюда начинается
    const userData = TokenService.validateAccessToken(accessToken); // null or..
    if (!userData) {
      return next(ApiError.UnaгthorizedError());
    }

    req.user = userData; //? I have no idea why
    next(); // let next middleware to work and using this in routes
  } catch (error) {
    return next(ApiError.UnaгthorizedError());
  }
};
