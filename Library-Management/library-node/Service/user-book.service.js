const model = require('../models');
const userBookModel = model.userwithbook;
const bookModel = model.Books;
const {Op} = require('sequelize');
module.exports={
    addBookWithUser: async(value)=> {
        try {
            const addBookWithUser = await userBookModel.create(value);
            if(addBookWithUser){
                const countBook =  await bookModel.findOne({
                    attributes:['quaintity'],
                    where:{
                        id: value.bookId
                    }
                });
                if(countBook){
                    quaintityUpadteValue = await bookModel.update({quaintity: countBook.quaintity-1},{
                        where : {
                            id: value.bookId
                        }
                    });
                }
                // console.log("quaintityUpadteValue..................",quaintityUpadteValue[0]);
                // if(quaintityUpadteValue){
                //     if(quaintityUpadteValue[0]-1 === 0){
                //         await bookModel.update({isAvilable: 0},{
                //             where : {
                //                 id: value.bookId
                //             }
                //         });
                //     }
                // }
                return {
                    status: 200,
                    msg: "Data added successfully",
                    data: addBookWithUser.toJSON()
                };
            }
            else{
                return{
                    status:401,
                    msg: "Data added failed"
                }
            }
            
        } catch (error) {
            throw error;
        }
    }
}