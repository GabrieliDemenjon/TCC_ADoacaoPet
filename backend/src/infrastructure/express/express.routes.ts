
import { Application } from 'express';
import authRouter from './routes/auth.routes';
import petsRouter from './routes/pets.routes';
import healthRouter from '../../app/health-check/health.routes';

export function initRoutes(app: Application) {
  app.use('/health', healthRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/pets', petsRouter);
}
