const model = require('../models');
const userModel = model.User;
const userWithBookModel = model.userwithbook;
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports={
    signIn: async(loginData,token) => {
        try {
            const checkEmail = await userModel.findOne({
                attributes:['email','password','id'],
                where:{
                    email : loginData.email,
                    is_login: 0
                }
            });
            //console.log("logData........",checkEmail);
            if(checkEmail){
                console.log("checkEmail.........",loginData);
                const matchPassword = await bcrypt.compare(loginData.password,checkEmail.password);
                console.log("matchPassword.........",matchPassword);
                if(!matchPassword){
                    return {
                        status:401,
                        msg: "Password is wrong"
                    }
                }
                await userModel.update({is_login: 1},{
                    where : {
                        id : checkEmail.id
                    }
                });
                const logData = jwt.sign(checkEmail.toJSON(),token);
                return {
                    status: 200,
                    msg: "Login Success",
                    data: logData
                }; 
            }   
            else{
                return {
                    status:401,
                    msg: "Login Failed",
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    addUser : async(value)=> {
        try {
            const craeteUserData = await userModel.create(value);
            if(craeteUserData){
                return {
                    status: 200,
                    msg: "Data added successfully",
                    data: craeteUserData.toJSON()
                };
            }
            else{
                return{
                    status:401,
                    msg: "Data added failed"
                }
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    viewUser : async(userId)=> {
        try {
            const userData = await userModel.findAll({
                where:{
                    id:userId
                }
            });
            if(userData){
                return {
                    status: 200,
                    msg: "success",
                    data: userData
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

    listUser : async()=>{
        try {
            const where = {
                user_type: {
                    [Op.ne] : 1
                },
                is_deleted: {
                    [Op.ne] : 1
                } 
            }
            const getdata = await userModel.findAll({
                where: where,
                include:[{
                    model: userWithBookModel,
                }]
            });
            // const getBook = await userWithBookModel.findAll({
            //     where:{
            //         'userId': getdata.id
            //     }
            // });
            // console.log("getBook..........",getBook);
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

    editUser : async(userId,value)=>{
        try {
            let updateData = await userModel.update(value,{
                where : {
                    id : userId
                }
            });
            if(updateData){
                return {
                    status: 200,
                    msg: "User update success",
                };
            }
            else{
                return{
                    status:401,
                    msg: "User update failed"
                }
            }
        } catch (error) {
            throw error;            
        }
    },

    deleteUser : async(userId)=>{
        try {
            const deleteData = await userModel.update({is_deleted:1},{
                where:{
                    id: userId   
                }
            });
            if(deleteData){
                return {
                    status: 200,
                    msg: "User deleted successfully",
                };
            }
            else{
                return{
                    status:401,
                    msg: "User deleted failed",
                }
            }
        } catch (error) {
            throw error;
            
        }
    },

    editProfile: async(userId,value) => {
        try {
            let editProfile = await userModel.update(value,{
                where : {
                    id : userId
                }
            });
            if(editProfile){
                return {
                    status: 200,
                    msg: "Profile update successfully",
                };
            }
            else{
                return{
                    status:401,
                    msg: "Profile update failed"
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    viewProfile : async(userId)=> {
        try {
            const userData = await userModel.findAll({
                where:{
                    id: userId
                }
            });
            if(userData){
                return {
                    status: 200,
                    msg: "success",
                    data: userData
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

    signOut : async(userId)=> {
        try {
            const signOut = await userModel.update({is_login: 0},{
                where:{
                    id: userId
                }
            });
            if(signOut){
                return {
                    status: 200,
                    msg: "User logout successfully",
                };
            }
            else{
                return {
                    status: 200,
                    msg: "User logout failed",
                };
            }
        } catch (error) {
            throw error;
        }
    }
}