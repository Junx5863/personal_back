const { Router } = require('express');
const userController = require('#C/user.controller');

const router = Router();

router.post('/login', userController.loginUsers); 
router.post('/register', userController.registerUser);

module.exports = router;
