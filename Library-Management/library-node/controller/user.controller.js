const userService = require('../Service/user.service');
const bcrypt = require('bcrypt');
module.exports={
    test: async(req,res)=> {
        try {
            res.send("Hello World!"); 
        } catch (error) {
            res.send(error); 
        }
    },

    signIn: async(req,res)=> {
        const token = process.env.JWT_SECRET_KEY;
        try {
            let logData = {
                email: req.body.email,
                password: req.body.password,
            };
            let loginData = await userService.signIn(logData,token);
            res.json({
                    status : loginData.status ? loginData.status : '', 
                    message : loginData.msg ? loginData.msg : '',
                    data : loginData.data ? loginData.data : ''
                });
        } catch (error) {
            res.send(error);
        }
    },

    addUser: async(req,res)=> {
        try {
            const salt = await bcrypt.genSalt(10);
            let data = {
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password,salt), 
                phone: req.body.phone,
                user_type: 2
            }
            let createUserData = await userService.addUser(data);
            res.json({
                status : createUserData.status ? createUserData.status : '', 
                message : createUserData.msg ? createUserData.msg : '',
                data : createUserData.data ? createUserData.data : ''
            });
        } catch (error) {
            //console.log("error..........",error);
            res.send(error);
        }
    },

    viewUser : async(req,res)=>{
        try {
            console.log("view.......");
            let userId = req.params.id;
            let userData = await userService.viewUser(userId);
            res.json({
                status: userData.status ? userData.status : '',
                message: userData.msg ? userData.msg : '',
                data: userData.data ? userData.data : ''
            });
        } catch (error) {
            // console.log(error);
            res.send(error);
        }
    },

    listUser: async(req,res)=>{
        try {
            //console.log("list......");
            let getData = await userService.listUser();
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

    editUser : async(req,res)=>{
        try {
            const salt = await bcrypt.genSalt(10);
            let userId = req.params.id;
            let value = {
                name: req.body.name,
                // password: await bcrypt.hash(req.body.password,salt), 
                email: req.body.email,
                phone: req.body.phone,
            }; 
            let editData =  await userService.editUser(userId,value);
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

    deleteUser : async(req,res)=>{
        try {
            let userId = req.params.id;
            const removeUser = await userService.deleteUser(userId);
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