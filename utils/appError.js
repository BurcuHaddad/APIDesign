const logger = require("./logger");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);

    logger.error({
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      stack: this.stack,
      isOperational: this.isOperational,
    });
  }
}

module.exports = AppError;
