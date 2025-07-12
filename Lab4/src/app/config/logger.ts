import 'dotenv/config';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const logDir = path.resolve('src/app/logs');

export const Logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      dirname: logDir,
      filename: '%DATE%.log',
      datePattern: 'DDMMYYYY',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '30d',
      level: process.env.LOG_LEVEL || 'info'
    })
  ]
});
