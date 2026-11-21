import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { validate } from '../middleware/validate.middleware';
import { registerZSchema } from '../models/users';
import { loginZSchema } from '../models/users';
import { authenticateJWT } from '../middleware/auth.middleware';
import { carParamsSchema } from '../models/cars';
import { CarController } from '../controllers/cars';
 
const router = Router();
const authController = new AuthController();
const carController = new CarController();


router.post('/register', validate(registerZSchema), authController.register);
router.post('/login', validate(loginZSchema), authController.login);
router.get('/me', authenticateJWT, authController.me);
router.delete('/:id', authenticateJWT, validate(carParamsSchema), carController.deleteCar);

export default router;
