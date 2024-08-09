const { Router } = require('express');
const userController = require('#C/user.controller');
const { authenticate, autorisations } = require('#MW/auth.middleware');

const router = Router();

router.post('/login', userController.loginUsers); 
router.post('/register', userController.registerUser);
router.get('/current',authenticate, userController.currentData);

router.get('/logout', userController.logout);
router.get('/all', authenticate, userController.allData);
router.post('/all',authenticate, autorisations, userController.allData);


module.exports = router;
