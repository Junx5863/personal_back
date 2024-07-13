const { Router } = require('express');
const userController = require('#C/user.controller');

const router = Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
