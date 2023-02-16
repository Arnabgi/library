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
}