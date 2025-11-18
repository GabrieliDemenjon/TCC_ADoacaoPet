
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { initRoutes } from './infrastructure/express/express.routes';
import { errorHandler } from './shared/handler/error.handler';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
}));

// Routes
initRoutes(app);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
