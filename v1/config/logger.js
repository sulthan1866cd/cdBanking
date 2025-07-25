import winston from "winston";
const { combine, timestamp, json, prettyPrint } = winston.format;

const logger = winston.createLogger({
  format: combine(timestamp(), json(), prettyPrint()),

  transports: [
    new winston.transports.File({
      filename: "v1/logs/error.txt",
      level: "error",
    }),
    new winston.transports.File({
      filename: "v1/logs/info.txt",
      level: "info",
    }),
  ],
});

export default logger;
