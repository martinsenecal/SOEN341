const express = require('express');
const connectDB = require('../config/db');
const config = require('../config/config');
const cors = require('cors');
require('express-async-errors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

//Init Middleware for routes
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/feed', require('./routes/api/feed'));

app.listen(config.PORT, () =>
  console.log(`Server started on port ${config.PORT}`)
);
