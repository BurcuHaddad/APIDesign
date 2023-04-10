const winston = require("winston");

// function loggerFunc(filename, errorLevel) {
//     return  winston.createLogger({
//         transports: [
//           new winston.transports.File({
//             filename: `${filename}.log`,
//             level: errorLevel,
//             format: winston.format.combine(
//               winston.format.timestamp(),
//               winston.format.json()
//             ),
//           }),
//         ],
//       });
// }
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
