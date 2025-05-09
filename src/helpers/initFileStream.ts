import fs from 'node:fs';
import path from 'node:path';
import { LoggerOptions } from '../types/loggerOptions';

export function initFileStream(options: LoggerOptions): fs.WriteStream | undefined {
  if (!options.logFilePath) return;

  const dir = path.dirname(options.logFilePath);
  fs.mkdirSync(dir, { recursive: true });

  return fs.createWriteStream(options.logFilePath, {
    flags: options.logFileAppend === false ? 'w' : 'a',
  });
}
