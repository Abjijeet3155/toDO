const ToDoServices= require("../services/todo.services");


exports.createTodo = async(req,res,next)=>{
    try{
        const {userId,title,desc}=req.body;
        let todo = await ToDoServices.createTodo(userId,title,desc);
        
        res.json({status:true,success:todo})
    }catch(error){
        next (error);
    }
}
exports.getUserToDO = async(req,res,next)=>{
    try{
        const {userId}=req.body;
        let todo = await ToDoServices.getToDodata(userId);
        
        res.json({status:true,success:todo})
    }catch(error){
        next (error);
    }
}
exports.deleteToDO = async(req,res,next)=>{
    try{
        const {id}=req.body;
        let deleted = await ToDoServices.deleteToDo(id);
        
        res.json({status:true,success:deleted})
    }catch(error){
        next (error);
    }
}
exports.sendBulkMessage = async(req,res,next)=>{
    try{
        const {phoneNumbers,message}=req.body;
        if (!Array.isArray(phoneNumbers)) {
            throw new Error("phoneNumbers must be a defined array");
            
        }
        console.log("Received phone numbers:", phoneNumbers); // Debug log
        console.log("Received message:", message); 
           await ToDoServices.bulkMessageByWhatsapp(phoneNumbers,message);
        
        res.json({status:true,msg:"Whatsapp message sent successfully"});
    }catch(error){
        console.log(`Error found${error.message}`)
        next (error);
    }
}
exports.sendBulkMessagecloud = async(req,res,next)=>{
    try{
        const {Numbers,msg}=req.body;
        console.log("Request body:", req.body);  // Add this line
        console.log("Numbers:", Numbers);        // Add this line
        console.log("Message:", msg); 
        if (!Array.isArray(Numbers)) {
            throw new Error("phoneNumbers must be a defined array");
            
        }
        console.log("Received phone numbers:", Numbers); // Debug log
        console.log("Received message:", msg); 
           await ToDoServices.bulkMessageByWhatsappcloud(Numbers,msg);
        
        res.json({status:true,msg:"WhatsApp message sent successfully"});
    }catch(error){
        console.log(`Error found${error. msg}`)
        next (error);
    }
}

exports.sendBulkMessagewhatsappjs = async(req,res,next)=>{
    try{
        const {phone,message}=req.body;
     
        console.log("Phone:", phone);        // Add this line
        console.log("Message:", message); 
        if (!phone) {
            throw new Error("Phone is required");
            
        }
        
           await ToDoServices.bulkMessageByWhatsappjs(phone,message);
        
        res.json({status:true,msg:"WhatsApp message sent successfully"});
    }catch(error){
        console.log(`Error found:${error.message}`)
        next (error);
    }
}