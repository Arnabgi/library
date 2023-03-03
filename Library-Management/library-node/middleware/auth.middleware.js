const jwt = require('jsonwebtoken');
const model = require('../models');
const userModel = model.User;

module.exports = {
    authVerify : async(req,res,next) => {
        let jwtToken = process.env.JWT_SECRET_KEY; 
        let authHeader =  req.headers['authorization'];
        const bearer_token = authHeader && authHeader.split(' ');
        if(bearer_token){
            await jwt.verify(bearer_token[1],jwtToken,(err,verifiedJwt) =>{
                if(err) {
                    return res.json({
                        status: 401,
                        message: err.message
                    })
                }
                else{
                    req.email = verifiedJwt.email;
                    next();
                }
            })
        }
        else{
            return res.json({
                status: 401,
                message: "Authentication Failed!"  
            });
        }
    },

    loginVerify : async(req,res,next) => {
        if(req.email){
            const isLogin = await userModel.findOne({
                where: {
                    email: req.email,
                    is_login: 1
                }
            });
            if(!isLogin){
                return res.json({
                    status: 401,
                    message: "User must be login first"  
                });
            }
            else{
                //console.log("userId...........",isLogin.id);
                req.id = isLogin.id;
                next();
            }
        }
    }
}