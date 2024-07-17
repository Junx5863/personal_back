
import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getById);
router.post('/add_new_game', userController.addVideoGame);
router.put('/update_game/:id', userController.updateVideoGame);
router.delete('/delete_game/:id', userController.deleteGame);

export default router;
