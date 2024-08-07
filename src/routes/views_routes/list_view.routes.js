


import { Router } from 'express';
import { gamesController } from '../../controllers/controller_views/list_view.controller.js';


const router = Router();

router.get('/list_games', gamesController.getListGames);

export default router;