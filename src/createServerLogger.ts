import { LoggerOptions } from './types/loggerOptions';
import { initFileStream } from './helpers/initFileStream';
import { makeOutputLog } from './helpers/makeOutputLog';
import { attachLogger } from './helpers/attachLogger';
import { applyPresets } from './helpers/applyPresets';

export function createServerLogger(options: LoggerOptions = {}) {
  const opts = applyPresets(options);

  const fileStream = initFileStream(opts);

  const outputLog = makeOutputLog(fileStream);

  return attachLogger(opts, outputLog);
}
