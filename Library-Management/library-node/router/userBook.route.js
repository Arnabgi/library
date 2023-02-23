const express = require('express');
const route = express.Router();
const bookWithUsreController = require('../controller/user-book.controller');
const authMiddleware = require('../middleware/auth.middleware');

route.post('/user-book/:userId',authMiddleware.authVerify,bookWithUsreController.addBookWithUser);
module.exports = route;