import { WriteStream } from 'node:fs';

export function makeOutputLog(fileStream?: WriteStream) {
  return (line: string, json?: string) => {
    console.log(line);
    if (fileStream) fileStream.write(json ?? line + '\n');
  };
}
