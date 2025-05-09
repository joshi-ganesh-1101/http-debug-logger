export interface JsonLogEntry {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  durationMs: number;
  headers?: Record<string, string | string[]>;
  body?: any;

  [key: string]: any;
}
