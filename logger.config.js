import winston from "winston";
import customLevels from "./custom.logger.js";


const devLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [new winston.transports.Console({ level: "debug" })],
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(winston.format.simple()),  // esto nos permite ver el mensaje mas legible "nivel: mensaje"
  transports: [
    new winston.transports.File({ filename: "./errors.log", level: "error" }),
    new winston.transports.Console({ 
      level: "info", 
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = process.env.ENVIRONMENT == "PRODUCTION" ? prodLogger : devLogger;
  
  req.logger.http(`${req.method} en ${req.url} -- ${new Date().toLocaleTimeString()}`);
  //req.logger.info(`${req.method} en ${req.url} -- ${new Date().toLocaleTimeString()}`);
  //req.logger.error(`${req.method} en ${req.url} -- ${new Date().toLocaleTimeString()}`);

  next()
};
