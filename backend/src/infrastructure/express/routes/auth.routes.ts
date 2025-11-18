
import { Router } from 'express';
import { body } from 'express-validator';
import { registerController, loginController } from '../../../services/internal/auth.service';

const router = Router();

/**
 * Register (email/password)
 */
router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  registerController);

/**
 * Login
 */
router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  loginController);

export default router;
