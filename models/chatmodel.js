const mongoose=require('mongoose');

const ChatSchema=mongoose.Schema({
    sender:String,
    receiver:String,
    message:String,
    timestamp:Date
})

const ChatModel=require("message",ChatSchema);

module.exports={
    ChatModel
}