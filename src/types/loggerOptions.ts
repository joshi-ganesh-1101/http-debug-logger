import { IncomingMessage, ServerResponse } from 'http';

export interface LoggerOptions {
  preset?: 'minimal' | 'verbose' | 'production';
  logHeaders?: boolean;
  logBody?: boolean;
  prefix?: string;
  color?: boolean;
  timestamp?: boolean;
  skip?: (req: IncomingMessage, res: ServerResponse) => boolean;
  format?: string | ((req: IncomingMessage, res: ServerResponse) => string);
}
