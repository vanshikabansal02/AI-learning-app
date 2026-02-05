import mongoose from 'mongoose'
 const documentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    title:{
        type:string,
        required:[true,'please provide a document title'],
        trim:true,
    },
    fileName:{
        type:string,
        required:true
    },
    filePath:{
        type:string,
        required:true
    },
    fileSize:{
        type:Number,
        required:true,

    },
    extractedText:{
        typr:string,
        default:''
    },
    chunks:[{
        content:{
            type:string,
            required:true
        },
        pageNumber:{
            type:Number,
            defaulr:0
        },
        chunkIndex:{
            type:Number,
            required:true
        }
    }],
    uploadDate:{
        type:date,
        default:Date.now
    },
    lastAccessed:{
        type:Date,
        default:Date.now
    },
    status:{
        type:string,
        enum:['processing','ready','failed'],
        default:'processing'
    }


 },{timestamps:true

 });

 //index fo r faster queries
 documentSchema.index({userId:1,uploadDate:-1});
 const Document=mongoose.model('Document',documentSchema);
 export default Document;