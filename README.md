# http-debug-logger

[![GitHub](https://img.shields.io/badge/source-GitHub-black?logo=github)](https://github.com/joshi-ganesh-1101/http-debug-logger)

A beginner-friendly HTTP request logger for Node.js.  
Supports both native `http` servers and Express middleware.  
Logs method, URL, status code, and response time.  
Ideal for learning and debugging backend behavior in development.

---

## Features

- Works with native Node.js `http` servers and Express
- Logs HTTP method, path, status code, and duration
- Optional header and body logging
- Type-safe with full TypeScript support
- Zero external dependencies
- Configurable output (colors, format, etc.)
- JSON structured logging
- **[New] Write logs to a file continuously with user-specified path**

---

## Installation

```bash
# Using npm
npm install http-debug-logger

# Using yarn
yarn add http-debug-logger
```

---

## Quick Start

### Node.js

```ts
import http from 'http';
import {createServerLogger} from 'http-debug-logger';

const logger = createServerLogger();

const server = http.createServer((req, res) => {
    logger(req, res); // log the request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from Node!');
});

server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});
```

### Express

```ts
import express from 'express';
import {expressLogger} from 'http-debug-logger';

const app = express();

app.use(expressLogger());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(3000, () => {
    console.log('Express server running on http://localhost:3000');
});
```

---

## Preset Options

To simplify setup, you can use one of the predefined logging presets by passing the `preset` option:

| Preset       | Description                                                               |
|--------------|---------------------------------------------------------------------------|
| `minimal`    | Logs only the HTTP method, URL, and status code.                          |
| `verbose`    | Logs method, URL, status code, response time, headers, and body.          |
| `production` | Outputs logs in JSON format (structured logging) with timestamp included. |
| `json`       | JSON-structured output with all fields                                    |

### Example Usage

#### Minimal Logging

```ts
import {createServerLogger} from 'http-debug-logger';

const logger = createServerLogger({preset: 'minimal'});
```

#### Verbose Logging (for development)

```ts
const logger = createServerLogger({preset: 'verbose'});
```

#### Production Logging (structured JSON format)

```ts
const logger = createServerLogger({preset: 'production'});
```

> **Note**: You can still override individual options (`logHeaders`, `logBody`, `timestamp`, etc.) even when using a
> preset.
---

## Configuration Options

| Option          | Type                               | Default       | Description                                                                                                                                   |
|-----------------|------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `prefix`        | `string`                           | `""`          | Optional prefix for each log message.                                                                                                         |
| `color`         | `boolean`                          | `true`        | Enable/disable colored output (using `kleur`).                                                                                                |
| `timestamp`     | `boolean`                          | `true`        | Add a timestamp in ISO format before each log message.                                                                                        |
| `skip`          | `(req, res) => boolean`            | `() => false` | Function that allows skipping certain logs. It returns `true` to skip logging.                                                                |
| `logHeaders`    | `boolean`                          | `false`       | Log request headers (defaults to `false`).                                                                                                    |
| `logBody`       | `boolean`                          | `false`       | Log request body (defaults to `false`).                                                                                                       |
| `format`        | `string` or `(req, res) => string` | `"default"`   | Custom log message format. If a string is provided, it will be used as the format; if a function is provided, it will format the log message. |
| `logFilePath`   | `string`                           | `""`          | [New] File path to write logs to.                                                                                                             |
| `logFileAppend` | `string` or `(req, res) => string` | `"default"`   | [New] Append to log file (true) or overwrite (false)                                                                                          |

---

### **How Configuration Works**:

- `prefix`: You can specify a string prefix for all your log messages.
- `color`: If `true`, it uses `kleur` to colorize the logs based on the HTTP status code.
- `timestamp`: If `true`, each log entry will include a timestamp in ISO format.
- `skip`: A function to conditionally skip logging for specific requests based on your own logic (e.g., for certain
  paths, HTTP methods, etc.).
- `logHeaders`: If enabled, logs the HTTP request headers.
- `logBody`: If enabled, logs the HTTP request body (be cautious about logging sensitive data).
- `format`: You can provide a custom format string or function to control how the log message is formatted.
- `logFilePath`: You can provide the file path to write logs to.
- `logFileAppend`: Append to log file (true) or overwrite (false).

---

## API

### `createServerLogger(options?)`

Creates a logger for native Node.js `http` servers.

### `expressLogger(options?)`

Returns an Express middleware function that logs requests.

---

## License

MIT

<!-- Author and Contributing sections can be added here -->
