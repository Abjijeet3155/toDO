
const mongoose =require('mongoose')
const connection = mongoose.createConnection('mongodb+srv://abk827014:abhi3155@cluster0.ylkqc.mongodb.net/toDo?retryWrites=true&w=majority&appName=Cluster0').on('open',()=>{
    
    console.log("MongoDb Connected");
}).on('error',()=>{
console.log("MangoDb connection error");
});



module.exports=connection;