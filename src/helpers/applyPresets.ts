import { LoggerOptions } from '../types/loggerOptions';

export function applyPresets(options: LoggerOptions): LoggerOptions {
  const merged: LoggerOptions = {
    logHeaders: false,
    logBody: false,
    prefix: '',
    color: true,
    timestamp: true,
    skip: () => false,
    format: undefined,
    logFilePath: undefined,
    logFileAppend: true,
    ...options,
  };

  switch (options.preset) {
    case 'minimal':
      return {
        ...merged,
        logHeaders: false,
        logBody: false,
        color: true,
        timestamp: false,
      };

    case 'verbose':
      return {
        ...merged,
        logHeaders: true,
        logBody: true,
        color: true,
        timestamp: true,
      };

    case 'production':
      return {
        ...merged,
        format: 'json',
        color: false,
        timestamp: true,
      };

    case 'json':
      return {
        ...merged,
        format: 'json',
        logHeaders: true,
        logBody: false,
        color: false,
        prefix: '',
        timestamp: true,
      };

    default:
      return merged;
  }
}
