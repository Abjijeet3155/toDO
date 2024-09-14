
const TodoModel = require("../model/todo.model");
const UserModel=require("../model/user.model");
const index=require("../index");




    class ToDoServices {
       static async createTodo (userId,title,desc){
            const createTodo= new TodoModel({userId,title,desc});
            const savedTodo= await createTodo.save();
            
            const user = await UserModel.findById(userId);
          
        
        }
        static async getToDodata (userId){
            const todoData= await TodoModel.find({userId})
            return todoData;
        }
        static async deleteToDo(id){
            const deleted= await TodoModel.findOneAndDelete({_id:id})
            return deleted;
        }
        static async editToDo( title,desc){
            const editToDo= await TodoModel.findOneAndUpdate({title,desc})
            return editToDo;
        }
       
    }


    module.exports=ToDoServices;