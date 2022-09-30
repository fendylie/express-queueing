import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({}),
    new DailyRotateFile({
      handleExceptions: true,
      handleRejections: true,
      filename: "app-%DATE%.log",
      dirname: "logs",
      zippedArchive: true,
      maxSize: "1m",
      maxFiles: "30d",
    }),
  ],
});

export default logger;
