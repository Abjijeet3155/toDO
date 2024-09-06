const router = require('express').Router();
const ToDoController= require("../controller/todo.controller");
router.post('/storeTodo',ToDoController.createTodo);
router.post('/getUserToDoList',ToDoController.getUserToDO);
router.post('/deleteToDo',ToDoController.deleteToDO);
router.post('/sendBulkWhatsapp',ToDoController.sendBulkMessage);
router.post('/sendBulkWhatsappcloud',ToDoController.sendBulkMessagecloud);

module.exports=router;