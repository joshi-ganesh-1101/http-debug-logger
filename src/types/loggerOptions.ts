import { IncomingMessage, ServerResponse } from 'http';

export interface LoggerOptions {
  preset?: 'minimal' | 'verbose' | 'production' | 'json';
  logHeaders?: boolean;
  logBody?: boolean;
  prefix?: string;
  color?: boolean;
  timestamp?: boolean;
  skip?: (req: IncomingMessage, res: ServerResponse) => boolean;
  format?: 'json' | ((req: IncomingMessage, res: ServerResponse) => string);
  logFilePath?: string;
  logFileAppend?: boolean;
}
