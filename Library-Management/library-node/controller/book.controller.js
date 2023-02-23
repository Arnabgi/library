const bookService = require('../Service/book.service');
module.exports={
    addBook: async(req,res)=> {
        try {
            let data = {
                name: req.body.name,
                quaintity: req.body.quaintity,
                entryDate: req.body.entryDate,	
            }
            let createBook = await bookService.addBook(data);
            res.json({
                status : createBook.status ? createBook.status : '', 
                message : createBook.msg ? createBook.msg : '',
                data : createBook.data ? createBook.data : ''
            });
        } catch (error) {
            //console.log("error..........",error);
            res.send(error);
        }
    },

    bookList: async(req,res)=>{
        try {
            let getData = await bookService.bookList();
            res.json({
                status: getData.status ? getData.status : '',
                message: getData.msg ? getData.msg : '',
                data: getData.data ? getData.data : ''
            });  
        } catch (error) {
            //console.log(error);
            res.send(error);
        }
    },

    editbook : async(req,res)=>{
        try {
            let bookId = req.params.id;
            let value = {
                name: req.body.name,
                quaintity: req.body.quaintity
            }; 
            let editData =  await bookService.editbook(bookId,value);
            res.json({
                status: editData.status ? editData.status : '',
                message: editData.msg ? editData.msg : '',
                data: editData.data ? editData.data : ''
            });  
        } catch (error) {
            //console.log(error);
            res.send(error);
        }
    },

    deleteBook : async(req,res)=>{
        try {
            let bookId = req.params.id;
            const removeUser = await bookService.deleteBook(bookId);
            res.json({
                status: removeUser.status ? removeUser.status : '',
                message: removeUser.msg ? removeUser.msg : '',
            });  
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
}