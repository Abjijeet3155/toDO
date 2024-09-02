
const userService=require("../services/user.service");

exports.register= async(req,res,next)=>{

      try{
        const{email,password}=req.body;
        const successres= await userService.registerUSer(email,password);
        res.json({status:true,success:"User Registered Succesfully"});


      }catch(err){
        throw err;
      }
}
exports.login= async(req,res,next)=>{

  try{
    const{email,password}=req.body;
    console.log("--------",password);
    const user = await  userService.checkuser(email);
    console.log("-----user-----",user);
    if (!user) {
      res.json({status:false,message:"Invalid Email"});
    }

    const isMatch= await user.comparePassword(password);
    if (isMatch===false) {
      res.json({status:false,message:"Invalid Password"});
      
    }

    let tokenData = {_id:user._id,email:user.email};
    const token = await userService.generateToken(tokenData,"secrekeyt",'1h')
    res.status(200).json({status:true,token:token})
  }catch(error){
    throw error;
    next(error);
  }
}

