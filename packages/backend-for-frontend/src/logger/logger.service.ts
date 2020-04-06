import * as winston from 'winston'
import { LoggingWinston } from '@google-cloud/logging-winston'
import { LoggerService } from '@nestjs/common'
import { isDevelopment } from '../config/config.module'
const dateFormat = require('dateformat')

const { combine, timestamp, printf } = winston.format
const logName = 'backend'

function getPath() {
  var fecha = dateFormat(new Date(), 'ddmmyyyy')
  return `/var/log/${logName}-${fecha}.log`
}

function getLogFormat() {
  return combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    printf(({ level, message, labels, timestamp }) => {
      return `${timestamp} - ${JSON.stringify(labels)} - [${level}] : ${message}`
    })
  )
}

let transports: any[] = [new winston.transports.Console()]

if (isDevelopment) {
  transports.push(new winston.transports.File({ filename: getPath(), level: 'debug' }))
} else {
  transports.push(new LoggingWinston({ logName, level: 'debug' }))
}

let options = {
  level: 'debug',
  transports: transports,
  format: getLogFormat(),
}

const logger = winston.createLogger(options)

type Labels = { [key: string]: string | boolean | number }

export class Logger implements LoggerService {
  constructor(private readonly labels: Labels) {}

  log(message: string) {
    this.info(message)
  }

  info(message: string) {
    logger.info(message, { labels: this.labels })
  }

  warn(message: string) {
    logger.warn(message, { labels: this.labels })
  }

  error(message: string, trace?: string) {
    const finalMessage = `${message}${trace ? `\nStacktrace:\n${trace}` : ''}`
    logger.error(finalMessage, { labels: this.labels })
  }

  debug(message: string) {
    logger.debug(message, { labels: this.labels })
  }
}
