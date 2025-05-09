import { WriteStream } from 'node:fs';

export function makeOutputLog(fileStream?: WriteStream) {
  return (line: string) => {
    console.log(line);
    if (fileStream) fileStream.write(line + '\n');
  };
}
