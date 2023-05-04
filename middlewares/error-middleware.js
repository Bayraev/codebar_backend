const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
  // we logging it in this middleware cuz we dont want to do it
  // in every function of controller
  console.log(err);
  // if err is INSTANCE of that class
  if (err instanceof ApiError) {
    // we got err.status from ApiError constructor
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  // well if error is not detected but its an error, we return server error (500)
  return res.status(500).json('Непредвиденная ошибка');
};
