const logger = require("./logger")

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      logger.error(err.message);
      next(err);
    });
  };
};
