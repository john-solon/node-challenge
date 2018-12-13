import winston from "winston";
import { Logger } from "winston";
import { isProd } from "./env";

const logger = new (Logger)({
  transports: [
    new (winston.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
    new (winston.transports.File)({ filename: "debug.log", level: "debug" })
  ]
});

if (!isProd) {
  logger.debug("Logging initialized at debug level");
}

export default logger;

