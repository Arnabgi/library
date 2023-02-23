const route = require('../router/user.router');
const bookRoute = require('../router/book.route');
const userBookRoute = require('../router/userBook.route');
module.exports = [
    route,
    bookRoute,
    userBookRoute
];