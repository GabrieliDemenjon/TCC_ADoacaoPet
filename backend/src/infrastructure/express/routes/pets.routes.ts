
import { Router } from 'express';
import { jwtAuth } from '../../../shared/middlewares/auth.middleware';
import { createPetController, listPetsController } from '../../../services/internal/pets.service';

const router = Router();

router.get('/', listPetsController);
router.post('/', jwtAuth, createPetController);

export default router;
