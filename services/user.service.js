const userModel=require('../model/user.model')
const jwt = require('jsonwebtoken');
class userService {
    
    static async registerUSer(email,password){
        try{
            const createUser= new userModel({email,password});
                 return await createUser.save();
        }catch(err){
            throw err;
        }
    }
    static async checkuser(email){
        try{
            return await userModel.findOne({email});
        }catch(error){
            throw error;
        }
    }

    static async generateToken(tokenData,secretkey,jwt_expire){
        return jwt.sign(tokenData,secretkey,{expiresIn:jwt_expire})
    }
}
module.exports=userService;