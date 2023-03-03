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
route.delete('/user-remove/:id',authMiddleware.authVerify,userController.deleteUser);
route.get('/logout',authMiddleware.authVerify,authMiddleware.loginVerify,userController.signOut);
route.put('/edit-profile',authMiddleware.authVerify,authMiddleware.loginVerify,userController.updateProfile);
route.get('/get-profile',authMiddleware.authVerify,authMiddleware.loginVerify,userController.viewProfile);
module.exports = route;