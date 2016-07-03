import path = require('path');

const FileStreamRotator = require('file-stream-rotator');
const logDirectory = path.resolve('logs/');

// create a rotating write stream
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: `${logDirectory}/access-%DATE%.log`,
  frequency: 'daily',
  verbose: false
});

export { accessLogStream }
