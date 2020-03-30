const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    const staticPath = path.resolve(__dirname, '..', '..', 'frontend', 'build');
    this.app.use(express.static(staticPath));
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
