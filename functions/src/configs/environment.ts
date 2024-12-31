import * as functions from 'firebase-functions';
import dotenv from 'dotenv';

import { envSchema, ConfigSchema } from '@configs/validators/environment';

dotenv.config();

class EnvironmentValidator {
  private static instance: EnvironmentValidator;
  private config: ConfigSchema;

  private constructor() {
    try {
      const combinedEnv = {
        ...process.env,
        ...this.getFirebaseConfig(),
      };

      console.log({ combinedEnv });
      this.config = envSchema.validateSync(combinedEnv, {
        abortEarly: false,
      });
    } catch (error: any) {
      console.error('Environment validation failed:');
      if (error.errors) {
        error.errors.forEach((err: string) => console.error(` - ${err}`));
      }
      process.exit(1);
    }
  }

  public static getInstance(): EnvironmentValidator {
    if (!EnvironmentValidator.instance) {
      EnvironmentValidator.instance = new EnvironmentValidator();
    }
    return EnvironmentValidator.instance;
  }

  private getFirebaseConfig(): Record<string, string> {
    const firebaseConfig = functions.config();
    const flatConfig: Record<string, string> = {};

    for (const [_, values] of Object.entries(firebaseConfig)) {
      for (const [key, value] of Object.entries(values)) {
        flatConfig[`${key.toUpperCase()}`] = String(value);
      }
    }

    return flatConfig;
  }

  public getConfig(): ConfigSchema {
    return this.config;
  }
}

const environmentValidator = EnvironmentValidator.getInstance();
export { environmentValidator };
