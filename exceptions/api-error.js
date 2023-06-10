// exporting class ApiError, which extends defaulf Error of js
//? How it works?
module.exports = class ApiError extends Error {
  status; // help !
  errors; // help !

  constructor(status, message, errors = []) {
    super(message); //help !
    this.status = status;
    this.errors = errors;
  }

  static UnaгthorizedError() {
    return new ApiError(401, 'User not authorized');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
