import { Router } from 'express';

import userController  from '../controllers/user.controller.js';

const router = Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;
