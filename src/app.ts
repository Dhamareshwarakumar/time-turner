import express from 'express';
import globalErrorHandler from './middlewares/errorHandler.middleware';
import ApiException from './utils/exceptions/ApiException';
import * as statusCodes from './utils/constants/httpCodes';
import routerV1 from './routes/v1';
import connectDB from './config/db';

// App Config
const app = express();
connectDB();

// Middlewares
app.use(express.json());

// Routes - V1
app.use('/api/v1', routerV1);

// Serve frontend/static files
app.use(express.static('public/client'));
app.get('*', (_req, res) => res.sendFile('public/client/index.html', { root: __dirname }));

// Error Handler
app.all('*', (_req, _res, next) => next(new ApiException(statusCodes.NOT_FOUND, "Oops! Looks like you're lost.")));
app.use(globalErrorHandler);

export default app;
