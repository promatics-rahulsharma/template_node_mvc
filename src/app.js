const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const { errorHandler, notFound } = require('./middleware/error.middleware');
const { sendSuccess } = require('./utils/response');
require('dotenv').config();


const app = express();

// Security
app.use(helmet());

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Middleware
app.use(cors());

// app.use(express.json());
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/stripe/webhook')) {
    next(); // skip body parsing for Stripe
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

app.use(express.static('public'));

// Health check
app.get('/', (req, res) => {
  sendSuccess({
    res,
    message: 'WELCOME to Free Style APIs',
    data: {
      version: '1.0.0',
      status: 'running',
    },
  });
});

app.get('/health', (req, res) => {
  sendSuccess({
    res,
    message: 'API is running',
  });
});

app.use(require("./routes/user"));
app.use(require("./routes/admin"));
// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
