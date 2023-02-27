const model = require('../models');
const userBookModel = model.userwithbook;
const {Op} = require('sequelize');
module.exports={
    addBookWithUser: async(value)=> {
        try {
            const addBookWithUser = await userBookModel.create(value);
            if(addBookWithUser){
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