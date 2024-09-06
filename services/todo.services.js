const  axios = require("axios");
const TodoModel = require("../model/todo.model");
const UserModel=require("../model/user.model");
const Twilio=require('twilio');
require('dotenv').config();  

const account_sid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;



const client=new Twilio (account_sid,authToken);
const whatsAppFrom='whatsapp:+14155238886';
const tokeid= process.env.WHATSAPP_CLOUD_API_TOKEN ??'EAATCQktRa4IBOZBm9UT8lBmK31fIFcVY5iWWSBlFfOxrGGGlh3I0Si1H4oJD97xMevYUKPICc9MM8NZBepA2G4daFiZAsNomYZCSZAG5JiNOcBDVUfCLiJX7ZCyMVldNggF47FeEYssiq1kxqTipCQFvrkilsDwuqm0O9ZAWOCTp1qZCXUse9UXyozFahgIv9MTHKGWrq3Iury0EZAA8KQ7Vi8AMI5NwLUOS1r4AZD';
const phoneNumbersId= '3392471050624905';
console.log(`Number Id:${phoneNumbersId}`);
console.log(`Auth Token ID: ${tokeid}`);

console.log(`Account SID: ${account_sid}`);
console.log(`Auth Token: ${authToken}`);
console.log(`WhatsApp From: ${whatsAppFrom}`);


    class ToDoServices {
       static async createTodo (userId,title,desc){
            const createTodo= new TodoModel({userId,title,desc});
            const savedTodo= await createTodo.save();
            
            const user = await UserModel.findById(userId);
            if (user) {
                await this.bulkMessageByWhatsapp([user.phone], `You have created a new to-do: ${title}`);
                await this.bulkMessageByWhatsappcloud([user.phone], `You have created a new to-do: ${title}`);
                
            }

            
               return savedTodo; 
        
        }
        static async getToDodata (userId){
            const todoData= await TodoModel.find({userId})
            return todoData;
        }
        static async deleteToDo(id){
            const deleted= await TodoModel.findOneAndDelete({_id:id})
            return deleted;
        }
        static async bulkMessageByWhatsapp(phoneNumbers,message){
            try {
               
                let messagesend=phoneNumbers.map( async phone=>{
                       return client.messages.create({
                           body:message,
                           from:whatsAppFrom,
                           to: `whatsapp:${phone}`
                           
                       });
                      
                       
                });
                return await Promise.all(messagesend);
                
                 
            } catch (error) {
                console.log(`not:${error.message}`)
                throw error
            }

        }
        static async bulkMessageByWhatsappcloud(Numbers,msg){
            try {
  

               
                const messages=Numbers.map( async (phonemsg)=>{
                       const response = await axios.post(
                     `https://graph.facebook.com/v20.0/392471050624905/messages`,
                       
                        {
                           
                         
                         messaging_product:'whatsapp',
                         to: phonemsg,
                         type: 'text',
                         text:{ body: msg}
                           
                           
                       },
                       {
                       headers: {
                        Authorization: `Bearer ${tokeid}`,
                        'Content-Type': 'application/json',
                       },
                       }
                    );
                    console.log(`Message sent to ${phonemsg}:`, response.data);
                    return response.data;
                       
                });
                return await Promise.all(messages);
                 
            } catch (error) {
                console.log(`not:${error.messages}`)
                throw error
            }

        }
    }


    module.exports=ToDoServices;