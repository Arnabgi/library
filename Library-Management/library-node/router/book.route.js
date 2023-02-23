const express = require('express');
const route = express.Router();
const bookController = require('../controller/book.controller');
const authMiddleware = require('../middleware/auth.middleware');

route.post('/book',authMiddleware.authVerify,bookController.addBook);
route.get('/books',authMiddleware.authVerify,bookController.bookList);
route.put('/book/:id',authMiddleware.authVerify,bookController.editbook);
route.delete('/book/:id',authMiddleware.authVerify,bookController.deleteBook)
module.exports = route;