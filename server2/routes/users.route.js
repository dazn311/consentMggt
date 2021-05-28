const Router = require('express');
const UsersController = require('../controllers/users.controller');

const router = new Router()

// router.post('/user', UsersController.creatUser);
// router.get('/users', UsersController.getAllUsers);
router.post('/users', UsersController.getAllUsers);
router.get('/user/:id', UsersController.getUser);
// router.put('/user', UsersController.updateUser);
// router.delete('/user/:id', UsersController.deleteUser);

module.exports = router;