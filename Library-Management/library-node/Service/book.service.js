const model = require('../models');
const bookModel = model.Books;
const userBookModel = model.userwithbook;
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
module.exports={
    addBook : async(value)=> {
        try {
            const addBook = await bookModel.create(value);
            if(addBook){
                return {
                    status: 200,
                    msg: "Book added successfully",
                    data: addBook.toJSON()
                };
            }
            else{
                return{
                    status:401,
                    msg: "Book added failed"
                }
            }
            
        } catch (error) {
            //console.log(error);
            throw error;
        }
    },

    bookList : async()=>{
        try {
            const where = {
                isAvilable: {
                    [Op.ne] : 0
                } 
            }
            const getdata = await bookModel.findAll({
                where: where
            });
            if(getdata){
                return {
                    status: 200,
                    msg: "success",
                    data: getdata
                };
            }
            else{
                return{
                    status:401,
                    msg: "failed"
                }
            }
        } catch (error) {
            throw error;
        }
    },

    editbook : async(bookId,value)=>{
        try {
            let updateData = await bookModel.update(value,{
                where : {
                    id : bookId
                }
            });
            if(updateData){
                return {
                    status: 200,
                    msg: "Book update successfully",
                };
            }
            else{
                return{
                    status:401,
                    msg: "Book update failed"
                }
            }
        } catch (error) {
            throw error;            
        }
    },

    deleteBook : async(bookId)=>{
        try {
            const deleteData = await bookModel.update({isAvilable:0},{
                where:{
                    id: bookId   
                }
            });
            if(deleteData){
                return {
                    status: 200,
                    msg: "Book deleted successfully",
                };
            }
            else{
                return{
                    status:401,
                    msg: "Book deleted failed"
                }
            }
        } catch (error) {
            throw error;
            
        }
    },

    viewBook : async(bookId)=> {
        try {
            const bookData = await bookModel.findAll({
                where:{
                    id:bookId
                }
            });
            if(bookData){
                return {
                    status: 200,
                    msg: "success",
                    data: bookData
                };
            }
            else{
                return{
                    status:401,
                    msg: "failed"
                }
            }
        } catch (error) {
            throw error;
            
        }
    },

    viewBookWithUser: async(value)=> {
        try {
            const where = {
                userId: value.userId
            }
            const getdata = await userBookModel.findAll({
                where: where,
                include: [{
                    model:bookModel
                }]
            });
            if(getdata){
                return {
                    status: 200,
                    msg: "success",
                    data: getdata
                };
            }
            else{
                return{
                    status:401,
                    msg: "failed"
                };
            }
            
        } catch (error) {
            throw error;
        }
        
    } 
}