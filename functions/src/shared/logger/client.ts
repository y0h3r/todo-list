export interface LoggerClient {
  error: (message: string, params?: any) => void;
  info: (message: string, params?: any) => void;
  warn: (message: string, params?: any) => void;
  debug: (message: string, params?: any) => void;
}
