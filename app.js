const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const cookieParser = require('cookie-parser');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

// APP
const app = express();

// CORS
app.use(cors());

// COMPRESSION
app.use(compression());

// DEV LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// BODY PARSER. Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitizataion against NoSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// ROUTES
app.use('/api/products', productRouter);
app.use('/api/auth', userRouter);

module.exports = app;
