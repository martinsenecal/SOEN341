const express = require('express');
require('express-async-errors');

//  Import routers
const rootRouter = express.Router();
const apiRouter = express.Router();

// Example: const sessionRouter = require("./session");

// Example: apiRouter.use("/session", sessionRouter);

rootRouter.use('/api', apiRouter);

module.exports = rootRouter;
