import { Request, Response } from 'express';
import express = require('express');
import path = require('path');

const rootDir = path.resolve('dist/');
const indexFile = path.resolve('dist/index.html');

let app = express();

app.use(express.static(rootDir));

app.get('/*', function (req: Request, res: Response) {
  res.sendFile(indexFile);
});

app.listen(3000, function () {
  console.log('Serving http://localhost:3000!');
});
