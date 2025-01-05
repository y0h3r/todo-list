import { LoggerClient } from '@shared/logger/client';
import {
  ConsoleOutput,
  FileOutput,
  LOG_LEVEL,
  SimpliestLogger,
} from 'yoher-simplest-logger';

export class YoherLogger implements LoggerClient {
  private readonly yoherLogger: LoggerClient;

  constructor() {
    this.yoherLogger = new SimpliestLogger({
      level: LOG_LEVEL.DEBUG,
      outputs: [new ConsoleOutput(), new FileOutput('./logs/app.log')],
    });
  }

  debug(message: string, params?: any): void {
    this.yoherLogger.debug(message, params);
  }

  error(message: string, params?: any): void {
    this.yoherLogger.error(message, params);
  }

  info(message: string, params?: any): void {
    this.yoherLogger.info(message, params);
  }

  warn(message: string, params?: any): void {
    this.yoherLogger.warn(message, params);
  }
}
