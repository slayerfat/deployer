import { Request, Response } from 'express';
import express = require('express');

let app = express();

app.get('/', function (req: Request, res: Response) {
  res.send('hello world');
});

app.listen(3000, function () {
  console.log('Serving http://localhost:3000!');
});
