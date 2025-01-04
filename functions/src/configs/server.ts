import express, { Application } from 'express';
import cors from 'cors';

import { LoggerClient } from '@shared/logger/client';

export class Server {
  private static instance: Server;
  private app: Application;
  private port: number;
  private logger: LoggerClient;

  private constructor(logger: LoggerClient) {
    this.app = express();
    this.port = 9997;
    this.logger = logger;
    this.middlewares();
  }

  public static getInstance(logger: LoggerClient): Server {
    if (!Server.instance) {
      Server.instance = new Server(logger);
    }
    return Server.instance;
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: true }));
  }

  public start(): void {
    this.app.listen(this.port, () => {
      this.logger.info(`Server running on port ${this.port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
