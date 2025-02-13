import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateRegistration, validateLogin } from '../middleware/validation.middleware';

const router = Router();
const userController = new UserController();

router.post('/register', validateRegistration, userController.register);
router.post('/login', validateLogin, userController.login);
router.get('/search', authMiddleware, userController.searchUsers);

export default router;
