const userBookService = require('../Service/user-book.service');
module.exports={
    addBookWithUser: async(req,res)=> {
        try {
            const datetime = new Date();
            let afterDate= datetime.setDate(datetime.getDate()+5);
            let data = {
                userId: req.body.userId || req.params.userId,
                bookId: req.body.bookId,
                issueDate: new Date(),
                submitDate: afterDate
            }
            let addBook = await userBookService.addBookWithUser(data);
            res.json({
                status : addBook.status ? addBook.status : '', 
                message : addBook.msg ? addBook.msg : '',
                data : addBook.data ? addBook.data : ''
            });
        } catch (error) {
            console.log("error..........",error);
            res.send(error);
        }
    },
}