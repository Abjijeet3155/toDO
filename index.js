const app = require('./app');
const db=require('./config/db')
const userModel=require('./model/user.model')
const TodoModel= require('./model/todo.model')
const port = 3000;
app.get('/',(req,res)=>{
res.send("Hello World!!!!!")
});

app.listen(port, () => {
    console.log(`Connected to server  http://localhost:${port}`);
});
    
