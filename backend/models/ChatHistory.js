import mongoose from "mongoose";
 const chatHistorySchema =new mongoose.Schema({

userId:{
    type:mongoose.Schema.Types.ObjectId,
ref:'User',
    required:true
},
documentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Document',
    required:true
},
messages:[{
role:{
    type:string,
    enum:['user','assistant'],
    required:true
},
content:{
    type:string,
    required:true,

},
timestamp:{
    type:date,
    default:Date.now
},
relevantChunks:{
    type:[number],
    defualt:[]
}

 }]
},{
    timestamps:true
});

//index for faster 
chatHistorySchema.index({userId:1,documentId:1});

const ChatHistory=mongoose.model('ChatHistory',chatHistorySchema);
export default ChatHistory;

 