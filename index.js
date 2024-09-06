const app = require('./app');
const db=require('./config/db')
const userModel=require('./model/user.model')
const TodoModel= require('./model/todo.model')
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode= require('qrcode-terminal')
const port = 9000;
app.get('/',(req,res)=>{
res.send("Hello World!!!!!")
});

app.listen(9000, () => {
    console.log(`Connected to server  http://localhost:${port}`);
}).on('error',(err)=>{
    if (err.code== 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        
    }else{
        console.err(err);
    }
})

module.exports = app;
