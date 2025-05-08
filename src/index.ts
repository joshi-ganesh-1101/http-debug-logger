import { IncomingMessage, ServerResponse } from 'http';
import kleur from 'kleur';
import { LoggerOptions } from './types/loggerOptions';

export function createServerLogger(options: LoggerOptions = {}) {
  const {
    logHeaders = false,
    logBody = false,
    prefix = '',
    color = true,
    timestamp = true,
    skip = () => false,
    format,
  } = applyPresets(options);

  return function(req: IncomingMessage, res: ServerResponse) {
    const start = process.hrtime();

    res.on('finish', () => {
      if (skip(req, res)) return;

      const diff = process.hrtime(start);
      const durationMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
      const method = req.method || '';
      const url = req.url || '';
      const statusCode = res.statusCode;

      let message = format
        ? typeof format === 'function'
          ? format(req, res)
          : format
        : `${method} ${url} ${statusCode} - ${durationMs}ms`;

      if (timestamp) {
        message = `[${new Date().toISOString()}] ${message}`;
      }

      if (prefix) {
        message = `${prefix} ${message}`;
      }

      if (color) {
        const parts = [
          kleur.cyan(method),
          kleur.yellow(url),
          kleur.green(String(statusCode)),
          kleur.magenta(`${durationMs}ms`),
        ];
        message = `${prefix}${timestamp ? `[${new Date().toISOString()}] ` : ''}${parts.join(' ')}`;
      }

      console.log(message);

      if (logHeaders) {
        console.log(kleur.gray('Headers:'), req.headers);
      }

      if (logBody) {
        console.log(kleur.white('Body:'), (req as any).body);
      }
    });
  };
}

function applyPresets(options: LoggerOptions) {
  const { preset } = options;

  if (preset === 'minimal') {
    return { ...options, logHeaders: false, logBody: false, color: true, timestamp: false };
  }
  if (preset === 'verbose') {
    return { ...options, logHeaders: true, logBody: true, color: true, timestamp: true };
  }
  if (preset === 'production') {
    return { ...options, json: true, color: false, timestamp: true };
  }
  return options;
}
