const express = require('express');
const connectDB = require('../config/db');
const config = require('../config/config');
const bodyParser = require('body-parser');
const cors = require('cors');
require('express-async-errors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: config.HOME_PAGE_DOMAIN, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
// app.use('/api/users', require('./routes/api/users'));

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
);
