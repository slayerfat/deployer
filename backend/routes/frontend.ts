import { Request, Response } from 'express';
import path = require('path');
import express = require('express');

export default function frontEndRoutes(app) {
  app.use(express.static(path.resolve('dist/')));
  app.get('/*', function (req: Request, res: Response) {
    console.log(`The frontend has been enabled.`);

    res.sendFile(path.resolve('dist/index.html'));
  });
};
