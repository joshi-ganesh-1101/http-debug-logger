import { IncomingMessage, ServerResponse } from 'http';
import kleur from 'kleur';
import { JsonLogEntry } from '../types/jsonLogEntry';
import { LoggerOptions } from '../types/loggerOptions';

export function attachLogger(options: LoggerOptions, outputLog: (line: string, json?: string) => void) {
  return function(req: IncomingMessage, res: ServerResponse) {
    const start = process.hrtime();

    res.on('finish', () => {
      if (options.skip?.(req, res)) return;

      const durationMs = getDurationMs(start);
      const entry = JSON.stringify(buildJsonEntry(req, res, durationMs, options));

      if (options.format === 'json') {
        outputLog(entry);
        return;
      }

      const message = buildMessage(req, res, durationMs, options);
      outputLog(message, entry);

      if (options.logHeaders) {
        console.log(kleur.gray('Headers:'), req.headers);
      }
      if (options.logBody) {
        console.log(kleur.white('Body:'), (req as any).body);
      }
    });
  };
}

function getDurationMs(start: [number, number]): number {
  const diff = process.hrtime(start);
  return parseFloat((diff[0] * 1e3 + diff[1] / 1e6).toFixed(2));
}

function buildJsonEntry(
  req: IncomingMessage,
  res: ServerResponse,
  durationMs: number,
  options: LoggerOptions,
): JsonLogEntry {
  const entry: JsonLogEntry = {
    timestamp: options.timestamp ? new Date().toISOString() : undefined!,
    method: req.method!,
    url: req.url!,
    statusCode: res.statusCode,
    durationMs,
  };
  if (options.logHeaders) entry.headers = req.headers as any;
  if (options.logBody) entry.body = (req as any).body || 'Body does not exists';
  return entry;
}

function buildMessage(
  req: IncomingMessage,
  res: ServerResponse,
  durationMs: number,
  options: LoggerOptions,
): string {
  const method = req.method || '';
  const url = req.url || '';
  const statusCode = res.statusCode;

  // custom format string or function?
  let msg: string;
  if (options.format) {
    msg = typeof options.format === 'function' ? options.format(req, res) : options.format;
  } else {
    msg = `${method} ${url} ${statusCode} - ${durationMs}ms`;
  }

  // timestamp prefix
  if (options.timestamp) {
    msg = `[${new Date().toISOString()}] ${msg}`;
  }
  // user prefix
  if (options.prefix) {
    msg = `${options.prefix} ${msg}`;
  }
  // colorize
  if (options.color) {
    const parts = [
      kleur.cyan(method),
      kleur.yellow(url),
      kleur.green(String(statusCode)),
      kleur.magenta(`${durationMs}ms`),
    ];
    msg = `${options.prefix}${options.timestamp ? `[${new Date().toISOString()}] ` : ''}${parts.join(' ')}`;
  }

  return msg;
}
