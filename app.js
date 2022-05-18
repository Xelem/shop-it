const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');

// APP
const app = express();

// CONNECT FRONTEND
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// CORS
app.use(cors());

// COMPRESSION
app.use(compression());

// DEV LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// HELMET Protection
app.use(helmet());

// BODY PARSER. Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitizataion against NoSQL query injections
app.use(mongoSanitize());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// ROUTES
app.use('/', authRouter);
app.use('/api/auth', authRouter);
app.use('/api/seller', productRouter);
app.use('/api/buyer', productRouter);

module.exports = app;
