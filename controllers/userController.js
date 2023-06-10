const { userService } = require('../service/authorization/userService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

// we need service to not make controllers to fat. We separete code.
module.exports.usersController = {
  registration: async (req, res, next) => {
    try {
      const errors = validationResult(req); // it will validate the necessary from req
      // if its not empty, we put it in error handler
      if (!errors.isEmpty()) {
        // Here we see that we resends errors array to ApiError
        return next(ApiError.BadRequest('Validation Error', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password); // returns { ...tokens, user: userDtoted } from services
      // saving refreshToken in cookies (dont forget activate cookieParser middleware in index.js)
      // maxAge we made 30 days by calculating

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // doesnt let change or get these cookie from JS
        // secure: true // if we use https
      });

      return res.json(userData); // return this data to user
    } catch (error) {
      next(error); // if we get ApiError here, it will be proccessed accordingly
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // doesnt let change or get these cookie from JS
        // secure: true // if we use https
      });
      return res.json(userData); // return this data to user
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies; // getting refresh token from cookies
      const token = await userService.logout(refreshToken); // calling service
      res.clearCookie('refreshToken'); // deleting refreshToken from cookies
      res.json(token); //* Dont forget change it to status 200
    } catch (error) {
      next(error);
    }
  },

  activate: async (req, res, next) => {
    try {
      const activationLink = req.params.link; // getting endpoint from req.params
      await userService.activate(activationLink); // calling that service
      return res.redirect(process.env.CLIENT_URL); // redirecting user to main page
    } catch (error) {}
    next(error);
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);
      // again saving up token as cookie
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true, // doesnt let change or get these cookie from JS
        // secure: true // if we use https
      });
      return res.json(userData); // return this data to user
    } catch (error) {
      next(error);
    }
  },
};
