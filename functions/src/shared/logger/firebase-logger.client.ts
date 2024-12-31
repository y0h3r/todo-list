import * as logger from 'firebase-functions/logger';

import { LoggerClient } from '@shared/logger/client';

export class FirebaseLogger implements LoggerClient {
  private readonly firebaseLogger: LoggerClient;

  constructor() {
    this.firebaseLogger = logger;
  }

  debug(message: string, params?: any): void {
    this.firebaseLogger.debug(message, params);
  }

  error(message: string, params?: any): void {
    this.firebaseLogger.error(message, params);
  }

  info(message: string, params?: any): void {
    this.firebaseLogger.info(message, params);
  }

  warn(message: string, params?: any): void {
    this.firebaseLogger.warn(message, params);
  }
}
