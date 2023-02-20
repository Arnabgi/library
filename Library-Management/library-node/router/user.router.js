const express = require('express');
const route = express.Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

route.get('/test',userController.test);
route.post('/login',userController.signIn);
route.post('/user',authMiddleware.authVerify,userController.addUser);
route.get('/users',authMiddleware.authVerify,userController.listUser);
route.get('/user/:id',authMiddleware.authVerify,userController.viewUser);
route.put('/user/:id',authMiddleware.authVerify,userController.editUser);
route.delete('/user-remove/:id',authMiddleware.authVerify,userController.deleteUser)
module.exports = route;