import mongoose from 'mongoose';
const flashcardSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    documentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Document",
        required:true
    },

    cards:[
        {
            question:{type:string,equired:true},
            answer:{type:string,required:true},
            difficulty:{
                typr:string,
                enum:["easy","medium","hard"],
                default:"medium",
            },
            lastReviewed:{
                type:Date,
                default:null,
            },
            reviewCount:{
                type:NUmber,
                default:0,
            },
            isStarted:{
                typ:boolean,
                default:false,
            },

        },
    ],
},{  timestamps:true,
});

flashcardSchema.index({userId:1,documentId:1});
 const Flashcard=mongoose.model("Flashcard",flashcardSchema);

 export default Flashcard;