import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Youch from 'youch';
import 'express-async-errors';
import './database';
import routes from './routes';
import path from 'path';

import { throwError } from './app/utils/error';

class App {
  constructor() {
    this.server = express();

    // Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors({ origin: '*' }));
    this.server.use(express.json());
    this.server.use(
      '/modelos',
      express.static(path.resolve(__dirname, '..', 'public', 'modelos'))
    );
  }

  routes() {
    this.server.use(routes);
    // this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json(throwError('Internal server error'));
    });
  }
}

export default new App().server;
